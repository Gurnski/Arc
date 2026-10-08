export default class Page extends Component {
    
async updatePage()
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

}

createPage(){

}
}