class Object {
    constructor() {
        this.hitbox = new SAT.Box(
            new SAT.Vector(0, 0), 
            150,                                       
            150                                   
        );
    }

    update_hitbox() {
        this.hitbox.pos.x = this.position.x;
        this.hitbox.pos.y = this.position.y;
    }

    draw() {
        c.fillStyle = "red";
        c.fillRect(this.hitbox.pos.x, this.hitbox.pos.y, this.hitbox.w, this.hitbox.h);
    }
}

export default new Object();