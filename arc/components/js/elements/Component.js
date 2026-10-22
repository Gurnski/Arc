export default class Component {
    constructor(props = {}) {
        this.props = props;
        this.element = null;
        // Components mounted inside this one with place(), so unmount() can clean them up too
        this.children = [];
    }

    render() {
        return document.createElement("div");
    }

    mount(parent) {
        this.element = this.render();
        parent.appendChild(this.element);
        return this;
    }

    // Puts content inside one of this component's elements, usually from render().
    // Components are mounted and remembered as children, elements are added as they are,
    // strings become text, and arrays are placed in order.
    place(content, into) {
        if (content === null || content === undefined || content === false) {
            return;
        }

        if (Array.isArray(content)) {
            content.forEach((item) => this.place(item, into));
        }
        else if (content instanceof Component) {
            content.mount(into);
            this.children.push(content);
        }
        else if (content instanceof Node) {
            into.appendChild(content);
        }
        else {
            into.append(String(content));
        }
    }

    // Removes the component from the page. Components that set up listeners or timers
    // should override this to clean them up, then call super.unmount().
    unmount() {
        // Children first, so the listeners and timers inside them are cleaned up as well
        this.children.forEach((child) => child.unmount());
        this.children = [];

        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}
