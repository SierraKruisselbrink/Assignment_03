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

// Get the canvas and context
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');



// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth * .80;
    canvas.height = window.innerHeight * .80;
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);



// Default brush settings
let currentBrush = new Brush('line', 10, '#000000');
console.log(currentBrush.color);
let isDrawing = false;

// Get UI elements
const brushSizeValue = document.getElementById('brush-size-value');
const colorCircles = document.querySelectorAll('.color-circle');
const decreaseSizeButton = document.getElementById('decrease-size');
const increaseSizeButton = document.getElementById('increase-size');
const lineBrushButton = document.getElementById('line-brush');
const circleBrushButton = document.getElementById('circle-brush');
const clearCanvasButton = document.getElementById('clear-canvas');

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

// // Clear Canvas button
clearCanvasButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})