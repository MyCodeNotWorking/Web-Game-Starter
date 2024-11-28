// Define a mouse object to track mouse position and whether the mouse button is pressed
var mouse = {
    x: 0,       // X-coordinate of the mouse relative to the canvas
    y: 0,       // Y-coordinate of the mouse relative to the canvas
    down: false,    // Boolean to track if the mouse button is pressed

    // Method to update the mouse position based on the event's clientX and clientY
    set_position: (e) => {
        // Update mouse coordinates, factoring in canvas position and scaling
        mouse.x = (e.clientX - canvasBound.left) * scaleFactor;
        mouse.y = (e.clientY - canvasBound.top) * scaleFactor;
    },

    // Method to update canvas boundaries on window resize
    update_canvas_bounds: () => {
        const canvas = document.querySelector("canvas");
        const rect = canvas.getBoundingClientRect();
        canvasBound.left = rect.left;
        canvasBound.top = rect.top;
    }
};

// Event listener to update mouse position when the mouse moves
document.addEventListener("mousemove", (e) => {
    mouse.set_position(e);
});

// Event listener to track when the mouse button is pressed down
document.addEventListener("mousedown", (e) => {
    mouse.down = true;
});

// Event listener to track when the mouse button is released
document.addEventListener("mouseup", (e) => {
    mouse.down = false;
});

// Event listener to update canvas boundaries when the window is resized
window.addEventListener("resize", () => {
    mouse.update_canvas_bounds();
});


