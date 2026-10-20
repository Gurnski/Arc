import Arc from "../arc/Arc.js";

export default class About extends Arc.Page {
    static title = "About Arc Framework"
    static description = "A framework for building single page web applications.";

    content() {
        return [
            new Arc.Section({
                children: new Arc.Stack({
                    children: [
                        new Arc.Text("About Arc Framework", { tag: "h1", variant: "title" }),
                        new Arc.Text("Arc is a lightweight JavaScript framework for building web applications.", { variant: "subtitle" }),
                        new Arc.Cluster({
                            children: [
                                new Arc.Button({ text: "Back to home", page: "home", variant: "ghost" })
                            ]
                        })
                    ]
                })
            })
        ];
    }
}
