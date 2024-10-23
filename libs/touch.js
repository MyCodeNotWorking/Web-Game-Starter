// Define a touch object to track touch position and state
var touch = {
    x: null,        // X-coordinate of the touch relative to the canvas
    y: null,        // Y-coordinate of the touch relative to the canvas
    active: false,  // Boolean to track if a touch is active

    // Method to update the touch position based on the event's touches[0] (first touch point)
    set_position: (e) => {
        if (e.touches.length > 0) {
            const touchPoint = e.touches[0];
            touch.x = (touchPoint.clientX - canvasBound.left) * scaleFactor;
            touch.y = (touchPoint.clientY - canvasBound.top) * scaleFactor;
        }
    },

    // Method to update canvas boundaries on window resize
    update_canvas_bounds: () => {
        const canvas = document.querySelector("canvas");
        const rect = canvas.getBoundingClientRect();
        canvasBound.left = rect.left;
        canvasBound.top = rect.top;
    }
};

// Event listener to update touch position when a touch moves on the screen
document.addEventListener("touchmove", (e) => {
    touch.set_position(e);
    e.preventDefault(); // Prevent default touch scrolling behavior
});

// Event listener to track when a touch starts
document.addEventListener("touchstart", (e) => {
    touch.active = true;
    touch.set_position(e); // Set the initial touch position
    e.preventDefault(); // Prevent default touch behavior
});

// Event listener to track when a touch ends
document.addEventListener("touchend", (e) => {
    touch.active = false;
    e.preventDefault(); // Prevent default touch behavior
});

// Event listener to update canvas boundaries when the window is resized
window.addEventListener("resize", () => {
    touch.update_canvas_bounds();
});