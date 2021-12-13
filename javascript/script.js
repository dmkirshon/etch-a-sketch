const containerDiv = document.querySelector('.container');
const clearButton = document.querySelector('.clearButton');
const defaultColor = 'grey';
const filledColor = 'aqua';

// create boxs in container to create etch pad

for(i = 0; i < 16; i++) {
    let newDiv = document.createElement('div');
    newDiv.classList.toggle('box');
    containerDiv.appendChild(newDiv);
}


// etch boxes with a color when hovered over to create pixel art

containerDiv.childNodes.forEach(box => {
    box.addEventListener('mouseover', fillColor);
});

function fillColor() {
    this.style.backgroundColor = filledColor;
}

// clear button to default back to a clear grid

clearButton.addEventListener('click', clearGrid);

function clearGrid() {
    containerDiv.childNodes.forEach(box => {
        box.style.backgroundColor = defaultColor;
        console.log('clear');
    });
}
