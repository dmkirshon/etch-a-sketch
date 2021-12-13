const containerDiv = document.querySelector('.container');

for(i = 0; i < 16; i++) {
    let newDiv = document.createElement('div');
    newDiv.classList.toggle('box');
    containerDiv.appendChild(newDiv);
}

containerDiv.childNodes.forEach(box => {
    box.addEventListener('mouseover', changeColor);
});

function changeColor() {
    this.style.backgroundColor = 'blue';
}
