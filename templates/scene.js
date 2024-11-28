class Scene {
    constructor() {
        this.objets = [];
    }

    background() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.fillStyle = 'rgb(96, 96, 96)';
        c.fillRect(0, 0, canvas.width, canvas.height);
    }
}

export default new Scene();