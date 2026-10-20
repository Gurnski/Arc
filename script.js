import Arc from "./arc/Arc.js"; // Import the Arc framework
import PageLoader from "./arc/core/PageLoader.js"; // Import the PageLoader module

Arc.init({ root: "#app", pages: "./pages/" }); // Initialises the Arc Framework

// Loads the home page
PageLoader.loadPage("home"); // Shows pages/home.js
