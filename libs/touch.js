const touch = (() => {
    // Private variables to store canvas boundaries and scaling factor
    let canvasBound = { left: 0, top: 0 };
    const scaleFactor = 1; // Modify if scaling is needed
  
    // Publicly exposed state
    const state = {
      x: 0,        // X-coordinate of the touch relative to the canvas
      y: 0,        // Y-coordinate of the touch relative to the canvas
      active: false // Whether a touch is currently active
    };
  
    // Private method to update touch position based on the event's touches[0]
    function setPosition(e) {
      if (e.touches.length > 0) {
        const touchPoint = e.touches[0];
        state.x = (touchPoint.clientX - canvasBound.left) * scaleFactor;
        state.y = (touchPoint.clientY - canvasBound.top) * scaleFactor;
      }
    }
  
    // Private method to update canvas boundaries on window resize
    function updateCanvasBounds() {
      const canvas = document.querySelector("canvas");
      const rect = canvas.getBoundingClientRect();
      canvasBound.left = rect.left;
      canvasBound.top = rect.top;
    }
  
    // Private method to initialize the library
    function init() {
      // Update touch position on touch move
      document.addEventListener("touchmove", (e) => {
        setPosition(e);
        e.preventDefault(); // Prevent default touch scrolling behavior
      });
  
      // Track touch start
      document.addEventListener("touchstart", (e) => {
        state.active = true;
        setPosition(e); // Set the initial touch position
        e.preventDefault(); // Prevent default touch behavior
      });
  
      // Track touch end
      document.addEventListener("touchend", (e) => {
        state.active = false;
        e.preventDefault(); // Prevent default touch behavior
      });
  
      // Update canvas boundaries on window resize
      window.addEventListener("resize", updateCanvasBounds);
  
      // Initial canvas boundary setup
      updateCanvasBounds();
    }
  
    // Automatically initialize the library
    init();
  
    // Public API
    return state;
  })();
  