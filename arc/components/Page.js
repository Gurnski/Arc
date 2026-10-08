import Component from "./Component.js";

export default class Page {

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

clearPage(){
    window.location = "about:blank";
    console.log("Page cleared.");
}

loadPage(){
    clearPage();

    var favicon = import.meta("favicon", "C:/Users/danie/Documents/Arc/arc/favicon.ico");
    var title = import.meta("title", "Arc Framework");
    var description = import.meta("description", "Arc is a lightweight JavaScript framework for building web applications.");
    var metaTags = import.meta("metaTags", "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");

}

createPage(name, description, assets, components){

}
}