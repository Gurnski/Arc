import Component from "./components/js/elements/Component.js";
import Text from "./components/js/elements/Text.js";
import Image from "./components/js/elements/Image.js";
import Page from "./components/js/elements/Page.js";
import { Container, Stack, Cluster, Grid } from "./components/js/elements/Layout.js";
import Section from "./components/js/elements/Section.js";
import Button from "./components/js/elements/Button.js";
import Badge from "./components/js/elements/Badge.js";
import Icon from "./components/js/elements/Icon.js";
import Meta from "./core/Meta.js";
import PageLoader from "./core/PageLoader.js";
import Style from "./core/Style.js";
import Orbit from "./components/js/elements/orbit.js";
import Card from "./components/js/elements/card.js";
import Hero from "./components/js/elements/hero.js";

const Arc = {
Component,
Text,
Image,
Page,
Container,
Stack,
Cluster,
Grid,
Section,
Button,
Badge,
Icon,
Meta,
Style,
Orbit,
Card,
Hero,

// Creates a text element with the given content and options, and returns an object with the element and a mount() method.
text(content, options = {}) {
    const element = document.createElement(options.tag || "p");

    element.textContent = content;

    // The look comes from the arc-text-* classes in arc/components/css/arc.css rather than inline styles,
    // so a site's stylesheet can change it.
    if (options.variant) {
        element.classList.add(`arc-text-${options.variant}`);
    }

    if (options.className) {
        element.classList.add(...options.className.split(" "));
    }

    if (options.variant === "link") {
        element.href = options.href || "#";
    }

    if (options.variant === "pageLoadText" && options.href) {
        // An <a> needs an href to be reachable with the keyboard; the click handler stops it navigating.
        element.href = `#${options.href}`;

        element.addEventListener("click", (event) => {
            event.preventDefault();
            Arc.loadPage(options.href);
        });
    }

    return {
        element,

        mount(parent) {
            parent.appendChild(element);
            return this;
        }
    };
},

// Swaps the page in pages/<name>.js into the root element. See PageLoader.loadPage().
loadPage(name) {
    return PageLoader.loadPage(name);
},

// Initialises the framework, loads the main page and sets up the environment for the user.
// root is the element pages render into, pages is the folder the page files live in, and
// styles are the stylesheets every page shares.
init({ root = "#app", pages = "./pages/", styles = [] } = {}) {
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

        // Arc's own stylesheet goes first, so the site's styles can override it
        const arcStyles = new URL("./components/css/arc.css", import.meta.url).href;
        PageLoader.setup(root, pages, siteMeta, [arcStyles, ...styles]);
        console.log("Arc framework initialised.");

    }
    catch (error) {
        console.error("Error initialising Arc framework:", error);
    }
},
};

export default Arc;