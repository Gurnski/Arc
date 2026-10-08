import Component from "./Component.js";

export default class Image extends Component {

    loadImage(directory) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = directory;
            img.onload = () => resolve(img);
            img.onerror = (error) => reject(error);
        });
    }
}