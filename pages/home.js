import Arc from "../arc/Arc.js";

const features = [
    {
        title: "Seamless page loading",
        text: "Pages are plain JavaScript modules. Arc.loadPage() swaps them in without reloading the browser, and if pages are clicked quickly, the newest one always wins.",
        icon: "pages"
    },
    {
        title: "Styles that travel with pages",
        text: "Each page lists its own stylesheets. Arc loads them before the page appears and removes them when you leave, so one page's styles never leak into the next.",
        icon: "palette"
    },
    {
        title: "Components",
        text: "Text, buttons, layouts and interactive pieces like the orbit and these cards are small classes you can put together into whole pages.",
        icon: "grid"
    },
    {
        title: "Titles and meta, handled",
        text: "Every page sets its own title and description, so browser tabs, bookmarks and search results always match what's on screen.",
        icon: "search"
    },
    {
        title: "Accessible by default",
        text: "Focus moves to each new page for screen readers, links work from the keyboard, and animations calm down for people who prefer reduced motion.",
        icon: "keyboard"
    },
    {
        title: "No build step",
        text: "Just HTML, CSS and JavaScript modules. No bundler, nothing to install and nothing to compile: save a file and refresh.",
        icon: "bolt"
    }
];

export default class Home extends Arc.Page {
    static title = "Arc Framework";
    static description = "A framework for building single page web applications.";
    static styles = ["./styles/home.css"];

    content() {
        return [
            // First screen: stays pinned while the features section slides up over it
            new Arc.Hero({
                scrollHint: "Scroll",
                children: [
                    new Arc.Orbit({
                        center: new Arc.Image("./logo.png", { alt: "Arc" }),
                        items: [
                            new Arc.Image("./assets/javascript.svg", { alt: "JavaScript" }),
                            new Arc.Image("./assets/html.svg", { alt: "HTML" }),
                            new Arc.Image("./assets/css.svg", { alt: "CSS" })
                        ]
                    }),
                    new Arc.Badge("v0.1 · Plain HTML, CSS and JavaScript"),
                    new Arc.Text("A whole site in one page", { tag: "h1", variant: "title", highlight: "one page" }),
                    new Arc.Text("Arc is a lightweight JavaScript framework that loads pages, their styles and their content in place, without ever reloading the browser.", {
                        variant: "subtitle"
                    }),
                    new Arc.Cluster({
                        justify: "center",
                        className: "home-actions",
                        children: [
                            new Arc.Button({ text: "See what it does", href: "#features" }),
                            new Arc.Button({ text: "About Arc", page: "about", variant: "ghost" })
                        ]
                    })
                ]
            }),

            // Second screen: a card for each feature
            new Arc.Section({
                id: "features",
                variant: "raised",
                children: new Arc.Stack({
                    gap: "xl",
                    children: [
                        new Arc.Stack({
                            tag: "header",
                            className: "home-features-heading",
                            children: [
                                new Arc.Badge("Features"),
                                new Arc.Text("Everything a page needs, loaded in place", { tag: "h2" }),
                                new Arc.Text("Move between pages like a normal website, while Arc quietly swaps the content, styles and details behind the scenes.", {
                                    className: "arc-muted"
                                })
                            ]
                        }),
                        new Arc.Grid({
                            min: "300px",
                            children: features.map((feature) => new Arc.Card(feature))
                        })
                    ]
                })
            })
        ];
    }
}
