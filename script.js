import Arc from "./arc/Arc.js"; // Import the Arc framework

// Initialises the Arc Framework. style.css is shared by every page; each page loads its own styles on top.
Arc.init({ root: "#app", pages: "./pages/", styles: ["./style.css"] });

Arc.loadPage("home"); // Shows pages/home.js
