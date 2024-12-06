const frameCounter = (() => {
    // Private variable to store the current frame count
    let game_frame = 0;
  
    // Private function to increment the frame counter
    function incrementFrame() {
        game_frame++; // Increment the frame count
        window.requestAnimationFrame(incrementFrame); // Schedule the next frame update
    }
  
    // Public API
    return {
        // Start the frame counter
        start() {
            incrementFrame(); // Begin the animation frame loop
        },
  
        // Get the current frame count
        getFrameCount() {
            return game_frame; // Return the private game_frame variable
        }
    };
})();

// Initialize the frameCounter object to start the frame-counter
frameCounter.start();

  