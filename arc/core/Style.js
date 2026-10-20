import Component from "../components/Component.js";

export default class Style extends Component {
    constructor(options = {}) {
        super(options);

    }

    loadStyleSheet(href) {
        // Check if the stylesheet is already loaded
        const existingLink = document.querySelector(`link[href="${href}"]`);
        if (existingLink) {
            existingLink.remove(); // Remove current stylesheet
        }

        // Create a new link element for the stylesheet on live page
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
    }
}
