import test_object from "./example_object.js";
import { main as m } from "../../main.js";
import sky_background from "../public/sky_background.js";
import Title_Screen from "../Title_Screen/Title_Screen.js";

// Class to represent the main game scene
class Main_Game {
    // Constructor sets up the objects and handles any necessary event listeners for UI elements
    constructor() {
        // Array of game objects, initialized with the test_object
        this.objects = [test_object];

        // Fetching all elements with the class "home" (e.g., a home button in the UI)
        const elements = document.getElementsByClassName("home");
        for (let i = 0; i < elements.length; i++) {
            // Attach a click event listener to each "home" element
            elements[i].onclick = () => {
                // When clicked, transition from "main-game" to "title-screen"
                m.set_Scene("main-game", "title-screen", Title_Screen);  // Scene change logic
            };

            // Attach a touch event listener for touch devices on each "home" element
            elements[i].ontouchstart = () => {
                // When touched, transition from "main-game" to "title-screen"
                m.set_Scene("main-game", "title-screen", Title_Screen);  // Scene change logic
            };
        }
    }

    // Method to render the background for the main game
    background() {
        sky_background();  // Call the function to draw the sky background
    }
}

// Export a new instance of the Main_Game class as the default export
export default new Main_Game();
