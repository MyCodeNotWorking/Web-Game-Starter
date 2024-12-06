const keyboard = (() => {
  // Private variables and methods
  const keys = [];
  const on = {
    down_keys: [],
    up_keys: []
  };

  // Private method to add a key to an array
  function addKey(key, array) {
    if (!array.includes(key)) {
      array.push(key);
    }
  }

  // Private method to remove a key from an array
  function removeKey(key, array) {
    const index = array.indexOf(key);
    if (index !== -1) {
      array.splice(index, 1);
    } else {
      console.warn(`Key "${key}" not found in the array`);
    }
  }

  // Set up event listeners
  function init() {
    document.addEventListener("keydown", (e) => {
      addKey(e.key, keys); // Add the pressed key to the keys array

      if (!e.repeat) {
        addKey(e.key, on.down_keys); // Add the key to down_keys if not repeated
        requestAnimationFrame(() => removeKey(e.key, on.down_keys)); // Remove key after next repaint
      }
    });

    document.addEventListener("keyup", (e) => {
      removeKey(e.key, keys); // Remove the released key from the keys array

      addKey(e.key, on.up_keys); // Add the key to up_keys
      requestAnimationFrame(() => removeKey(e.key, on.up_keys)); // Remove key after next repaint
    });
  }

  // Public API
  return {
    init, // Publicly expose the init method

    // Check if a specific key is currently pressed
    isDown(key) {
      return keys.includes(key);
    },

    // Check if a specific key was pressed down in the current frame
    onDown(key) {
      return on.down_keys.includes(key);
    },

    // Check if a specific key was released up in the current frame
    onUp(key) {
      return on.up_keys.includes(key);
    }
  };
})();

// Initialize the keyboard object to start listening to key events
keyboard.init();
