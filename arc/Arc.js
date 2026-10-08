import Component from "./components/Component.js";
import Text from "./components/Text.js";
import Image from "./components/Image.js";
import Page from "./components/Page.js";
import Meta from "./core/Meta.js";
import PageLoader from "./core/PageLoader.js";

const Arc = {
Component,
Text,
Image,
Page,
Meta,

text(content, options = {}) {
    const element = document.createElement(options.tag || "p");

    element.textContent = content;

    if (options.variant === "title") {
        element.style.fontSize = "2.5rem";
        element.style.fontWeight = "700";
        element.style.letterSpacing = "-0.03em";
        element.style.lineHeight = "1.1";
    }
    if (options.variant === "subtitle") {
        element.style.fontSize = "1.5rem";
        element.style.fontWeight = "500";
        element.style.letterSpacing = "-0.02em";
        element.style.lineHeight = "1.3";
    }

    return {
        element,

        mount(parent) {
            parent.appendChild(element);
            return this;
        }
    };
},

// Loads a page from the pages folder (e.g. "about" loads pages/about.js) and shows it.
loadPage(name) {
    return PageLoader.loadPage(name);
},

// Initialises the framework, loads the main page and sets up the environment for the user.
// root is the element pages render into, pages is the folder the page files live in.
init({ root = "#app", pages = "./pages/" } = {}) {
    try
    {
        const siteMeta = {
            title: "Arc Framework",
            description: "A framework for building single page web applications."
        };

        Meta.set({
            ...siteMeta,
            keywords: "arc, framework, javascript, web, applications",
            // Resolved relative to this file, so it works wherever the project is served from
            favicon: new URL("./favicon.ico", import.meta.url).href
        });

        PageLoader.setup(root, pages, siteMeta);
        console.log("Arc framework initialised.");

    }
    catch (error) {
        console.error("Error initialising Arc framework:", error);
    }
},
};

export default Arc;