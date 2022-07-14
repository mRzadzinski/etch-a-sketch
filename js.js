// Create grid
const gridContainer = document.querySelector('.grid-container');
const rowContainer = document.createElement('div');
const div = document.createElement('div');

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

// Get slider value
let slider = document.querySelector('.slider');
let sliderValue = slider.value;
createGrid(sliderValue);

slider.onchange = function() {
    sliderValue = this.value;
    removeGrid();
    createGrid(sliderValue);
}

// Update color picker color
const colorPickerWrapper = document.querySelector('.color-picker-wrapper');
const colorPicker = document.querySelector('.color-picker');

colorPickerWrapper.style.backgroundColor = colorPicker.value;
colorPicker.onchange = function() {
    colorPickerWrapper.style.backgroundColor = colorPicker.value;
}