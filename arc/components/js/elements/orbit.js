import Component from "./Component.js";
import Style from "../../../core/Style.js";

// Loaded once, the first time anything imports the orbit. PageLoader waits for it before showing a page.
Style.load(new URL("../../css/elements/orbit.css", import.meta.url).href);

// An element in the middle with other elements circling around it, e.g. a logo with the
// logos of the tools it's built with. Hovering over the orbit pauses it.
//
// Options:
//   center   - what sits in the middle: an Arc component (like Arc.Image) or an element
//   items    - what circles around it, as components or elements
//   radius   - distance from the middle to each item, in px (default 110)
//   duration - seconds for one full turn (default 12)
export default class Orbit extends Component {
    constructor(options = {}) {
        super(options);

        this.center = options.center || null;
        this.items = options.items || [];
        this.radius = options.radius ?? 110;
        this.duration = options.duration ?? 12;

        this.itemElements = [];
        this.angle = 0;
        this.paused = false;
        this.frame = null;
        this.lastTime = null;
    }

    render() {
        const stage = document.createElement("div");
        stage.className = "orbit-stage";
        stage.style.setProperty("--orbit-radius", `${this.radius}px`);

        const ring = document.createElement("div");
        ring.className = "orbit-ring";
        stage.appendChild(ring);

        if (this.center) {
            const center = document.createElement("div");
            center.className = "orbit-center";
            this.place(this.center, center);
            stage.appendChild(center);
        }

        this.itemElements = this.items.map((item) => {
            const wrapper = document.createElement("div");
            wrapper.className = "orbit-item";
            this.place(item, wrapper);
            stage.appendChild(wrapper);
            return wrapper;
        });

        stage.addEventListener("mouseenter", () => { this.paused = true; });
        stage.addEventListener("mouseleave", () => { this.paused = false; });

        this.position();
        return stage;
    }

    mount(parent) {
        super.mount(parent);

        // People who have asked their system for less motion get the items laid out, standing still.
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            this.frame = requestAnimationFrame((time) => this.tick(time));
        }

        return this;
    }

    unmount() {
        cancelAnimationFrame(this.frame);
        this.frame = null;
        super.unmount();
    }

    tick(time) {
        // Pages don't unmount their children, so stop once the orbit has been taken off the page.
        if (!this.element || !this.element.isConnected) {
            this.frame = null;
            return;
        }

        if (this.lastTime !== null && !this.paused) {
            // Based on elapsed time rather than frames, so it turns at the same speed on any screen.
            this.angle += ((time - this.lastTime) / 1000 / this.duration) * 2 * Math.PI;
            this.position();
        }

        this.lastTime = time;
        this.frame = requestAnimationFrame((next) => this.tick(next));
    }

    // Spaces the items evenly around the circle, offset by how far the orbit has turned.
    position() {
        this.itemElements.forEach((item, index) => {
            const angle = this.angle + (index / this.itemElements.length) * 2 * Math.PI;
            const x = this.radius * Math.cos(angle);
            const y = this.radius * Math.sin(angle);

            item.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
}
