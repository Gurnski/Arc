import Component from "./Component.js";

// A piece of text in any tag.
//
// Options:
//   tag       - the element to use (default "p")
//   variant   - an Arc text style from arc.css: "title" or "subtitle"
//   highlight - part of the text to fill with the Arc gradient, e.g. "one page"
//   className, id
export default class Text extends Component {
    constructor(content, options = {}) {
        super(options);

        this.content = content;

        this.tag = options.tag || "p";
        this.variant = options.variant || null;
        this.highlight = options.highlight || null;

        this.className = options.className || "";
        this.id = options.id || null;
    }

    render() {
        const element = document.createElement(this.tag);

        const start = this.highlight ? this.content.indexOf(this.highlight) : -1;

        if (start === -1) {
            element.textContent = this.content;
        }
        else {
            const highlight = document.createElement("span");
            highlight.className = "arc-gradient-text";
            highlight.textContent = this.highlight;

            element.append(
                this.content.slice(0, start),
                highlight,
                this.content.slice(start + this.highlight.length)
            );
        }

        // Arc formatting
        if (this.variant) {
            element.classList.add(`arc-text-${this.variant}`);
        }

        // Developer formatting
        if (this.className) {
            element.classList.add(...this.className.split(" "));
        }

        if (this.id) {
            element.id = this.id;
        }

        return element;
    }
}
