import Component from "./Component.js";
import PageLoader from "../core/PageLoader.js";

// A button, or a link that looks like one.
//
// Options:
//   text    - the label
//   page    - an Arc page to load in place, e.g. "about"
//   href    - a normal link instead, e.g. "#features" or another site
//   onClick - a function to run when it's clicked (with no page or href it's a real <button>)
//   variant - "ghost" for the outlined style
//   className
export default class Button extends Component {
    constructor(options = {}) {
        super(options);

        this.text = options.text || "";
        this.page = options.page || null;
        this.href = options.href || null;
        this.onClick = options.onClick || null;
        this.variant = options.variant || null;
        this.className = options.className || "";
    }

    render() {
        const isLink = Boolean(this.page || this.href);
        const element = document.createElement(isLink ? "a" : "button");
        element.className = "arc-button";
        element.textContent = this.text;

        if (this.variant) {
            element.classList.add(`arc-button--${this.variant}`);
        }

        if (this.className) {
            element.classList.add(...this.className.split(" "));
        }

        if (!isLink) {
            element.type = "button";
        }
        else if (this.page) {
            // An <a> needs an href to be reachable with the keyboard; the click handler stops it navigating.
            element.href = `#${this.page}`;
        }
        else {
            element.href = this.href;
        }

        element.addEventListener("click", (event) => {
            if (this.page) {
                event.preventDefault();
                PageLoader.loadPage(this.page);
            }

            if (this.onClick) {
                this.onClick(event);
            }
        });

        return element;
    }
}
