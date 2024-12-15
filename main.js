// Import the starting scene from the specified path
import scene_name from "./scenes/Title_Screen/Title_Screen.js";

// Set the starting scene for the game
export var start_scene = scene_name;

// Resize UI-Elements container to match the canvas dimensions
var ui_elements_container = document.getElementById("ui-elements-container");

function resize() {
    // Dynamically set the width and height of the UI container to match the canvas
    ui_elements_container.style.width = canvas.getBoundingClientRect().width + 'px';
    ui_elements_container.style.height = canvas.getBoundingClientRect().height + 'px';
}
resize();

// Adjust UI container size on window resize
window.addEventListener('resize', () => {
    resize();
});

// Main game engine class
class Main {
    constructor() {
        // Initialize the current scene to the starting scene
        this.scene = start_scene;

        // Define the camera object with position, rotation, and zoom properties
        this.camera = {
            position: {
                x: 0, // X position of the camera
                y: 0  // Y position of the camera
            },
            rotation: 0, // Camera rotation (in radians)
            zoom: 1      // Zoom level (1 = 100% zoom)
        };

        this.run = true;            // Game running state
        this.game_speed = 1.0;      // Game speed modifier
        this.debug_speed = 60.0;    // Update frequency for debugging info

        // Debugging elements in the UI
        this.debug = {
            game_speed: document.getElementById("game-speed"),
            frame_counter: document.getElementById("frame-counter"),
            delta_time: document.getElementById("delta-time"),
            mouse: document.getElementById("mouse"),
            touch: document.getElementById("touch"),
            fps: document.getElementById("fps")
        };
    }

    // Start camera transformation: Save the current canvas state
    start_camera() {
        c.save();
    }

    // Set up camera transformations: translation, rotation, and scaling
    set_camera() {
        // Translate to the center of the canvas for rotation and scaling
        c.translate(canvas.width / 2, canvas.height / 2);

        // Apply camera rotation
        c.rotate(this.camera.rotation);

        // Apply camera zoom
        c.scale(this.camera.zoom, this.camera.zoom);

        // Translate back to the top-left corner for positioning
        c.translate(-canvas.width / 2, -canvas.height / 2);

        // Apply camera position translation
        c.translate(-this.camera.position.x, -this.camera.position.y);
    }

    // End camera transformation: Restore the previous canvas state
    end_camera() {
        c.restore();
    }

    // Clear the entire canvas, preparing it for the next frame
    clear_canvas() {
        c.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Recursively call a specified method on an object and its children
    call_method_on_object_and_children(method, object) {
        // Check if the object has the specified method as a function
        if (typeof object[method] === 'function') {
            object[method](); // Call the method on the current object
        }

        // If the object has child objects, call the method on them too
        if (Array.isArray(object.objects)) {
            object.objects.forEach(childObject => {
                this.call_method_on_object_and_children(method, childObject);
            });
        }
    }

    // Update the debug UI elements based on the current game state
    update_debugging() {
        // Update debugging info at a specified interval
        if (FrameRate.frameCount % this.debug_speed === 0) {
            this.debug.game_speed.innerHTML = `<strong>game-speed:</strong> ${this.game_speed}`;
            this.debug.frame_counter.innerHTML = `<strong>frame-counter:</strong> ${FrameRate.frameCount}`;
            this.debug.delta_time.innerHTML = `<strong>delta-time:</strong> ${FrameRate.deltaTime}ms`;
            this.debug.mouse.innerHTML = `<strong>mouse:</strong> x: ${mouse.x.toFixed(3)} y: ${mouse.y.toFixed(3)} down: ${mouse.down}`;
            this.debug.touch.innerHTML = `<strong>touch:</strong> x: ${touch.x.toFixed(3)} y: ${touch.y.toFixed(3)} active: ${touch.active}`;
            this.debug.fps.innerHTML = `<strong>fps:</strong> ${FrameRate.FPS.toFixed(3)}`;
        }
    }

    // Main update method: Called once per frame to advance the game state
    update() {
        // Clear the canvas for the next frame
        this.clear_canvas();

        // Start the camera transformation
        this.start_camera();

        // Update and draw objects in the scene
        this.call_method_on_object_and_children('update', this.scene);    // Update object states (e.g., physics)
        this.call_method_on_object_and_children('update_hitbox', this.scene); // Update collision hitboxes
        this.call_method_on_object_and_children('physics', this.scene);      // Process physics calculations
        this.call_method_on_object_and_children('controls', this.scene);     // Process user input
        this.call_method_on_object_and_children('background', this.scene);   // Render background elements

        // Apply camera transformations for the foreground objects
        this.set_camera();

        // Draw objects in the scene
        this.call_method_on_object_and_children('draw', this.scene);

        // End the camera transformation
        this.end_camera();

        // Update debugging information
        this.update_debugging();
    }

    // Switch the current scene to a new one
    set_Scene(old_scene_id, new_scene_id, new_scene_name) {
        // Hide UI elements associated with the old scene
        document.getElementById(old_scene_id).classList.add('hidden');

        // Show UI elements for the new scene
        document.getElementById(new_scene_id).classList.remove('hidden');

        // Set the new scene as the current scene
        this.scene = new_scene_name;
    }

    // Default background for an object
    default_background() {
        // Set background color to grey
        c.fillStyle = '#808080';  // Grey color
        c.fillRect(0, 0, canvas.width, canvas.height);

        // Set grid color to a darker grey
        c.strokeStyle = '#666666';  // Darker grey for grid
        c.lineWidth = 0.5;

        // Draw grid
        const gridSize = 50;  // Size of grid squares
        for (let x = 0; x < canvas.width; x += gridSize) {
            for (let y = 0; y < canvas.height; y += gridSize) {
                c.strokeRect(x, y, gridSize, gridSize);
            }
        }
    }
}

// Instantiate the main game engine
export var main = new Main();

// Start the game loop once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Remove the loading screen once assets are loaded
    document.getElementById("loading").style.display = "none";

    // Main game loop
    function main_loop() {
        if (FrameRate.frameCount % main.game_speed === 0 && main.run) main.update(); // Run the game update logic
        window.requestAnimationFrame(main_loop); // Request the next frame
    }

    // Start the main loop
    main_loop();
});
