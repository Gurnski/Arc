import Component from "./Component.js";

// A small pill-shaped label, e.g. "v0.1" or "New".
export default class Badge extends Component {
    constructor(text, options = {}) {
        super(options);

        this.text = text;
        this.className = options.className || "";
    }

    render() {
        const element = document.createElement("span");
        element.className = "arc-badge";
        element.textContent = this.text;

        if (this.className) {
            element.classList.add(...this.className.split(" "));
        }

        return element;
    }
}
