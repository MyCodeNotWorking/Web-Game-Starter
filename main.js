// Import the starting scene from the specified path
import scene_name from "./scenes/Title_Screen/Title_Screen.js";

// Set the starting scene for the game
export var start_scene = scene_name;

// Resize UI-Elements container to match the canvas dimensions
var ui_elements_container = document.getElementById("ui-elements-container");

// Function to make the canvas responsive
function responsive_canvas() {
    const aspectRatio = canvas.width / canvas.height; // Maintain the original aspect ratio
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    if (containerWidth / containerHeight < aspectRatio) {
        canvas.style.width = containerWidth + 'px';
        canvas.style.height = (containerWidth / aspectRatio) + 'px';
    } else {
        canvas.style.width = (containerHeight * aspectRatio) + 'px';
        canvas.style.height = containerHeight + 'px';
    }

    // Update UI container to match canvas size
    ui_elements_container.style.width = canvas.style.width;
    ui_elements_container.style.height = canvas.style.height;

    console.log("Canvas resized to:", canvas.style.width, canvas.style.height);
}

// Adjust UI container size on window resize
window.addEventListener('resize', responsive_canvas);

// Fixed timestep for physics updates
const FIXED_TIMESTEP = 1000 / 60; // 60 updates per second
let lastTime = performance.now();
let accumulator = 0;

// Main game engine class
class Main {
    constructor() {
        this.scene = start_scene;

        this.camera = {
            position: { x: 0, y: 0 },
            rotation: 0,
            zoom: 1,
        };

        this.run = true;
        this.game_speed = 1.0;

        this.debug_speed = 60.0;

        this.debug = {
            game_speed: document.getElementById("game-speed"),
            frame_counter: document.getElementById("frame-counter"),
            delta_time: document.getElementById("delta-time"),
            mouse: document.getElementById("mouse"),
            touch: document.getElementById("touch"),
            fps: document.getElementById("fps"),
        };
    }

    // Fixed physics update
    update_physics(deltaTime) {
        this.call_method_on_object_and_children('update', this.scene);
        this.call_method_on_object_and_children('update_hitbox', this.scene);
        this.call_method_on_object_and_children('physics', this.scene);
        this.call_method_on_object_and_children('controls', this.scene);
    }

    // Rendering
    render(alpha) {
        this.clear_canvas();
        this.start_camera();

        // Render interpolated frame
        this.call_method_on_object_and_children('background', this.scene);
        this.set_camera();
        this.call_method_on_object_and_children('draw', this.scene);

        this.end_camera();

        // Debugging updates
        this.update_debugging();
    }

    // Start camera transformation
    start_camera() {
        c.save();
    }

    // Set up camera transformations
    set_camera() {
        c.translate(canvas.width / 2, canvas.height / 2);
        c.rotate(this.camera.rotation);
        c.scale(this.camera.zoom, this.camera.zoom);
        c.translate(-canvas.width / 2, -canvas.height / 2);
        c.translate(-this.camera.position.x, -this.camera.position.y);
    }

    // End camera transformation
    end_camera() {
        c.restore();
    }

    // Clear the canvas
    clear_canvas() {
        c.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Recursively call a method on an object and its children
    call_method_on_object_and_children(method, object) {
        if (typeof object[method] === 'function') {
            object[method]();
        }
        if (Array.isArray(object.objects)) {
            object.objects.forEach(childObject => {
                this.call_method_on_object_and_children(method, childObject);
            });
        }
    }

    // Update debugging UI elements
    update_debugging() {
        if (FrameRate.frameCount % this.debug_speed === 0) {
            this.debug.game_speed.innerHTML = `<strong>game-speed:</strong> ${this.game_speed}`;
            this.debug.frame_counter.innerHTML = `<strong>frame-counter:</strong> ${FrameRate.frameCount}`;
            this.debug.delta_time.innerHTML = `<strong>delta-time:</strong> ${FrameRate.deltaTime}ms`;
            this.debug.mouse.innerHTML = `<strong>mouse:</strong> x: ${mouse.x.toFixed(3)} y: ${mouse.y.toFixed(3)} down: ${mouse.down}`;
            this.debug.touch.innerHTML = `<strong>touch:</strong> x: ${touch.x.toFixed(3)} y: ${touch.y.toFixed(3)} active: ${touch.active}`;
            this.debug.fps.innerHTML = `<strong>fps:</strong> ${FrameRate.FPS.toFixed(3)}`;
        }
    }

    // Switch the current scene to a new one
    set_Scene(old_scene_id, new_scene_id, new_scene_name) {
        document.getElementById(old_scene_id).classList.add('hidden');
        document.getElementById(new_scene_id).classList.remove('hidden');
        this.scene = new_scene_name;
    }

    // Default background for an object
    default_background() {
        c.fillStyle = '#808080';
        c.fillRect(0, 0, canvas.width, canvas.height);

        c.strokeStyle = '#666666';
        c.lineWidth = 0.5;

        const gridSize = 50;
        for (let x = 0; x < canvas.width; x += gridSize) {
            for (let y = 0; y < canvas.height; y += gridSize) {
                c.strokeRect(x, y, gridSize, gridSize);
            }
        }
    }
}

// Instantiate the main game engine
export var main = new Main();

// Main game loop
function main_loop(currentTime) {
    const elapsed = currentTime - lastTime;
    lastTime = currentTime;
    accumulator += elapsed;

    while (accumulator >= FIXED_TIMESTEP) {
        main.update_physics(FIXED_TIMESTEP);
        accumulator -= FIXED_TIMESTEP;
    }

    const alpha = accumulator / FIXED_TIMESTEP;
    main.render(alpha);

    window.requestAnimationFrame(main_loop);
}

// Start the game loop once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    responsive_canvas();
    document.getElementById("loading").style.display = "none";
    window.requestAnimationFrame(main_loop);
});
