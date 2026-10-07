import Arc from "./arc/Arc.js";

Arc.init();

Arc.text("Welcome to Arc", {
    tag: "h1",
    variant: "title"
}).mount(document.querySelector("#app"));
