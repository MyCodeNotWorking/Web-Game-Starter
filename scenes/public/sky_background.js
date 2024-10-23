export default function() {
    // Create a linear gradient from top (y=0) to bottom (y=canvas.height)
    const gradient = c.createLinearGradient(0, 0, 0, canvas.height);

    // Add color stops for the gradient
    gradient.addColorStop(0, 'skyblue');  // Top color (sky blue)
    gradient.addColorStop(1, 'white');    // Bottom color (white)

    // Fill the canvas with the gradient
    c.fillStyle = gradient;
    c.fillRect(0, 0, canvas.width, canvas.height);
}