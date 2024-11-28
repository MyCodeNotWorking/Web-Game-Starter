// Define a good delta time (frame duration) for 60 FPS
var delta_time = 1000 / 60; 
var fps = 60;

// Calculate the time difference (delta time) between frames
function calculate_dt() {
    var dt_old = performance.now();

    // Use requestAnimationFrame to measure the time between frames
    window.requestAnimationFrame(() => {
        // Update delta_time, limiting it to max_delta to prevent big jumps
        delta_time = performance.now() - dt_old;
        fps = 1000 / delta_time;
    });

    window.requestAnimationFrame(calculate_dt);
}
// Calculate the time difference (delta time) between frames
calculate_dt();