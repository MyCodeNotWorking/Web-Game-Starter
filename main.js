// Import the starting scene from a specified path
import scene_name from "./scenes/Title_Screen/Title_Screen.js"

// Set the starting scene to the imported scene
export var start_scene = scene_name;

// Import canvas
import { c, canvas } from "./canvas_setup.js"

// Resize UI-Elements container
var ui_elements_container = document.getElementById("ui-elements-container");
function resize() {
    ui_elements_container.style.left = window.innerWidth / 2 + 'px';
    ui_elements_container.style.top = window.innerHeight / 2 + 'px';
    ui_elements_container.style.width = canvas.getBoundingClientRect().width + 'px';    // Set the UI-Elements container width to the canvas width
    ui_elements_container.style.height = canvas.getBoundingClientRect().height + 'px';  // Set the UI-Elements container height to the canvas height
}
resize();

// Resize the container dynamicly 
window.addEventListener('resize', ()=> {
    resize();
});

// Main game engine class
class Main {
    constructor() {
        // Initialize the current frame count
        this.frame = 0;

        // Define a good delta time (frame duration) for 60 FPS
        this.delta_time = 1000 / 60; 

        // Set a maximum delta time to avoid very large jumps in case of lag
        // Here, 30 FPS is the maximum allowed slowdown
        this.max_delta = 1000 / 30;

        // Set the current scene to the starting scene
        this.scene = start_scene;

        // Initialize the camera object
        this.camera = {
            position: {
                x: 0, // X position of the camera
                y: 0 // Y position of the camera
            },
            rotation: 0, // Rotation of the camera
            zoom: 1 // Zoom, 1 = 100%;
        };
    }

    // Method that starts the camera transform
    start_camera() {
        // Save the canvas
        c.save();
    }

    // Method that transform the camera
    set_camera() {
        // Translate to the center of the canvas first (for proper rotation/zoom)
        c.translate(canvas.width / 2, canvas.height / 2);

        // Apply rotation
        c.rotate(this.camera.rotation);

        // Apply zoom
        c.scale(this.camera.zoom, this.camera.zoom);

        // Translate back to the top-left corner and apply camera position
        c.translate(-canvas.width / 2, -canvas.height / 2);

        // Apply camera translation (after rotation and zoom)
        c.translate(-this.camera.position.x, -this.camera.position.y);
    }

    // Method that ends the camera transform
    end_camera() {
        // Restore the canvas
        c.restore(); 
    }

    // Calculate the time difference (delta time) between frames
    calculate_dt() {
        var dt_old = performance.now();

        // Use requestAnimationFrame to measure the time between frames
        window.requestAnimationFrame(() => {
            // Update delta_time, limiting it to max_delta to prevent big jumps
            this.delta_time = Math.min(performance.now() - dt_old, this.max_delta);
        });
    }

    // Increment the frame counter
    set_frame() {
        this.frame += 1;
    }

    // Clear the entire canvas to prepare for the next frame
    clear_canvas() {
        c.clearRect(0, 0, canvas.width, canvas.height);
    }

    // This function calls a specified method on an object and its child objects (if any)
    call_method_on_object_and_children(method, object) {
        // Check if the object has the method as a function
        if (typeof object[method] === 'function') {
            // If the method exists, call it on the current object
            object[method]();
        }

        // Check if the object has a 'objects' property that is an array (for child objects)
        if (Array.isArray(object.objects)) {
            // Loop through each child object in the 'objects' array
            object.objects.forEach(childObject => {
                // Recursively call the same method on the child objects
                this.call_method_on_object_and_children(method, childObject);
            });
        }
    }

    // Main update method, called once per frame
    update() {
        // Clear the canvas for the next frame
        this.clear_canvas();

        // Calculate the time difference (delta time) between frames
        this.calculate_dt();

        // Increment the frame count
        this.set_frame();

        // Start the camera
        this.start_camera();

        // Call the 'update', 'background', and 'draw' methods on all objects in the scene
        this.call_method_on_object_and_children('update', this.scene);    // Update object states (e.g., physics)
        this.call_method_on_object_and_children('background', this.scene); // Draw the background layer (if any)

        // Call the camera set method. This method has to be placed after the loop on background, so that it's not affected by the camera
        this.set_camera();

        this.call_method_on_object_and_children('draw', this.scene);       // Draw the objects onto the canvas

        // End the camera after using it on objects
        this.end_camera();
    }

    // A method to switch the scene to a specific scene
    set_Scene(old_scene_id, new_scene_id, new_scene_name) {
        // Hide ui-objects of the old scene
        document.getElementById(old_scene_id).classList.add('hidden');
        document.getElementById(new_scene_id).classList.remove('hidden');
        this.scene = new_scene_name // Set the new scene for the scene property of the main object
    }
}

// Instantiate the main game engine
export var main = new Main();

// When the DOM is fully loaded, start the game loop
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading-screen
    document.getElementById("loading").style.display = "none"

    function main_loop() {
        // Run the game's update method on each frame
        main.update();

        // Request the next frame
        window.requestAnimationFrame(main_loop);
    }

    // Start the game loop
    main_loop();
});