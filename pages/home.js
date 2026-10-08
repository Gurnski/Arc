import Arc from "../arc/Arc.js";

export default class Home extends Arc.Page {
    static title = "Arc Framework";
    static description = "A framework for building single page web applications.";

    render() {
        const page = document.createElement("main");

        Arc.text("Welcome to Arc", {
            tag: "h1",
            variant: "title"
        }).mount(page);

        Arc.text("Arc is a lightweight JavaScript framework for building web applications.", {
            tag: "p",
            variant: "subtitle"
        }).mount(page);

        return page;
    }
}
