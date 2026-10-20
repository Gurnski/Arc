import Component from "./Component.js";

// A full-width band of the page, with its content in a centred container.
//
// Options:
//   children  - what goes inside
//   variant   - "raised" for a solid panel with a rounded top that can slide over an Arc.Hero
//   contained - false to let the children run the full width (default true)
//   id        - lets links like "#features" jump to it
//   className
export default class Section extends Component {
    constructor(options = {}) {
        super(options);

        this.items = options.children || [];
        this.variant = options.variant || null;
        this.contained = options.contained ?? true;
        this.id = options.id || null;
        this.className = options.className || "";
    }

    render() {
        const section = document.createElement("section");
        section.className = "arc-section";

        if (this.variant) {
            section.classList.add(`arc-section--${this.variant}`);
        }

        if (this.className) {
            section.classList.add(...this.className.split(" "));
        }

        if (this.id) {
            section.id = this.id;
        }

        if (this.contained) {
            const container = document.createElement("div");
            container.className = "arc-container";
            section.appendChild(container);
            this.place(this.items, container);
        }
        else {
            this.place(this.items, section);
        }

        return section;
    }
}
