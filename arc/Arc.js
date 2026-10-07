import Component from "./components/Component.js";

const Arc = {
    Component,

    meta(title, description) {
        const pageTitle = title || "Arc Framework";
        const metaDescription = description || "Arc is a lightweight JavaScript framework for building web applications.";
        const metaTags = "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"

        return {
            title: pageTitle,
            description: metaDescription,
            tags: metaTags,
        };
    },


    async updatePage()
    {
        try{
            // Update the page size
            const pageHeight = document.body.clientHeight;
            const pageWidth = document.body.clientWidth;
            const pageSize = { height: pageHeight, width: pageWidth };
            console.log(pageSize);
        }
        catch (error){
            console.error("Error updating page size:", error);
        }
    },


    //Initialise the framework
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
