// Create grid section

const gridContainer = document.querySelector('.grid-container');
// Set background color to access it later for percentage modifications
gridContainer.style.backgroundColor = 'rgb(154, 163, 180)';
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
            gridContainer.lastChild.lastChild.style.backgroundColor = gridContainer.style.backgroundColor;
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
    prepareGridAndRefreshDraw();
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
        reset();

    } else {
        normalModeButtons.forEach(button => button.style.display = 'block');
        monetModeButtons.forEach(button => button.style.display = 'none');
        reset();
    }
}

// Draw section

function refreshDraw() {
    drawOnMousedown();
    drawWhenMoving();
    stopOnMouseup();
}

function prepareGridAndRefreshDraw() {
    prepareGridForNewListener();
    refreshDraw();
}

let mouseIsDown;

function drawOnMousedown() {
    gridSquares.forEach(square => 
        square.addEventListener('mousedown', (e) => {
            mouseIsDown = true;
            square.style.backgroundColor = currentColor;
        }));
}

function drawWhenMoving() {
    gridSquares.forEach(square => 
        square.addEventListener('mousemove', (e) => {
            if (mouseIsDown) {
                square.style.backgroundColor = currentColor;
            }
        }));
}

function stopOnMouseup() {
    gridSquares.forEach(square => 
        square.addEventListener('mouseup', (e) => {
            if (mouseIsDown) {
                square.style.backgroundColor = currentColor;
                mouseIsDown = false;
            }
        }));
}

const eraser = document.querySelector('.eraser');
eraser.addEventListener('click', (e) => {
    prepareGridAndRefreshDraw();
    currentColor = gridContainer.style.backgroundColor;
});

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', (e) => {
    prepareGridAndRefreshDraw();
    reset();
});

function reset() {
    gridSquares.forEach(square => square.style.backgroundColor = gridContainer.style.backgroundColor);
}

function prepareGridForNewListener() {
    removeGridListeners();
    updateGridSquares();
}

function removeGridListeners() {
    gridSquares.forEach(square => {
        squareClone = square.cloneNode();
        square.replaceWith(squareClone);
    });
}

// Lighten and darken section
const lighten = document.querySelector('.lighten');
const darken = document.querySelector('.darken');
let intervalRate = 80;
let shadePercentage = 6;
let lightenPercentage = shadePercentage;
let darkenPercentage = shadePercentage * (-1);

lighten.addEventListener('click', (e) => addShadeListener(lightenPercentage, intervalRate));
darken.addEventListener('click', (e) => addShadeListener(darkenPercentage, intervalRate));

let lightenInterval;
function addShadeListener(percentage, intervalRate) {
    prepareGridForNewListener();
    shadeOnMousedown(percentage, intervalRate);
    shadeOnMouseover(percentage, intervalRate);
    clearShadeOnMouseout();
    clearShadeOnMouseup()
}

function shadeOnMousedown(percentage, intervalRate) {
    gridSquares.forEach(square => 
        square.addEventListener('mousedown', (e) => {
            mouseIsDown = true; 
            lightenInterval = setInterval(function() {
                square.style.backgroundColor = shadeColor(square.style.backgroundColor, percentage);
            }, intervalRate)
        }));
}

function shadeOnMouseover(percentage, intervalRate) {
        gridSquares.forEach(square => 
            square.addEventListener('mouseover', (e) => {
                if (mouseIsDown) {
                    lightenInterval = setInterval(function() {
                        square.style.backgroundColor = shadeColor(square.style.backgroundColor, percentage);
                        }, intervalRate)
                }
            }));
}

function clearShadeOnMouseout() {
        gridSquares.forEach(square => 
            square.addEventListener('mouseout', (e) => clearInterval(lightenInterval)));
}

function clearShadeOnMouseup() {
    gridSquares.forEach(square => 
        square.addEventListener('mouseup', (e) => {
            if (mouseIsDown) {
                mouseIsDown = false;
                clearInterval(lightenInterval);
            }
        }));
}

function shadeColor(color, percent) {
    // Extract RGB values from format: rgb(color, color, color)
    let firstCommaPosition = color.indexOf(',');
    let secondCommaPosition = color.indexOf(',', (firstCommaPosition + 2));
    let closingBracketPosition = color.indexOf(')', (secondCommaPosition + 2))

    let R = color.substring(4, firstCommaPosition);
    let G = color.substring((firstCommaPosition + 2), secondCommaPosition);
    let B = color.substring((secondCommaPosition + 2), closingBracketPosition);

    console.log(R, G, B)
    // Increment or decrement value to avoid rounding small numbers
    R = adjustRGB(R, percent);
    G = adjustRGB(G, percent);
    B = adjustRGB(B, percent);

    R = R * (100 + percent) / 100;
    G = G * (100 + percent) / 100;
    B = B * (100 + percent) / 100;

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    return 'rgb(' + R + ', ' + G + ', ' + B + ')';
}

function adjustRGB(value, percent) {
    if (percent < 0) {
        if (value <= 50) {
            value -= 2;
        }
    } else if (percent > 0) {
        if (value < 2) {
            value = 50;
        }
    }
    return value;
}