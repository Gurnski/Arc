import Component from "../../Component.js";
import Style from "../../../core/Style.js";
import Icon from "../../Icon.js";

// Loaded once, the first time anything imports the card. PageLoader waits for it before showing a page.
Style.load(new URL("../../css/elements/card.css", import.meta.url).href);

// A card with a soft light that follows the pointer across it and along its border.
//
// Options:
//   title - the card's heading
//   text  - a line or two underneath
//   icon  - the name of an Arc.Icon (e.g. "pages"), or any component or element
export default class Card extends Component {
    constructor(options = {}) {
        super(options);

        this.title = options.title || "";
        this.text = options.text || "";
        this.icon = options.icon || null;
    }

    render() {
        const card = document.createElement("article");
        card.className = "arc-card arc-card--spotlight";

        if (this.icon) {
            const icon = document.createElement("div");
            icon.className = "arc-card-icon";

            this.place(typeof this.icon === "string" ? new Icon(this.icon) : this.icon, icon);
            card.appendChild(icon);
        }

        const title = document.createElement("h3");
        title.className = "arc-card-title";
        title.textContent = this.title;
        card.appendChild(title);

        const text = document.createElement("p");
        text.className = "arc-card-text";
        text.textContent = this.text;
        card.appendChild(text);

        // The CSS draws the light at --x/--y, so this only has to say where the pointer is.
        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--x", `${event.clientX - rect.left}px`);
            card.style.setProperty("--y", `${event.clientY - rect.top}px`);
        });

        return card;
    }
}
