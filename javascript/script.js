const containerDiv = document.querySelector('.container');

// create boxs in container to create etch pad

for(i = 0; i < 16; i++) {
    let newDiv = document.createElement('div');
    newDiv.classList.toggle('box');
    containerDiv.appendChild(newDiv);
}


// etch boxes with a color when hovered over to create pixel art

containerDiv.childNodes.forEach(box => {
    box.addEventListener('mouseover', changeColor);
});

function changeColor() {
    this.style.backgroundColor = 'blue';
}
