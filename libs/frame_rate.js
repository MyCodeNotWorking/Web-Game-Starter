const FrameRate = (() => {
    let delta_time = 1000 / 60; // Initial estimate for delta time
    let fps = 60;              // Initial estimate for frames per second
    let game_frame = 0;        // Initial frame count

    const calculate_dt = () => {
        let dt_old = performance.now();

        const update = () => {
            const now = performance.now();
            delta_time = now - dt_old;
            fps = 1000 / delta_time;
            dt_old = now;
            game_frame++; // Increment the frame count
            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    };

    calculate_dt();

    return {
        get deltaTime() {
            return delta_time;
        },
        get FPS() {
            return fps;
        },
        get frameCount() {
            return game_frame;
        }
    };
})();
