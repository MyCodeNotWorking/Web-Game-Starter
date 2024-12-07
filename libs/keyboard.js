const keyboard = (() => {
  // Private variables and methods
  const keys = [];
  const on = {
    down_keys: [],
    up_keys: []
  };

  function addKey(key, array) {
    if (!array.includes(key)) {
      array.push(key);
    }
  }

  function removeKey(key, array) {
    const index = array.indexOf(key);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  function init() {
    document.addEventListener("keydown", (e) => {
      addKey(e.key, keys);

      if (!e.repeat) {
        addKey(e.key, on.down_keys);
        requestAnimationFrame(() => removeKey(e.key, on.down_keys));
      }
    });

    document.addEventListener("keyup", (e) => {
      removeKey(e.key, keys);

      addKey(e.key, on.up_keys);
      requestAnimationFrame(() => removeKey(e.key, on.up_keys));
    });
  }

  // Automatically initialize the library
  init();

  // Public API
  return {
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
