import Component from "./Component.js";    
    
export default class Orbit extends Component   {
    constructor(options = {}) {
        super(options);
    }
    function animateOrbit(){
        items.forEach((item, index) => {
            const angle = (index / items.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            item.Component.style.left = `${x}px`;
            item.Component.style.top = `${y}px`;
        });
        requestAnimationFrame(animateOrbit);
    }
    animateOrbit();
}   
    
    
