import Component from "./Component.js";

// Named spaces from arc.css, so gap: "xl" means var(--arc-space-xl)
const spaces = ["2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl"];

// Shared by the layout components: an element with a layout class from arc.css, holding
// other components.
//
// Options for all of them:
//   children  - what goes inside: components, elements or text
//   gap       - space between children: a name from arc.css ("xs" to "3xl") or any CSS length
//   align     - "center" to centre the children and their text
//   tag       - the element to use (default "div")
//   className, id
class Group extends Component {
    static className = "";

    constructor(options = {}) {
        super(options);

        this.items = options.children || [];
        this.gap = options.gap || null;
        this.align = options.align || null;
        this.tag = options.tag || "div";
        this.className = options.className || "";
        this.id = options.id || null;
    }

    render() {
        const element = document.createElement(this.tag);
        element.classList.add(this.constructor.className);

        if (this.align === "center") {
            element.classList.add("arc-center");
        }

        if (this.className) {
            element.classList.add(...this.className.split(" "));
        }

        if (this.id) {
            element.id = this.id;
        }

        if (this.gap) {
            element.style.setProperty("--arc-gap", spaces.includes(this.gap) ? `var(--arc-space-${this.gap})` : this.gap);
        }

        this.layout(element);
        this.place(this.items, element);
        return element;
    }

    // For the layout components to add their own settings
    layout(element) {}
}

// A centred column with side padding, at most --arc-content-width wide
export class Container extends Group {
    static className = "arc-container";
}

// Children stacked in a column with even gaps
export class Stack extends Group {
    static className = "arc-stack";
}

// Children in a row that wraps onto new lines when it runs out of room.
// Extra option: justify - "center", "end" or "space-between"
export class Cluster extends Group {
    static className = "arc-cluster";

    constructor(options = {}) {
        super(options);
        this.justify = options.justify || null;
    }

    layout(element) {
        if (this.justify) {
            element.style.justifyContent = this.justify;
        }
    }
}

// As many columns as fit, dropping to one on phones.
// Extra option: min - the narrowest a column can get, e.g. "300px" (default 260px)
export class Grid extends Group {
    static className = "arc-grid";

    constructor(options = {}) {
        super(options);
        this.min = options.min || null;
    }

    layout(element) {
        if (this.min) {
            element.style.setProperty("--arc-min", this.min);
        }
    }
}
