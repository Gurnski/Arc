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
}
