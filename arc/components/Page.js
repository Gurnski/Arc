export default class Page{
    constructor(props = {}) {
        this.props = props;
        this.element = null;
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