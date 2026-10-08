import Component from "./Component.js";

// Base class for a site's pages. Each file in the pages/ folder exports a class that
// extends this one, sets its title and description, and builds its content in render().
// Arc.loadPage() handles importing it, swapping it into the page and updating the meta tags.
export default class Page extends Component {
    static title = "";
    static description = "";

    render() {
        return document.createElement("main");
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
