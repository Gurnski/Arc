import Component from "./components/Component.js";
import Text from "./components/Text.js";

const Arc = {
Component,
Text,
Image,
Page,

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

meta(title, description) {
    const pageTitle = title || "Arc Framework";
    const metaDescription = description || "Arc is a lightweight JavaScript framework for building web applications.";
    const metaTags = "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"

    document.title = pageTitle;
    document.querySelector('meta[name="description"]').setAttribute('content', metaDescription);
    document.querySelector('head').insertAdjacentHTML('beforeend', metaTags);

    return {
        title: pageTitle,
        description: metaDescription,
        tags: metaTags,
    };
},

// Initialises the framework, loads the main page and sets up the environment for the user.
init() {
    try{
        this.meta("Arc Framework", "A framework for building single page web applications.");
        console.log("Arc framework initialised.");
        this.updatePage();

    }
    catch (error) {
        console.error("Error initializing Arc framework:", error);
    }
},


};

export default Arc;