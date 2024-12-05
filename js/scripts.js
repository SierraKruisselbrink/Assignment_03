


class Brush {
    constructor(brushType, size, newColor) {
        this.brushType = brushType; 
        this.size = size;
        this.color = newColor;
    }

    setBrushSize(size) {
        this.size = size;
    }

    setBrushColor(color) {
        this.color = color;
    }

    draw(ctx, x, y) {
        if (this.brushType === 'eraser') {
            ctx.lineWidth = this.size;
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineTo(x, y);
            ctx.stroke();
        } else {
            ctx.fillStyle = this.color;
            if (this.brushType === 'line') {
                ctx.lineWidth = this.size;
                ctx.strokeStyle = this.color;
                ctx.lineTo(x, y);
                ctx.stroke();
            } else if (this.brushType === 'circle') {
                ctx.beginPath();
                ctx.arc(x, y, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

// Get the canvas and context
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');

resizeCanvas();

window.addEventListener('resize', resizeCanvas);



// Default brush settings
let currentBrush = new Brush('line', 10, '#000000');
let isDrawing = false;

let previousBrushColor = currentBrush.color;

// Get UI elements
const brushSizeValue = document.getElementById('brush-size-value');
const colorCircles = document.querySelectorAll('.color-circle');
const decreaseSizeButton = document.getElementById('decrease-size');
const increaseSizeButton = document.getElementById('increase-size');
const lineBrushButton = document.getElementById('line-brush');
const circleBrushButton = document.getElementById('circle-brush');
const clearCanvasButton = document.getElementById('clear-canvas');
const eraserBrushButton = document.getElementById('eraser-brush');
const lightThemeButton = document.getElementById('light-theme');
const darkThemeButton = document.getElementById('dark-theme');




function restoreOriginalColors() {
    const colorCircles = document.querySelectorAll('.color-circle');
    colorCircles.forEach((circle, index) => {
        circle.style.backgroundColor = originalColors[index];
        circle.dataset.color = originalColors[index];
    });
}

function setTheme(pageColor, canvasColor, buttonColor) {
    document.body.style.backgroundColor = pageColor;
    setCanvasBackgroundColor(canvasColor);
    setButtonBackgroundColor(buttonColor);
    currentBackgroundColor = backgroundColor;
}

function handleThemeButtonClick(button) {
    document.querySelectorAll('.theme-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

function resizeCanvas() {
    canvas.width = window.innerWidth * .80;
    canvas.height = window.innerHeight * .75;
}

function handleButtonClick(button) {
    $('.brush-button').removeClass('active');
    $('.brush-button').removeClass('active-eraser');
    if (button.id === 'eraser-brush') {
        $(button).addClass('active-eraser');
    } else {
        $(button).addClass('active');
    }
}

// Toggle light mode
lightThemeButton.addEventListener('click', () => {
    document.body.classList.remove('dark-mode');
    document.body.classList.remove('christmas-theme');
    document.body.classList.remove('underwater-theme');
    document.body.classList.add('light-mode');
    restoreOriginalColors();
    document.querySelector('.color-palette-container').classList.remove('christmas-palette');
    handleThemeButtonClick(lightThemeButton);
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('light-mode');
    handleThemeButtonClick(lightThemeButton);
    handleButtonClick(lineBrushButton);
});

// Toggle dark mode
darkThemeButton.addEventListener('click', () => {
    document.body.classList.remove('light-mode');
    document.body.classList.remove('christmas-theme');
    document.body.classList.remove('underwater-theme');
    document.body.classList.add('dark-mode');
    restoreOriginalColors();
    document.querySelector('.color-palette-container').classList.remove('christmas-palette');
    handleThemeButtonClick(darkThemeButton);
});

// Update brush size
decreaseSizeButton.addEventListener('click', () => {
    if (currentBrush.size > 1) {
        currentBrush.setBrushSize(currentBrush.size - 1);
        brushSizeValue.textContent = currentBrush.size;
    }
});

increaseSizeButton.addEventListener('click', () => {
    if (currentBrush.size < 50) {
        currentBrush.setBrushSize(currentBrush.size + 1);
        brushSizeValue.textContent = currentBrush.size;
    }
});


// Update brush color
colorCircles.forEach(circle => {
    circle.addEventListener('click', (e) => {
        currentBrush.setBrushColor(e.target.dataset.color);
    });
});

// Toggle between brushes
lineBrushButton.addEventListener('click', () => {
    handleButtonClick(lineBrushButton);
    currentBrush = new Brush('line', currentBrush.size, previousBrushColor);
});

circleBrushButton.addEventListener('click', () => {
    handleButtonClick(circleBrushButton);
    currentBrush = new Brush('circle', currentBrush.size, previousBrushColor);
});


// Start drawing when mouse is pressed down
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

// Draw on the canvas when the mouse is moved (if drawing)
canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        currentBrush.draw(ctx, e.offsetX, e.offsetY);
    }
});

// Stop drawing when the mouse is released
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Stop drawing if the mouse leaves the canvas
canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});

// Clear Canvas button
clearCanvasButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})


//Eraser Button
eraserBrushButton.addEventListener('click', () => {
    handleButtonClick(eraserBrushButton);
    previousBrushColor = currentBrush.color; // Store the current brush color
    currentBrush = new Brush('eraser', currentBrush.size, '#FFFFFF'); // Assuming white background
});

// Color picker, taken from https://simonwep.github.io/pickr/
const pickr = Pickr.create({
    el: '.color-picker-button',
    theme: 'classic', // or 'monolith', or 'nano'
    default: '#000000',
    useAsButton: true,

    components: {

        // Main components
        preview: true,
        opacity: false,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: false,
            save: true
        }
    }
});

pickr.on('save', (color, instance) => {
    currentBrush.setBrushColor(color.toHEXA().toString());
    pickr.hide();
});


// Add event listeners to brush buttons
$('.brush-button').click(function () {
    handleButtonClick(this);
});

// Add event listener to eraser button
$('#eraser-brush').click(function () {
    handleButtonClick(this);
    });




// Christmas theme
document.getElementById('christmas-theme').addEventListener('click', () => {
    document.body.classList.remove('light-mode');
    document.body.classList.remove('dark-mode');
    document.body.classList.remove('underwater-theme');
    document.body.classList.add('christmas-theme');
    const colorCircles = document.querySelectorAll('.color-circle');
    colorCircles.forEach((circle, index) => {
        circle.style.backgroundColor = christmasColors[index % christmasColors.length];
        circle.dataset.color = christmasColors[index % christmasColors.length];
    });
    document.querySelector('.color-palette-container').classList.add('christmas-palette');
    handleThemeButtonClick(document.getElementById('christmas-theme'));
});

function setCanvasBackgroundColor(color) {
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function setButtonBackgroundColor(color) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.backgroundColor = color;
    });
}


const christmasColors = [
    'rgb(48, 42, 10)', // Brown
    'rgb(98, 22, 34)', // Dark Red
    'rgb(110, 50, 13)', // Brown
    'rgb(159, 15, 14)', // Cherry Red 
    'rgb(201, 40, 30)', // Bright Red 
    'rgb(154, 49, 72)', // Red
    'rgb(193, 108, 129)', // Pink
    'rgb(187, 109, 33)', // Dark Yellow
    'rgb(179, 111, 64)', // Light Brown
    'rgb(114, 117, 97)', // Grey
    'rgb(180, 182, 169)', // Light Grey
    'rgb(214, 183, 152)', // Beige
 
    'rgb(25, 45, 36)', // Dark Green
    'rgb(43, 72, 54)', // Green
    'rgb(55, 88, 57)', // Olive Green 
    'rgb(31, 81, 32)', // Bright Green
    'rgb(123, 144, 49)', // Yellow Green
    'rgb(131, 160, 67)', // Light Green
    'rgb(68, 126, 150)', // Blue
    'rgb(107, 146, 163)', // Light Blue
    'rgb(112, 142, 118)', // Light Blue
    'rgb(195, 200, 204)', // Light Grey snow
    'rgb(227, 227, 227)', // Snow
    'rgb(251, 205, 58)' // Yellow
 
    ];

// Store original colors of color circles
const originalColors = [];
document.querySelectorAll('.color-circle').forEach(circle => {
    originalColors.push(circle.style.backgroundColor);
});


// Ocean theme 

const underwaterColors = [
    'rgb(0, 51, 102)', // Dark Blue
    'rgb(0, 76, 153)', // Navy Blue
    'rgb(0, 102, 204)', // Medium Blue
    'rgb(0, 105, 148)', // Deep Blue
    'rgb(0, 153, 255)', // Light Blue
    'rgb(0, 168, 243)', // Sky Blue
    'rgb(0, 204, 255)', // Sky Blue
    'rgb(0, 255, 255)', // Cyan
    'rgb(0, 255, 204)', // Aqua
    'rgb(0, 255, 153)', // Mint
    'rgb(0, 255, 102)', // Sea Green
    'rgb(0, 255, 51)', // Bright Green
    'rgb(0, 51, 51)', // Deep Green
    'rgb(0, 102, 51)', // Forest Green
    'rgb(0, 128, 128)', // Teal
    'rgb(0, 153, 102)', // Dark Green
    'rgb(0, 204, 102)', // Green
    'rgb(0, 204, 153)', // Light Green
    'rgb(0, 255, 204)', // Pale Green
    'rgb(255, 127, 80)', // Coral
    'rgb(255, 160, 122)', // Light Coral
    'rgb(255, 182, 193)', // Light Pink
    'rgb(255, 165, 0)', // Orange
    'rgb(255, 255, 0)'  // Yellow
];

document.getElementById('underwater-theme').addEventListener('click', () => {
    document.body.classList.remove('light-mode');
    document.body.classList.remove('dark-mode');
    document.body.classList.remove('christmas-theme');
    document.body.classList.add('underwater-theme');
    const colorCircles = document.querySelectorAll('.color-circle');
    colorCircles.forEach((circle, index) => {
        circle.style.backgroundColor = underwaterColors[index % underwaterColors.length];
        circle.dataset.color = underwaterColors[index % underwaterColors.length];
    });
    handleThemeButtonClick(document.getElementById('underwater-theme'));
});

document.getElementById('underwater-theme').addEventListener('click', () => {
    document.body.classList.remove('light-mode');
    document.body.classList.remove('dark-mode');
    document.body.classList.remove('christmas-theme');
    document.body.classList.add('underwater-theme');
    const colorCircles = document.querySelectorAll('.color-circle');
    colorCircles.forEach((circle, index) => {
        circle.style.backgroundColor = underwaterColors[index % underwaterColors.length];
        circle.dataset.color = underwaterColors[index % underwaterColors.length];
    });
    handleThemeButtonClick(document.getElementById('underwater-theme'));
});