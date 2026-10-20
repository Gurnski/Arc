import Component from "../../Component.js";
import Style from "../../../core/Style.js";

// Loaded once, the first time anything imports the hero. PageLoader waits for it before showing a page.
Style.load(new URL("../../css/elements/hero.css", import.meta.url).href);

// A full-screen opening section with its content centred. By default it stays pinned while
// the next section scrolls up over it (an Arc.Section with variant "raised" works well), and
// it shrinks and dims as it's covered.
//
// Options:
//   children   - what goes inside, stacked and centred
//   scrollHint - a word shown at the bottom with a line under it, e.g. "Scroll" (default none)
//   cover      - false to have it scroll away normally instead (default true)
//   className
export default class Hero extends Component {
    constructor(options = {}) {
        super(options);

        this.items = options.children || [];
        this.scrollHint = options.scrollHint || null;
        this.cover = options.cover ?? true;
        this.className = options.className || "";

        this.frame = null;
        this.update = this.update.bind(this);
    }

    render() {
        const hero = document.createElement("section");
        hero.className = "arc-hero";

        if (this.cover) {
            hero.classList.add("arc-hero--cover");
        }

        if (this.className) {
            hero.classList.add(...this.className.split(" "));
        }

        const inner = document.createElement("div");
        inner.className = "arc-hero-inner arc-container arc-stack arc-center";
        hero.appendChild(inner);
        this.inner = inner;
        this.place(this.items, inner);

        if (this.scrollHint) {
            const hint = document.createElement("div");
            hint.className = "arc-hero-hint";
            hint.setAttribute("aria-hidden", "true");
            hint.textContent = this.scrollHint;
            hero.appendChild(hint);
        }

        return hero;
    }

    mount(parent) {
        super.mount(parent);

        if (this.cover) {
            window.addEventListener("scroll", this.update, { passive: true });
            window.addEventListener("resize", this.update);
            this.update();
        }

        return this;
    }

    unmount() {
        window.removeEventListener("scroll", this.update);
        window.removeEventListener("resize", this.update);
        cancelAnimationFrame(this.frame);
        super.unmount();
    }

    // As the next section rises, --cover goes from 0 to 1 and hero.css uses it to shrink and
    // dim the content underneath. Worked out at most once per frame.
    update() {
        if (this.frame) return;

        this.frame = requestAnimationFrame(() => {
            this.frame = null;

            const next = this.element && this.element.nextElementSibling;
            if (!next) return;

            const top = next.getBoundingClientRect().top;
            const cover = Math.min(1, Math.max(0, 1 - top / window.innerHeight));
            this.element.style.setProperty("--cover", cover.toFixed(3));
        });
    }
}
