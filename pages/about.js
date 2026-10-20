import Arc from "../arc/Arc.js";

export default class About extends Arc.Page {
    static title = "About Arc Framework"
    static description = "A framework for building single page web applications.";

    render() {
        const hero = document.createElement("hero");
        const page = document.createElement("main");

        Arc.text("About Arc Framework", {
            tag: "h1",
            variant: "title"
        }).mount(hero);

        Arc.text("Arc is a lightweight JavaScript framework for building web applications.", {
            tag: "p",
            variant: "subtitle"
        }).mount(page);

        Arc.text("Learn more about Arc", {
            tag: "a",
            variant: "pageLoadText",
            href: "home"
        }).mount(page);

        return page;
    }
}