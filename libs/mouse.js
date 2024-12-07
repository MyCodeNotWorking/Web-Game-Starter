const mouse = (() => {
    // Private variables to store canvas boundaries and scaling factor
    let canvasBound = { left: 0, top: 0 };
    const scaleFactor = 1; // Modify if scaling is needed
  
    // Publicly exposed state
    const state = {
      x: 0,       // X-coordinate of the mouse relative to the canvas
      y: 0,       // Y-coordinate of the mouse relative to the canvas
      down: false // Whether the mouse button is pressed
    };
  
    // Update mouse position based on event's clientX and clientY
    function setPosition(e) {
      state.x = (e.clientX - canvasBound.left) * scaleFactor;
      state.y = (e.clientY - canvasBound.top) * scaleFactor;
    }
  
    // Update canvas boundaries on window resize
    function updateCanvasBounds() {
      const canvas = document.querySelector("canvas");
      const rect = canvas.getBoundingClientRect();
      canvasBound.left = rect.left;
      canvasBound.top = rect.top;
    }
  
    // Initialize event listeners
    function init() {
      // Mouse move listener
      document.addEventListener("mousemove", (e) => setPosition(e));
  
      // Mouse button down listener
      document.addEventListener("mousedown", () => {
        state.down = true;
      });
  
      // Mouse button up listener
      document.addEventListener("mouseup", () => {
        state.down = false;
      });
  
      // Window resize listener to update canvas boundaries
      window.addEventListener("resize", updateCanvasBounds);
  
      // Initial canvas boundary setup
      updateCanvasBounds();
    }
  
    // Automatically initialize the library
    init();
  
    // Public API
    return state;
  })();
  