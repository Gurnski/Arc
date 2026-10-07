import Component from "./components/Component.js";

const Arc = {
    Component,

    meta() {
        const pageTitle = "Arc";
        const metaDescription = "Arc is a lightweight JavaScript framework for building web applications.";
        const metaTags = "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"

        return {
            title: pageTitle,
            description: metaDescription,
            tags: metaTags,
        };
    },

    init() {
        this.meta();
        console.log("Arc framework initialised.");
    },
};

export default Arc;
