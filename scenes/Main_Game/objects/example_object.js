// Importing necessary variables and functions from external modules
import { c, canvas } from "../../../canvas_setup.js"  // c: context of the canvas, canvas: canvas element
import dt from "../../../delta_time.js"  // dt: delta time of the game

// Class to represent an example object that can move on the canvas
class Example_Object {
    // Constructor initializes object properties like size, position, speed, and color
    constructor() {
        // Define the object's width and height
        this.size = {
            w: 70,  // width
            h: 70   // height
        }

        // Set the object's initial position to the center of the canvas
        this.position = {
            x: canvas.width / 2 - this.size.w / 2,  // horizontal position
            y: canvas.height / 2 - this.size.h / 2  // vertical position
        }
        
        // Define the object's speed
        this.speed = 1.5;  // Speed for movement

        // Define the object's color
        this.color = 'red';  // Color of the object
    }

    // Method to handle controls and update position based on keyboard input
    controls() {
        // Move up if the 'w' key is pressed
        if (keyboard.isDown('w')) {
            this.position.y -= this.speed * dt;  // Move up
        }
        // Move down if the 's' key is pressed
        if (keyboard.isDown('s')) {
            this.position.y += this.speed * dt;  // Move down
        }
        // Move right if the 'd' key is pressed
        if (keyboard.isDown('d')) {
            this.position.x += this.speed * dt;  // Move right
        }
        // Move left if the 'a' key is pressed
        if (keyboard.isDown('a')) {
            this.position.x -= this.speed * dt;  // Move left
        }
    }

    // Update method to control the object's behavior on each frame
    update() {
        this.controls();  // Call controls to update position based on input
    }

    // Method to draw the object on the canvas
    draw() {
        // Set the fill color for the object
        c.fillStyle = this.color;

        // Draw the object as a rectangle on the canvas at the current position
        c.fillRect(
            this.position.x,  // x position (centered)
            this.position.y,  // y position (centered)
            this.size.w,  // width
            this.size.h   // height
        );
    }
}

// Export a new instance of Example_Object as the default export
export default new Example_Object;
