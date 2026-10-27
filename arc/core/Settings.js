const settings = {
    "name": "Arc Framework",
    "version": "0.1",
    "description": "A framework for building single page web applications.",
    "settings": {
        "theme": "light",
        "language": "en"
    }
};

console.log("JSON:", settings);
saveJsonToFile(settings, "settings.json");

function saveJsonToFile(jsonData, filename) {
    const jsonString = JSON.stringify(jsonData, null, 2); // Convert JSON to string with indentation
    const blob = new Blob([jsonString], { type: "application/json" }); // Create a Blob with the JSON data
    const url = URL.createObjectURL(blob); // Create a temporary URL for the Blob

    // Create a link element and trigger a download
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the temporary URL
}