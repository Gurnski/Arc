export default class Component {
    constructor(props = {}) {
        this.props = props;
        this.element = null;
    }

    render() {
        return document.createElement("div");
    }

    mount(parent) {
        this.element = this.render();
        parent.appendChild(this.element);
        return this;
    }

    // Removes the component from the page. Components that set up listeners or timers
    // should override this to clean them up, then call super.unmount().
    unmount() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}
