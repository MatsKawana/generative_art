const artBox = document.getElementById('artBox');
const button = document.getElementById('button');
const maxWidth = document.getElementById('maxwidth');
const maxHeight = document.getElementById('maxheight');

// Art Variables
const color = ["orange", "pink", "teal", "white", "maroon"]
let counter = 0;
let positionY = 50;
let positionX = 50;
let maxWidthSet = 0;
let maxHeightSet = 0;

const generateArt = () => {

    // Slider Handler | Max Width & Min Width
    maxWidthSet = maxWidth.value;
    maxHeightSet = maxHeight.value;
    
    const handleSliders = (ev) => {
        console.log(ev.target.id, ev.target.value);
        if (ev.target.id === 'maxheight') {
            maxHeightSet = Number(ev.target.value); // returns string -> convert first
        } else if (ev.target.id === 'maxwidth') {
            maxWidthSet = Number(ev.target.value);
        }
    }
    
    // Create Art Pieces
    const createPieces = setInterval(() => {
        counter++;

        // Position to Trace from Previous Position
        if (positionY >= (10) && positionY <= 90) {
            positionY += Math.ceil(Math.random() * 5) * (Math.round(Math.random()) ? 1 : -1);
        } else if (positionY < (10)) {
            positionY += Math.floor(Math.random() * 10);
        } else if (positionY > 90) {
            positionY -= Math.floor(Math.random() * 10);
        }

        if (positionX >= (10) && positionX <= 90) {
            positionX += Math.ceil(Math.random() * 5) * (Math.round(Math.random()) ? 1 : -1);
        } else if (positionX < (10)) {
            positionX += Math.floor(Math.random() * 10);
        } else if (positionX > 90) {
            positionX -= Math.floor(Math.random() * 10);
        }

        // console.log(`Y: ${positionY}`);
        // console.log(`X: ${positionX}`);

        const div = document.createElement('div');
        div.classList.add('artPiece');

        // Rotation
        div.style.transform = `rotate(${Math.floor(Math.random() * 179)}deg)`

        // Shape
        div.style.width = Math.floor(Math.random() * maxWidthSet) + 'px';
        div.style.height = Math.floor(Math.random() * maxHeightSet) + 'px';

        // Color
        div.style.background = color[Math.floor(Math.random() * color.length)];
        
        // Border Radius
        div.style.borderRadius = Math.floor(Math.random() * 100) + 'px';

        // Position
        div.style.top = positionY + '%';
        div.style.left = positionX + '%';
        div.style.transform = 'translate(-' + positionY + '%, -' + positionX + '%)';

        // Shine
            // Color Rendered
            let colorRend = div.style.getPropertyValue('background');

            // Height Rendered
            let heightRend = div.style.getPropertyValue('height'); // Rendered eg. 25px
            let heightVal = Number(heightRend.slice(0, heightRend.length-2)); // Remove 'px' eg. 25

            // Width Rendered
            let widthRend = div.style.getPropertyValue('width');
            let widthVal = Number(widthRend.slice(0, widthRend.length-2));
           
        // Append
        artBox.appendChild(div);

        // Shine Conditions
        if (colorRend !== 'white') {
            const shine = document.createElement('div');
            shine.style.position = 'absolute';
            shine.style.background = 'white';
            shine.style.aspectRatio = 1;
            shine.style.borderRadius = 50 + '%';

            const shineVert = document.createElement('div');
            shineVert.style.position = 'absolute';
            shineVert.style.background = 'white';
            shineVert.style.borderRadius = 25 + '%';

            // Dot | Bigger than 20px H & W
            if (widthVal >= 20 && heightVal >= 20) {
                shine.style.width = (widthVal * .1) + 'px';
                shine.style.top = (heightVal * .15) + 'px';
                shine.style.left = (widthVal * .2) + 'px';
                div.appendChild(shine);
            }

            // Vertical Shine | Height > Width with Minimums
            if (heightVal >= (widthVal * 1.5) && widthVal >= 20 && heightVal >= 20) {
                shineVert.style.width = (widthVal * .1) + 'px';
                shineVert.style.height = (heightVal * .4) + 'px';
                shineVert.style.top = (heightVal * .25) + 'px';
                shineVert.style.left = (widthVal * .2) + 'px';
                div.appendChild(shineVert);
            }
        }
    
        // Stop Condition | 800 times
        if (counter >= 800) {
            clearInterval(createPieces);
        }
    }, 17) 

    // Event Listener for Sliders
    maxHeight.addEventListener('change', handleSliders);
    maxWidth.addEventListener('change', handleSliders);
}

const cleanUp = (ev) => {
    counter = 0;
    positionY = 50;
    positionX = 50;
    // Remove all art divs
    while (artBox.firstChild) {
        artBox.removeChild(artBox.firstChild);
    }
    // Generate Art
    generateArt();
}


button.addEventListener('click', cleanUp);
