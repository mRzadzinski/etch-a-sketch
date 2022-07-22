// Color palettes
const colorSet1 = ['#996671', '#B2899F', '#D7A099', '#BD7173', '#E1BFCD', '#C28895', '#E88A8A', '#AE7488', '#AF9DB8', '#A2889D', '#D58A90', '#EA968F'];
const colorSet2 = ['#F5CA68', '#FBE277', '#E79329', '#E0793B', '#FDC33F', '#FBD95B', '#AA723D', '#F9CC3B', '#F9E655', '#F9C65B', '#ECB45E', '#F5DD50'];
const colorSet3 = ['#D64D41', '#6C3D35', '#AC443B', '#D54633', '#A75F58', '#8B403B', '#C13A38', '#B13F31', '#E15E3D', '#953F20', '#9F6858', '#DE643B'];
const colorSet4 = ['#EDF3F6', '#C3D9E6', '#A2B2D5', '#B9CBD5', '#85A5C3', '#D3DAEC', '#B0CDD1', '#C4DBDF', '#D9E2F3', '#7FBCE2', '#B7E1DD', '#AFBFD2'];
const colorSet5 = ['#191646', '#1853A0', '#6275B3', '#426EA5', '#354373', '#242A60', '#4C65AA', '#5B7EAC', '#8295B2', '#739DD2', '#3B5A76', '#466EA0'];
const colorSet6 = ['#553D67', '#684A77', '#421836', '#644854', '#B597B7', '#7A6977', '#857992', '#9B91B6', '#BC8591', '#A6809C', '#7D6C84', '#D5B3C1'];
const colorSet7 = ['#C0AB49', '#C1CB74', '#B2B06B', '#D6CE99', '#AEBA36', '#B6BB4F', '#E5DC37', '#B9A038', '#BEC855', '#8A9839', '#B7B93C', '#C1D296'];
const colorSet8 = ['#3F703C', '#8F8F56', '#809E73', '#3F4F48', '#7E7F60', '#5D887E', '#506D7C', '#545248', '#1E6453', '#1F6642', '#1E7372', '#4B6B5E'];
const colorSet9 = ['#F1EBE8', '#C8E0EC', '#C7C4C5', '#EDD9D5', '#E3EEEC', '#CEDDEA', '#E0E9EC', '#F2F6EE', '#FDF5E0', '#D4D4B2', '#FEF0C7', '#E5E7D8'];
const colorSet10 = ['#493857', '#5A4320', '#4D486E', '#6C6263', '#624D4F', '#083E5A', '#42181D', '#2F1B32', '#421938', '#3C5469', '#A5905E', '#757067'];

const allColors = [colorSet1, colorSet2, colorSet3, colorSet4, colorSet5, colorSet6, colorSet7, colorSet8, colorSet9, colorSet10];

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
}

// Update background color
colorPicker.onchange = function() {
    colorPickerColor = colorPicker.value;
    currentColor = colorPickerColor;
    updateButtonColor();
}

colorPicker.onclick = function() {
    clearGridListeners();
    drawNormal();
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
drawNormal();

slider.onchange = function() {
    sliderValue = this.value;
    removeGrid();
    createGrid(sliderValue);
    updateGridSquares();
    drawNormal();
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

for (let i = 1; i < 11; i++) {
    monetModeButtonsArray[i] = monetModeButton.cloneNode();
    monetModeButtonsArray[i].setAttribute('id', `button${i}`);
}


monetModeButtonsArray.forEach(button => monetModeButtonsFragment.appendChild(button));
left.appendChild(monetModeButtonsFragment);
let monetModeButtons = document.querySelectorAll('.monet-mode');

toggle.addEventListener('change', ((e) => setTimeout(toggleModes, 100)));

let button1 = document.querySelector('#button1');
let button2 = document.querySelector('#button2');
let button3 = document.querySelector('#button3');
let button4 = document.querySelector('#button4');
let button5 = document.querySelector('#button5');
let button6 = document.querySelector('#button6');
let button7 = document.querySelector('#button7');
let button8 = document.querySelector('#button8');
let button9 = document.querySelector('#button9');
let button10 = document.querySelector('#button10');

function toggleModes() {
    if (toggle.checked) {
        normalModeButtons.forEach(button => button.style.display = 'none');
        monetModeButtons.forEach(button => button.style.display = 'block');
        resetGridColor();


        document.querySelector('#button1').style.backgroundColor = colorSet1[11];
        document.querySelector('#button2').style.backgroundColor = colorSet2[8];
        document.querySelector('#button3').style.backgroundColor = colorSet3[3];
        document.querySelector('#button4').style.backgroundColor = colorSet4[9];
        document.querySelector('#button5').style.backgroundColor = colorSet5[1];
        document.querySelector('#button6').style.backgroundColor = colorSet6[1];
        document.querySelector('#button7').style.backgroundColor = colorSet7[4];
        document.querySelector('#button8').style.backgroundColor = colorSet8[9];
        document.querySelector('#button9').style.backgroundColor = colorSet9[8];
        document.querySelector('#button10').style.backgroundColor = colorSet10[1];

        for (let i = 0; i < 10; i++) {
            monetModeButtons[i].addEventListener('click', (e) => {
                currentMonetButton = i;
                clearGridListeners();
                drawRandom();
            });
        }

    } else {
        normalModeButtons.forEach(button => button.style.display = 'block');
        monetModeButtons.forEach(button => button.style.display = 'none');
        clearGridListeners();
        resetGridColor();
        drawNormal();
    }
}

// Draw section
let currentMonetButton;
let mouseIsDown;

function drawNormal() {
    drawOnMousedown(colorNormal);
    drawWhenMoving(colorNormal);
    stopOnMouseup(colorNormal);
}

function drawRandom() {
    drawOnMousedown(colorRandom);
    drawWhenMoving(colorRandom);
    stopOnMouseup(colorRandom);
}

function drawRainbow() {
    drawOnMousedown(colorRainbow);
    drawWhenMoving(colorRainbow);
    stopOnMouseup(colorRainbow);
}

function colorNormal() {
    return currentColor;
}

function colorRandom() {
    currentColor = allColors[currentMonetButton][random(12)];
    return currentColor;
}

function colorRainbow() {
    currentColor = allColors[random(10)][random(12)];
    return currentColor;
}

function random(max) {
    let randomNumber = Math.floor(Math.random() * max);
    return randomNumber;
}

function drawOnMousedown(drawingColor) {
    gridSquares.forEach(square => 
        square.addEventListener('mousedown', (e) => {
            mouseIsDown = true;
            square.style.backgroundColor = drawingColor();
        }));
}

function drawWhenMoving(drawingColor) {
    gridSquares.forEach(square => 
        square.addEventListener('mouseenter', (e) => {
            if (mouseIsDown) {
                square.style.backgroundColor = drawingColor();
            }
        }));
}

function stopOnMouseup(drawingColor) {
    gridSquares.forEach(square => 
        square.addEventListener('mouseup', (e) => {
            if (mouseIsDown) {
                square.style.backgroundColor = drawingColor();
                mouseIsDown = false;
            }
        }));
}

const eraser = document.querySelector('.eraser');
eraser.addEventListener('click', (e) => {
    clearGridListeners();
    drawNormal();
    currentColor = gridContainer.style.backgroundColor;
});

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', (e) => {
    clearGridListeners();
    drawNormal();
    resetGridColor();
});

const rainbowButton = document.querySelector('#rainbow');
rainbowButton.onclick = function() {
    clearGridListeners();
    drawRainbow();
}

function resetGridColor() {
    gridSquares.forEach(square => square.style.backgroundColor = gridContainer.style.backgroundColor);
}

function clearGridListeners() {
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
    clearGridListeners();
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

let arr1 = ['me', 'you'];
let arr2 = ['they', 'cats'];
let arrays = [arr1, arr2];