import Arc from "../arc/Arc.js";

export default class Home extends Arc.Page {
    constructor() {
        super();
        this.loadStyleSheet();
    }

    loadStyleSheet() {
        Arc.Style.loadStyleSheet("./styles/home.css");
    }
    static title = "Arc Framework";
    static description = "A framework for building single page web applications.";

    render() {
        const hero = document.createElement("hero");
        const page = document.createElement("main");
        const header = document.querySelector("header");
        const footer = document.querySelector("footer");

        Arc.text("This is the hero", {
            tag: "h1",
            variant: "title"
        }).mount(hero);

        Arc.text("Welcome to Arc", {
            tag: "h1",
            variant: "title"
        }).mount(page);

        Arc.text("Arc is a lightweight JavaScript framework for building web applications.", {
            tag: "p",
            variant: "subtitle"
        }).mount(page);

        Arc.text("Learn more about Arc", {
            tag: "a",
            variant: "pageLoadText",
            href: "about"
        }).mount(page);


        return page;
    }
}
