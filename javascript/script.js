const containerDiv = document.querySelector('.container');
const clearButton = document.querySelector('.clear-button');
const etchStyleButton = document.querySelector('.etch-style-button');
const containerWidth = containerDiv.offsetWidth;
const defaultColor = 'grey';
const filledColor = 'aqua';
let gridSize = 0;
let boxLength = 0;


// Run initial grid creation  

function init() {
    promptGridSize();
    createBoxes();
    etchBoxes();
};
init();

// Prompt user for Grid width, max 100 blocks

function promptGridSize() {
    do{
        gridSize = prompt('Please the width of the grid (max 100):', '64');
    
        if (0 >= gridSize || gridSize >= 101) {
            alert('Please enter a number between 1 and 100. Thank you!');
        }
    }  
    while(0 >= gridSize || gridSize >= 101)

    boxLength = containerWidth/gridSize;
}



// create boxs in container to create etch pad
function createBoxes() {
    for(i = 0; i < gridSize*gridSize; i++) {
        let newDiv = document.createElement('div');
        newDiv.classList.toggle('box');
        newDiv.style.width = `${boxLength}px`;
        newDiv.style.height = `${boxLength}px`;
        containerDiv.appendChild(newDiv);
    }
}


// etch boxes with a color when hovered over to create pixel art
function etchBoxes () {
    containerDiv.childNodes.forEach(box => {
        box.addEventListener('mouseover', fillColor);
    });
}

function fillColor() {
    this.style.backgroundColor = filledColor;
}

// clear button to default back to a clear grid

clearButton.addEventListener('click', clearGrid);

function clearGrid() {
    while (containerDiv.firstChild) {
        containerDiv.removeChild(containerDiv.firstChild);
    }
    init();
}

// Change etch style from mouse over to mouse down for easier etching for user

etchStyleButton.addEventListener('click', changeEtchStyle);

function changeEtchStyle() {
    containerDiv.childNodes.forEach(box => {
        box.removeEventListener('mouseover', fillColor);
        box.addEventListener('mousedown', etchBoxes);
        box.addEventListener('mouseup', stopEtchBoxes);
    });
}

function stopEtchBoxes() {
    containerDiv.childNodes.forEach(box => {
        box.removeEventListener('mouseover', etchBoxes);
    });
}