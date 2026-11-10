import Component from "./Component.js";
import Style from "../../../core/Style.js";
import Icon from "./Icon.js";

Style.load(new URL("../../css/elements/flexcard.css", import.meta.url).href);

// A card with a soft light that follows the pointer across it and along its border.
//
// Options:
//   title - the card's heading
//   text  - a line or two underneath
//   icon  - the name of an Arc.Icon (e.g. "pages"), or any component or element
//   backgorund - the background picture of colour of the card, can be a url or a colour #
//   type  - one large one or a group of small ones ('large' or 'group' (the default))
export default class FlexCard extends Component {

    constructor(options = {}) {
        super(options);

        this.title = options.title || "";
        this.text = options.text || "";
        this.icon = options.icon || null;
        this.type = options.type || "group";
        this.background = options.background || null;
    }

    render() {

        if (this.type === "large") {
            const card = document.createElement("article");
            card.className = "arc-flexcard arc-flexcard--large";

            if (this.icon) {
                const icon = document.createElement("div");
                icon.className = "arc-flexcard-icon";
                card.appendChild(icon);
            }

            if (this.title) {
                const title = document.createElement("h3");
                title.className = "arc-flexcard-title";
                title.textContent = this.title;
                card.appendChild(title);
            }

            if (this.text) {
                const text = document.createElement("p");
                text.className = "arc-flexcard-text";
                text.textContent = this.text;
                card.appendChild(text);
            }

            if (this.background) {
                card.style.background = this.background;
            }

            this.background.addEventListener("click", (event) => {
                // Open the clicked on card and close the currently open card
                const openCard = document.querySelector(".arc-flexcard--open");
                if (openCard && openCard !== card) {
                    openCard.classList.remove("arc-flexcard--open");
                }
                card.classList.toggle("arc-flexcard--open");
            });

            return card;
        }
        else {
            if (this.type === "large") {
                const card = document.createElement("article");
                card.className = "arc-flexcard arc-flexcard--large";

                if (this.icon) {
                    const icon = document.createElement("div");
                    icon.className = "arc-flexcard-icon";
                    card.appendChild(icon);
                }

                if (this.title) {
                    const title = document.createElement("h3");
                    title.className = "arc-flexcard-title";
                    title.textContent = this.title;
                    card.appendChild(title);
                }

                if (this.text) {
                    const text = document.createElement("p");
                    text.className = "arc-flexcard-text";
                    text.textContent = this.text;
                    card.appendChild(text);
                }

                if (this.background) {
                    card.style.background = this.background;
                }
            }

        }
    }
}