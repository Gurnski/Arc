import Component from "./Component.js";

// Uses document.createElement("img") rather than `new Image()`, because inside this
// file `Image` refers to this class, not the browser's built-in image element.
export default class Image extends Component {
    constructor(src, options = {}) {
        super(options);

        this.src = src;
        this.alt = options.alt || "";

        this.className = options.className || "";
        this.id = options.id || null;
    }

    render() {
        const element = document.createElement("img");

        element.src = this.src;
        element.alt = this.alt;

        // Developer formatting
        if (this.className) {
            element.classList.add(...this.className.split(" "));
        }

        if (this.id) {
            element.id = this.id;
        }

        return element;
    }

    // Loads an image in the background and resolves with the <img> once it has finished loading.
    loadImage(directory) {
        return new Promise((resolve, reject) => {
            const img = document.createElement("img");
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${directory}`));
            img.src = directory;
        });
    }
}
