// Create grid
const gridContainer = document.querySelector('.grid-container');
const rowContainer = document.createElement('div');
const div = document.createElement('div');
let gridSquares;

rowContainer.classList.add('row-container');
div.classList.add('grid-square');


function createGrid(value) {
    // Check parity
    let a = value;
    if (a % 2 !== 0) {
        a += 1;
    }
    // Loop to create grid
    for (let i = 0; i < value; i++) {
        gridContainer.appendChild(rowContainer.cloneNode());
        for (let j = 0; j < (value * 1.5); j++) {
            gridContainer.lastChild.appendChild(div.cloneNode());
        }
    }
}

function removeGrid() {
    gridContainer.innerHTML = '';
}

// Color picker functionality
const colorPickerWrapper = document.querySelector('.color-picker-wrapper');
const colorPicker = document.querySelector('.color-picker');
let colorPickerColor = colorPicker.value;
let currentColor = colorPickerColor;

colorPickerWrapper.style.backgroundColor = colorPickerColor;

// Update background color
colorPicker.onchange = function() {
    colorPickerColor = colorPicker.value;
    colorPickerWrapper.style.backgroundColor = colorPickerColor;
    currentColor = colorPickerColor;
}

colorPicker.onclick = function() {
    currentColor = colorPickerColor;
};

// Get slider value
function updateGridSquares() {
    gridSquares = document.querySelectorAll('.grid-square');
}

let slider = document.querySelector('.slider');
let sliderValue = slider.value;
createGrid(sliderValue);
updateGridSquares();
refreshDraw();

slider.onchange = function() {
    sliderValue = this.value;
    removeGrid();
    createGrid(sliderValue);
    updateGridSquares();
    refreshDraw();
}

// Toggle modes section
const left = document.querySelector('.left');
const normalModeButtons = document.querySelectorAll('.normal-mode');
const toggle = document.querySelector('#checkbox');
// Create monet-mode buttons
const monetModeButton =  document.createElement('div');
monetModeButton.classList.add('buttons', 'monet-mode');
// To append new buttons create array -> append elements to DocumentFragment -> append to DOM button section -> select
let monetModeButtonsFragment = document.createDocumentFragment();
let monetModeButtonsArray = [];

for (let i = 0; i < 8; i++) {
    monetModeButtonsArray[i] = monetModeButton.cloneNode();
}
monetModeButtonsArray.forEach(button => monetModeButtonsFragment.appendChild(button));
left.appendChild(monetModeButtonsFragment);
let monetModeButtons = document.querySelectorAll('.monet-mode');

toggle.addEventListener('change', ((e) => setTimeout(toggleModes, 100)));

function toggleModes() {
    if (toggle.checked) {
        normalModeButtons.forEach(button => button.style.display = 'none');
        monetModeButtons.forEach(button => button.style.display = 'block');

    } else {
        normalModeButtons.forEach(button => button.style.display = 'block');
        monetModeButtons.forEach(button => button.style.display = 'none');
    }
}

// Draw section

function refreshDraw() {
    stopDrawing();
    startDrawing();
}

function stopDrawing() {
    gridSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
    updateGridSquares();
}

function startDrawing() {
    gridSquares.forEach(square => 
        square.addEventListener('mouseover', (e) => square.style.backgroundColor = currentColor));
}

const eraser = document.querySelector('.eraser');
eraser.addEventListener('click', (e) => {
    currentColor = gridContainer.style.backgroundColor;
});

const reset = document.querySelector('#reset');
reset.addEventListener('click', (e) => {
    gridSquares.forEach(square => square.style.backgroundColor = gridContainer.style.backgroundColor)
});

window.onmousedown = stopDrawing;
window.onmouseup = startDrawing;