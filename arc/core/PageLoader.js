import Meta from "./Meta.js";
import Page from "../components/Page.js";

// Loads pages from the site's pages/ folder and swaps them into the root element
// without reloading the browser.
const PageLoader = {
    root: null,
    pagesPath: "./pages/",
    currentPage: null,
    latestRequest: 0,
    siteMeta: {},

    // Called by Arc.init() with the element pages render into, the folder they live in, and the
    // site's own title and description, which are used for any page that doesn't set its own.
    setup(root, pagesPath, siteMeta) {
        this.root = typeof root === "string" ? document.querySelector(root) : root;

        if (!this.root) {
            throw new Error(`Arc: root element "${root}" was not found.`);
        }

        this.pagesPath = pagesPath;
        this.siteMeta = siteMeta;

        // Lets loadPage() move focus to the new page, so screen readers know it changed.
        this.root.tabIndex = -1;
    },

    async loadPage(name) {
        if (!this.root) {
            throw new Error("Arc: there is no root element to load pages into. Check that Arc.init() ran without errors.");
        }

        // Only simple names are allowed, so a name taken from the URL can't point outside the pages folder.
        if (!/^[a-z0-9-]+$/i.test(name)) {
            throw new Error(`Arc: "${name}" is not a valid page name. Use letters, numbers and dashes.`);
        }

        // Resolved against the site's address rather than this file, because pages belong to the site.
        const url = new URL(`${this.pagesPath}${name}.js`, document.baseURI).href;

        // If another page is requested while this one is still downloading, the newer request wins.
        const request = ++this.latestRequest;

        let module;
        try {
            module = await import(url);
        }
        catch (error) {
            throw new Error(`Arc: could not load page "${name}" from ${url}`, { cause: error });
        }

        if (request !== this.latestRequest) {
            return null;
        }

        const PageClass = module.default;

        if (!(PageClass && PageClass.prototype instanceof Page)) {
            throw new Error(`Arc: ${url} must have a default export that extends Arc.Page.`);
        }

        const previousPage = this.currentPage;

        // Mount the new page before removing the old one, so if its render() throws,
        // the old page stays on screen instead of leaving a blank app.
        this.currentPage = new PageClass().mount(this.root);

        if (previousPage) {
            previousPage.unmount();
        }

        // Fall back to the site's title and description, otherwise the previous page's would stay.
        Meta.set({
            title: PageClass.title || this.siteMeta.title,
            description: PageClass.description || this.siteMeta.description
        });

        // On the first load the browser already starts at the top of the page. After that,
        // move back to the top and put focus on the new content.
        if (previousPage) {
            window.scrollTo(0, 0);
            this.root.focus({ preventScroll: true });
        }

        return this.currentPage;
    }
};

export default PageLoader;
