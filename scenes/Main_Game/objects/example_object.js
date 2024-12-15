// Class to represent an example object that can move on the canvas
class Example_Object {
    // Constructor initializes object properties like size, position, speed, and color
    constructor() {
        // Define the object's width and height
        this.size = {
            w: 70,  // width
            h: 70   // height
        }

        // Set the object's velocity
        this.velocity = {
            x: 0, // horizontal velocity
            y: 0 // vertical velocity
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

    // Method to handle controls and update velocity based on keyboard input
    set_velocity() {
        // Reset velocity to 0 by default
        this.velocity.x = 0;
        this.velocity.y = 0;
    
        // Move vertically
        if (keyboard.isDown('w')) {
            this.velocity.y = -this.speed * FrameRate.deltaTime;  // Move up
        } else if (keyboard.isDown('s')) {
            this.velocity.y = this.speed * FrameRate.deltaTime;   // Move down
        }
    
        // Move horizontally
        if (keyboard.isDown('d')) {
            this.velocity.x = this.speed * FrameRate.deltaTime;   // Move right
        } else if (keyboard.isDown('a')) {
            this.velocity.x = -this.speed * FrameRate.deltaTime;  // Move left
        }
    }    

    // Move method moves the object by it's current velocity
    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    // Update method to control the object's behavior on each frame
    update() {
        this.set_velocity();  // Call set_velocity to update velocity based on input
        this.move();  // Call move to update this object's position    
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
