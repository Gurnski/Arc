import Component from "./Component.js";

export default class Text extends Component {
    constructor(content, options = {}) {
        super(options);

        this.content = content;

        this.tag = options.tag || "p";
        this.variant = options.variant || null;

        this.className = options.className || "";
        this.id = options.id || null;
    }

    render() {
        const element = document.createElement(this.tag);

        element.textContent = this.content;

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