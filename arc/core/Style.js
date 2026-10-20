import Component from "../components/Component.js";

// Adds and removes the site's <link rel="stylesheet"> tags. PageLoader uses it to bring in
// the site's and each page's styles, and components use it to load their own.
export default class Style extends Component {
    // Every stylesheet Arc has added, by full URL: { link, ready }
    static sheets = new Map();

    constructor(options = {}) {
        super(options);

    }

    // Adds a stylesheet if it isn't on the page already. Resolves once it has loaded, so
    // callers can wait for it instead of showing content before it's styled.
    static load(href) {
        const url = new URL(href, document.baseURI).href;

        if (this.sheets.has(url)) {
            return this.sheets.get(url).ready;
        }

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;

        const ready = new Promise((resolve) => {
            link.onload = () => resolve(link);
            // A missing stylesheet shouldn't stop the page from showing, so this doesn't reject.
            link.onerror = () => {
                console.warn(`Arc: could not load stylesheet ${url}`);
                resolve(link);
            };
        });

        document.head.appendChild(link);
        this.sheets.set(url, { link, ready });
        return ready;
    }

    // Removes a stylesheet that was added with load().
    static unload(href) {
        const url = new URL(href, document.baseURI).href;
        const sheet = this.sheets.get(url);

        if (sheet) {
            sheet.link.remove();
            this.sheets.delete(url);
        }
    }

    // Resolves once every stylesheet added so far has loaded. PageLoader waits on this after
    // importing a page, which covers the styles of any components the page imported.
    static ready() {
        return Promise.all([...this.sheets.values()].map((sheet) => sheet.ready));
    }

    // Replace currently loaded stylesheet live, e.g. after editing it. The new copy is added
    // before the old one is removed, so the page never shows unstyled in between.
    static loadStyleSheet(href) {
        const url = new URL(href, document.baseURI).href;
        const old = this.sheets.get(url);

        if (!old) {
            return this.load(url);
        }

        const link = document.createElement("link");
        link.rel = "stylesheet";
        // The query string makes the browser fetch a fresh copy instead of using its cache
        link.href = `${url}${url.includes("?") ? "&" : "?"}v=${Date.now()}`;

        const ready = new Promise((resolve) => {
            link.onload = link.onerror = () => {
                old.link.remove();
                resolve(link);
            };
        });

        old.link.after(link);
        this.sheets.set(url, { link, ready });
        return ready;
    }
}
