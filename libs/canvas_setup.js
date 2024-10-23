// Canvas setup
// You can also use libraries like PIXI.js or p5.js in conjunction with WGS
// For using Matter.js with WGS, refer to the tutorial on our website
let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");
c.imageSmoothingEnabled = false;
let scaleFactor = canvas.width / canvas.getBoundingClientRect().width;
let canvasBound = canvas.getBoundingClientRect();

// Prevent default behavior for touch events in and outside the canvas
document.addEventListener('touchstart', (e) => {
    if (e.target === canvas) e.preventDefault();
});

document.addEventListener('touchmove', (e) => {
    if (e.target === canvas) e.preventDefault();
});

document.addEventListener('touchend', (e) => {
    if (e.target === canvas) e.preventDefault();
});