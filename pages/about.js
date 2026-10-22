import Arc from "../arc/Arc.js";

export default class About extends Arc.Page {
    static title = "About Arc Framework"
    static description = "A framework for building single page web applications.";

    content() {
        return [
            new Arc.Hero({
                scrollHint: "Scroll",
                children: [
                    new Arc.Text("About Arc Framework", { tag: "h1", variant: "title" }),
                    new Arc.Text("", { variant: "subtitle" }),
                    new Arc.Button({ text: "Back to Home", page: "home" })
                ]
            }),

            new Arc.Section({
                children: new Arc.Stack({
                    id: "about",
                    variant: "raised",
                    children: [
                                new Arc.Card({
                                    title: "What is Arc?",
                               }),

                               new Arc.Stack({
                                tag: "info",
                                variant: "outlined",
                                gap: "xl",
                                children: [
                                    new Arc.Text("Arc is a lightweight JavaScript framework that loads pages, their styles and their content in place, without ever reloading the browser.", {
                                        variant: "subtitle"
                                    }),

                                    new Arc.Text("Arc is designed to be simple, fast and easy to use. It is built on top of the latest web technologies, and is designed to work with modern browsers.", {
                                        variant: "subtitle"
                                    }),

                                    new Arc.Text("Arc is designed to be simple, fast and easy to use. It is built on top of the latest web technologies, and is designed to work with modern browsers.", {
                                        variant: "subtitle"
                                    })
                                ]
                            })
                    ]
                })
                    
            })
            
        ];
    }
}
