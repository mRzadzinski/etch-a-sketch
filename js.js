// Create grid section

const gridContainer = document.querySelector('.grid-container');
// Set background color to access it later for percentage modifications
gridContainer.style.backgroundColor = 'rgb(236, 236, 236)';
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
const lighten = document.querySelector('.lighten');
const darken = document.querySelector('.darken');
let colorPickerColor = colorPicker.value;

let currentColor = colorPickerColor;

updateButtonColor();
function updateButtonColor() {
    colorPickerWrapper.style.backgroundColor = colorPickerColor;
    lighten.style.backgroundColor = shadeColor(colorPickerColor, 200);
    darken.style.backgroundColor = shadeColor(colorPickerColor, -50);
}

// Update background color
colorPicker.onchange = function() {
    colorPickerColor = colorPicker.value;
    currentColor = colorPickerColor;
    updateButtonColor();
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

for (let i = 0; i < 10; i++) {
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
            square.style.backgroundColor = shadeColor(square.style.backgroundColor, percentage);
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
    // Extract RGB values from hexadecimal format: #xxxxxx
    if (color[0] === '#') {
        let R = parseInt(color.substring(1,3),16);
        let G = parseInt(color.substring(3,5),16);
        let B = parseInt(color.substring(5,7),16);

        let RGB = RbgCalculations(R, G, B, percent);

        let RR = ((RGB[0].toString(16).length == 1) ? "0" + RGB[0].toString(16) : RGB[0].toString(16));
        let GG = ((RGB[1].toString(16).length == 1)? "0" + RGB[1].toString(16) : RGB[1].toString(16));
        let BB = ((RGB[2].toString(16).length == 1) ? "0" + RGB[2].toString(16) : RGB[2].toString(16));

       

        return '#' + RR + GG + BB;

    // // Extract RGB values from decimal format: rgb(color, color, color)
    } else if (color[0] === 'r') {
        let firstCommaPosition = color.indexOf(',');
        let secondCommaPosition = color.indexOf(',', (firstCommaPosition + 2));
        let closingBracketPosition = color.indexOf(')', (secondCommaPosition + 2))
    
        let R = color.substring(4, firstCommaPosition);
        let G = color.substring((firstCommaPosition + 2), secondCommaPosition);
        let B = color.substring((secondCommaPosition + 2), closingBracketPosition);

        let RGB = RbgCalculations(R, G, B, percent);
        return 'rgb(' + RGB[0] + ', ' + RGB[1] + ', ' + RGB[2] + ')';
    }
}

function RbgCalculations(R, G, B, percent) {
    R = adjustRGB(R, percent);
    G = adjustRGB(G, percent);
    B = adjustRGB(B, percent);

    R = Math.round(R * (100 + percent) / 100);
    G = Math.round(G * (100 + percent) / 100);
    B = Math.round(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    let RGB = [R, G, B];
    return RGB;
}

// Increment or decrement value to avoid rounding small numbers
function adjustRGB(value, percent) {
    if (percent < 0) {
        if (value <= 50 && value >= 2) {
            value -= 2;
        } else if (value < 2) {
            value = 0;
        }

    } else if (percent > 0) {
        if (value < 2) {
            value = 50;
        }
    }
    return value;
}