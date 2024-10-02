import { c, canvas } from "../../canvas_setup.js";
import test_object from "../public/example_object.js";
import { main as m } from "../../main.js";
import sky_background from "../public/sky_background.js";
import Main_Game from "../Main_Game/Main_Game.js";

// Class to represent the title screen of the game
class Title_Screen {
    // Constructor initializes title screen setup and button event listeners
    constructor() {
        // Initialize an array to store any objects that might be used on the title screen
        this.objects = [];

        // Set an event listener for the "start" button (click event)
        document.getElementById("start-button").onclick = () => {
            // Transition to the "main-game" scene when the button is clicked
            m.set_Scene("title-screen", "main-game", Main_Game);
            console.log(m.scene);  // Log the current scene for debugging purposes
        };

        // Set a touch event listener for mobile users on the "start" button
        document.getElementById("start-button").ontouchstart = () => {
            // Trigger the scene change on touch as well
            m.set_Scene("title-screen", "main-game", Main_Game);
            console.log(m.scene);  // Log the current scene for debugging purposes
        };
    }

    // Method to render the background for the title screen
    background() {
        sky_background();  // Call the function to draw the sky background
    }
}

// Export a new instance of the Title_Screen class as the default export
export default new Title_Screen();
