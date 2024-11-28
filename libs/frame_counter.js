// Initialize the current frame count
var game_frame = 0;

// Increment the frame counter
function set_frame() {
    game_frame += 1;

    window.requestAnimationFrame(set_frame);
}
// Increment the frame count
this.set_frame();