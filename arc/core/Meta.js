// Manages the tags in the page's <head>. Each function updates the existing tag if
// there is one, so they can be called again (e.g. when the page changes) without
// creating duplicates.
const Meta = {
    // Sets any of the title, description, keywords and favicon. Anything left out stays as it is.
    set({ title, description, keywords, favicon } = {}) {
        if (title) this.setTitle(title);
        if (description) this.setDescription(description);
        if (keywords) this.setKeywords(keywords);
        if (favicon) this.setFavicon(favicon);
    },

    setTitle(title) {
        document.title = title;
    },

    setDescription(description) {
        this.setTag("description", description);
    },

    setKeywords(keywords) {
        this.setTag("keywords", keywords);
    },

    setFavicon(path) {
        let link = document.head.querySelector('link[rel="icon"]');

        if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
        }

        link.href = path;
    },

    // Finds the <meta name="..."> tag, creating it if it doesn't exist, and sets its content.
    setTag(name, content) {
        let tag = document.head.querySelector(`meta[name="${name}"]`);

        if (!tag) {
            tag = document.createElement("meta");
            tag.name = name;
            document.head.appendChild(tag);
        }

        tag.content = content;
    }
};

export default Meta;
