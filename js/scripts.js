// Create a class for Brush
class Brush {
    constructor(brushType, size, newColor) {
        this.brushType = brushType; // 'line' or 'circle'
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
        if (this.brushType ==='eraser') {
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



// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth * .80;
    canvas.height = window.innerHeight *.75;
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);



// Default brush settings
let currentBrush = new Brush('line', 10, '#000000');
let isDrawing = false;

// Get UI elements
const brushSizeValue = document.getElementById('brush-size-value');
const colorCircles = document.querySelectorAll('.color-circle');
const decreaseSizeButton = document.getElementById('decrease-size');
const increaseSizeButton = document.getElementById('increase-size');
const lineBrushButton = document.getElementById('line-brush');
const circleBrushButton = document.getElementById('circle-brush');
const clearCanvasButton = document.getElementById('clear-canvas');
const eraserBrushButton = document.getElementById('eraser-brush');


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
    currentBrush = new Brush('line', currentBrush.size, currentBrush.color);
});

circleBrushButton.addEventListener('click', () => {
    currentBrush = new Brush('circle', currentBrush.size, currentBrush.color);
});

eraserBrushButton.addEventListener('click', () => {
    handleButtonClick(eraserBrushButton);
    currentBrush = new Brush('eraser', currentBrush.size, '#FFFFFF'); // Assuming white background
});


function handleButtonClick(button) {
    // Remove 'active' class from all buttons
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    // Add 'active' class to the clicked button
    button.classList.add('active');
}




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

$("#line-brush").click(function () {
    $("#line-brush").css("background-color", "rgba(255, 0, 0, 0.5)");
    $("#circle-brush").css("background-color", "rgba(0, 0, 0, 0)");
    $("#eraser-brush").css("background-color", "rgba(0, 0, 0, 0)");
});

$("#circle-brush").click(function () {
    $("#circle-brush").css("background-color", "rgba(255, 0, 0, 0.5)");
    $("#line-brush").css("background-color", "rgba(0, 0, 0, 0)");
    $("#eraser-brush").css("background-color", "rgba(0, 0, 0, 0)");
});

$("#eraser-brush").click(function () {
    $("#eraser-brush").css("background-color", "rgba(255, 0, 0, 0.5)");
    $("#line-brush").css("background-color", "rgba(0, 0, 0, 0)");
    $("#circle-brush").css("background-color", "rgba(0, 0, 0, 0)");
});

//Eraser Button
eraserBrushButton.addEventListener('click', () => {
    handleButtonClick(eraserBrushButton);
    currentBrush = new Brush('eraser', currentBrush.size, '#FFFFFF'); // Assuming white background
});


const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            hsva: true,
            cmyk: true,
            input: true,
            clear: true,
            save: true
        }
    }
});