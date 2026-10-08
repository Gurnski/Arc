import Arc from "./arc/Arc.js"; // Import the Arc framework

Arc.init(); // Initialises the Arc Framework


Arc.text("Welcome to Arc", {
    tag: "h1",
    variant: "title"
}).mount(document.querySelector("#app"));

Arc.text("Arc is a lightweight JavaScript framework for building web applications.", {
    tag: "p",
    variant: "subtitle"
}).mount(document.querySelector("#app"));
