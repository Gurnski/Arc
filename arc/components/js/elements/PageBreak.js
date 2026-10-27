import Component from "./components/js/Component.js";

export default class PageBreak extends Component {

    constructor(options = {}) {
        super(options);

        this.type = options.type || "pagebreak";
    }

    render(){
        const pageBreak = document.createElement("div");
        const hr = document.createElement("hr");
        const br = document.createElement("br");

        pageBreak.className = "arc-page-break";

        pageBreak.appendChild(hr);
        pageBreak.appendChild(br);

        if (this.type === "pagebreak") {
            pageBreak.classList.add("arc-page-break--pagebreak");
        }
        if (this.type === "br") {
            pageBreak.classList.add("arc-page-break--br");
        }
        if (this.type === "hr") {
            pageBreak.classList.add("arc-page-break--hr");
        }   

        return pageBreak;
    }

}