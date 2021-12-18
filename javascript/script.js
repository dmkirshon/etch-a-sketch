/**
 * Script: Etch-a-sketch 
 * Author: David Kirshon
 * Date:Dec 15, 2021
 * This script allows for etching of the grid as well as controls
 * that bring more functionality to the user.
 */

const containerDiv = document.querySelector('.container');
const clearButton = document.querySelector('.clear-button');
const etchStyleButton = document.querySelector('.etch-style-button');
const eraserButton = document.querySelector('.eraser-button');
const etchColorInput = document.querySelector('.etch-color');
const etchColorButton = document.querySelector('.etch-color-button');
const etchColorLabel = document.querySelector('.etch-color-label');
const gridSlider = document.querySelector('.grid-slider');
const gridSliderValue = document.querySelector('.grid-slider-value');
const containerWidth = containerDiv.offsetWidth;
const defaultColor = 'grey';
let defaultFilledColor = 'aqua';
let filledColor = defaultFilledColor;
let gridSize = 0;
let boxLength = 0;
let clickEtchOptionSelected = false;


// Run initial grid creation  
function init() {
    gridSize = gridSlider.value;
    boxLength = containerWidth / gridSize;
    createBoxes();
    etchBoxes();
};
init();


// create boxs in container to create etch pad
function createBoxes() {
    for (i = 0; i < gridSize * gridSize; i++) {
        let newDiv = document.createElement('div');
        newDiv.classList.toggle('box');
        newDiv.setAttribute('draggable', false);
        newDiv.style.width = `${boxLength}px`;
        newDiv.style.height = `${boxLength}px`;
        containerDiv.appendChild(newDiv);
    }
}


// etch boxes with a color when hovered over to create pixel art
function etchBoxes() {
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


// Change the etch style between hover etch and click to etch.
etchStyleButton.addEventListener('click', changeEtchStyle);


function changeEtchStyle() {
    clickEtchOptionSelected = !(clickEtchOptionSelected);
    if (clickEtchOptionSelected) {
        etchStyleButton.textContent = 'Hover-to-Etch';
        containerDiv.childNodes.forEach(box => {
            box.removeEventListener('mouseover', fillColor);
            box.addEventListener('mousedown', clickEtchBoxes);
            box.addEventListener('mouseup', stopEtchBoxes);
        });
    } else {
        etchStyleButton.textContent = 'Click-to-Etch';
        etchBoxes();
        containerDiv.childNodes.forEach(box => {
            box.removeEventListener('mousedown', clickEtchBoxes);
            box.removeEventListener('mouseup', stopEtchBoxes);
        });
    }

}


// Etch boxes when box selected and drag across grid
function clickEtchBoxes(e) {
    // stops the mousedown turning into a drag event
    e.preventDefault();
    // fills in the box where mouse is located
    this.style.backgroundColor = filledColor;
    // etches all the other boxes while mouse is down
    etchBoxes();
}

// Stop etching boxes when invoked
function stopEtchBoxes() {
    containerDiv.childNodes.forEach(box => {
        box.removeEventListener('mouseover', fillColor);
    });
}

// Eraser button turns etched box back to default grid color

eraserButton.addEventListener('click', changeEtchErase);

function changeEtchErase() {
    eraserIsOn = (eraserButton.textContent === 'Eraser')
    if (eraserIsOn) {
        eraserButton.textContent = 'Etch';
        filledColor = defaultColor;
    } else {
        eraserButton.textContent = 'Eraser';
        filledColor = defaultFilledColor;
    }
}

// Change the color of the etch from the default fill

etchColorInput.addEventListener('change', changeEtchColor);

function changeEtchColor() {
    defaultFilledColor = this.value;
    filledColor = defaultFilledColor;
    etchColorButton.style.backgroundColor = filledColor;
    const filledColorRGB = hexToRgb(filledColor);

    // brightness value https://www.w3.org/TR/AERT/#color-contrast
    const brightness =    ((parseInt(filledColorRGB.r) * 299) +
            (parseInt(filledColorRGB.g) * 587) +
            (parseInt(filledColorRGB.b) * 114)) / 1000;
    if(brightness < 125) {
        etchColorLabel.style.color = 'white';
    }
    else {
        etchColorLabel.style.color = 'black';
    }
}

// Convert hex to rgb to evaluate color values
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

// Grid slider to change size of grid dynamically 

gridSlider.addEventListener('input', changeGridSize);

function changeGridSize() {
    gridSliderValue.textContent = gridSlider.value;
    clearGrid();
}
