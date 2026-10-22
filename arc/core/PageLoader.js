import Meta from "./Meta.js";
import Style from "./Style.js";
import Page from "../components/js/elements/Page.js";

// Loads pages from the site's pages/ folder and swaps them into the root element
// without reloading the browser, along with their stylesheets.
const PageLoader = {
    root: null,
    pagesPath: "./pages/",
    currentPage: null,
    latestRequest: 0,
    siteMeta: {},
    siteStyles: Promise.resolve(),
    // Full URLs of every stylesheet loaded for a page, so the ones the next page doesn't use can be removed
    pageStyles: new Set(),

    // Called by Arc.init() with the element pages render into, the folder they live in, the
    // site's own title and description (used for any page that doesn't set its own), and the
    // stylesheets every page shares.
    setup(root, pagesPath, siteMeta, siteStyles = []) {
        this.root = typeof root === "string" ? document.querySelector(root) : root;

        if (!this.root) {
            throw new Error(`Arc: root element "${root}" was not found.`);
        }

        this.pagesPath = pagesPath;
        this.siteMeta = siteMeta;

        // Started now so they download while the first page is still being fetched
        this.siteStyles = Promise.all(siteStyles.map((href) => Style.load(href)));

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

        const PageClass = module.default;

        if (!(PageClass && PageClass.prototype instanceof Page)) {
            throw new Error(`Arc: ${url} must have a default export that extends Arc.Page.`);
        }

        // A page lists its stylesheets relative to its own file, the same way its imports work.
        const styles = (PageClass.styles || []).map((href) => new URL(href, url).href);
        styles.forEach((href) => this.pageStyles.add(href));

        // Wait for every stylesheet before showing the page, so it never appears unstyled.
        // Style.ready() also covers styles added by components the page imported.
        await Promise.all([this.siteStyles, ...styles.map((href) => Style.load(href)), Style.ready()]);

        if (request !== this.latestRequest) {
            return null;
        }

        const previousPage = this.currentPage;

        // Everything that changes what's on screen, done in one step
        const swap = () => {
            // Mount the new page before removing the old one, so if its render() throws,
            // the old page stays on screen instead of leaving a blank app.
            this.currentPage = new PageClass().mount(this.root);

            if (previousPage) {
                previousPage.unmount();
            }

            // Removed in the same step as the swap, so the browser never paints the new page
            // with the old page's styles, or the old page without them.
            for (const href of this.pageStyles) {
                if (!styles.includes(href)) {
                    Style.unload(href);
                    this.pageStyles.delete(href);
                }
            }

            // Fall back to the site's title and description, otherwise the previous page's would stay.
            Meta.set({
                title: PageClass.title || this.siteMeta.title,
                description: PageClass.description || this.siteMeta.description
            });

            // On the first load the browser already starts at the top of the page. After that,
            // move back to the top and put focus on the new content.
            if (previousPage) {
                // Instant, otherwise arc.css's smooth scrolling would visibly scroll the new page up
                window.scrollTo({ top: 0, behavior: "instant" });
                this.root.focus({ preventScroll: true });
            }
        };

        // Animate from the old page to the new one where the browser supports View Transitions
        // (the animation itself is in arc.css). The first page, browsers without support and
        // people who prefer reduced motion get the swap straight away.
        const animate = previousPage
            && typeof document.startViewTransition === "function"
            && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (animate) {
            const transition = document.startViewTransition(swap);

            // Clicking another page mid-animation skips this one, which rejects ready; that's expected.
            transition.ready.catch(() => {});

            // Waits for the swap, not the animation, and passes on any error from the page's render()
            await transition.updateCallbackDone;
        }
        else {
            swap();
        }

        return this.currentPage;
    }
};

export default PageLoader;
