const containerDiv = document.querySelector('.container');
const clearButton = document.querySelector('.clearButton');
const containerWidth = containerDiv.offsetWidth;
const defaultColor = 'grey';
const filledColor = 'aqua';
let gridSize;
let boxLength;

// prompt to ask user how big the grid should be, don't make too many boxes
// so set max to 100 on one side
function promptGridSize() {
    do{
        gridSize = prompt('Please the width of the grid (max 100):', '64');
    
        if (0 >= gridSize || gridSize >= 101) {
            alert('Please enter a number between 1 and 100. Thank you!');
        }
    }  
    while(0 >= gridSize || gridSize >= 101)


boxLength = containerWidth/gridSize;


// create boxs in container to create etch pad

for(i = 0; i < gridSize*gridSize; i++) {
    let newDiv = document.createElement('div');
    newDiv.classList.toggle('box');
    newDiv.style.width = `${boxLength}px`;
    newDiv.style.height = `${boxLength}px`;
    containerDiv.appendChild(newDiv);
}


// etch boxes with a color when hovered over to create pixel art

containerDiv.childNodes.forEach(box => {
    box.addEventListener('mouseover', fillColor);
});

function fillColor() {
    this.style.backgroundColor = filledColor;
}
}
// clear button to default back to a clear grid

clearButton.addEventListener('click', clearGrid);

function clearGrid() {
    containerDiv.childNodes.forEach(box => {
        box.style.backgroundColor = defaultColor;
    });
    promptGridSize();
}

promptGridSize();