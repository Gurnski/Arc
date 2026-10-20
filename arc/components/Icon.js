import Component from "./Component.js";

// A 24x24 line icon drawn in the current text colour. Use a built-in name, or add your own
// with Icon.register("name", "<path d='...'/>").
//
// Options:
//   label - what the icon means, for screen readers. Leave it out when the icon is only
//           decoration next to text that already says the same thing.
export default class Icon extends Component {
    // The inside of each icon's <svg>, drawn on a 24x24 grid
    static icons = {
        // Two overlapping pages
        pages: `<rect x="3" y="7" width="13" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>`,
        // Three overlapping circles
        palette: `<circle cx="8" cy="8" r="4"/><circle cx="16" cy="8" r="4"/><circle cx="12" cy="15" r="4"/>`,
        // Four squares
        grid: `<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>`,
        // Magnifying glass
        search: `<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>`,
        // Keyboard
        keyboard: `<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>`,
        // Lightning bolt
        bolt: `<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>`
    };

    static register(name, markup) {
        this.icons[name] = markup;
    }

    constructor(name, options = {}) {
        super(options);

        this.name = name;
        this.label = options.label || null;
    }

    render() {
        const markup = Icon.icons[this.name];

        if (markup === undefined) {
            console.warn(`Arc: there is no icon called "${this.name}". Add it with Arc.Icon.register().`);
        }

        // Parsed through a <template> so the browser creates real SVG elements
        const template = document.createElement("template");
        template.innerHTML = `<svg class="arc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${markup || ""}</svg>`;
        const svg = template.content.firstElementChild;

        if (this.label) {
            svg.setAttribute("role", "img");
            svg.setAttribute("aria-label", this.label);
        }
        else {
            svg.setAttribute("aria-hidden", "true");
        }

        return svg;
    }
}
