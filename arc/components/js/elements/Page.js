import Component from "./Component.js";

// Base class for a site's pages. Each file in the pages/ folder exports a class that
// extends this one, sets its title and description, and lists its components in content().
// Arc.loadPage() handles importing it, loading its styles, swapping it into the page and
// updating the meta tags.
export default class Page extends Component {
    static title = "";
    static description = "";
    // Stylesheets only this page uses, relative to the page's file. They're loaded before the
    // page appears and removed when another page replaces it.
    static styles = [];

    render() {
        const main = document.createElement("main");
        this.place(this.content(), main);
        return main;
    }

    // Override to return the page's components, elements and text, top to bottom.
    // Anything placed this way is cleaned up automatically when the page is left.
    content() {
        return [];
    }

    createDesign(){

    }

    saveDesign(fileLocation){

    }

    loadDesign(fileLocation){

    }

    updatePage()
    {
    try{
        // Update the page size
        const pageHeight = document.body.clientHeight;
        const pageWidth = document.body.clientWidth;
        const pageSize = { height: pageHeight, width: pageWidth };
        console.log(`pageSize: {pageheight: ${pageHeight}, pageWidth: ${pageWidth}}`);
    }
    catch (error){
        console.error("Error updating page size:", error);
    }
    }
}
