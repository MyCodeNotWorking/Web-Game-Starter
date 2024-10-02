import { scaleFactor, canvasBound } from "../canvas_setup.js"

var touch = {
    x: null,
    y: null,
    down: false,
    onDown: false,
    onUp: false,
    checkBox: function(posX, posY, width, height) {
        if(touch.x > posX && touch.x < posX + width &&
           touch.y > posY && touch.y < posY + height
          ) return true
    },
    checkCir: function(posX, posY, radius) {
        var dx = touch.x - posX;
        var dy = touch.y - posY;
        var distance = Math.sqrt(dx * dx + dy * dy);
        return distance <= radius;
    },
    hitbox: {
        rec: null, 
        cir: null
    }
}

document.addEventListener("touchstart", function(e) {
    touch.down = true

    touch.onDown = true
    requestAnimationFrame(function() {
        touch.onDown = false
    })

    set_touch_pos(e)
})
document.addEventListener("touchmove", function(e) {
    set_touch_pos(e)
})
document.addEventListener("touchend", function() {
    touch.down = false 

    touch.onUp = true
    requestAnimationFrame(function() {
        touch.onUp = false
    })
})

function set_touch_pos(e) {
    touch.x = (e.touches[0].clientX - canvasBound.left) * scaleFactor
    touch.y = (e.touches[0].clientY - canvasBound.top) * scaleFactor
}

touch.hitbox.rec = class HitboxRec {
    constructor(x, y, width, height) {
        this.pos = {
            x: x,
            y: y
        }
        this.width = width
        this.height = height

        this.down = false
        this.onDown = false
        this.onUp = false 

        this.active = true

        this.update()
    }
    DOWN() {
        if(touch.down && touch.checkBox(this.pos.x, this.pos.y, this.width, this.height)) {
            this.down = true
        } else {
            this.down = false
        }
    }
    ONDOWN() {
        if(touch.onDown && touch.checkBox(this.pos.x, this.pos.y, this.width, this.height)) {
            this.onDown = true
        } else {
            this.onDown = false
        }
    }
    ONUP() {
        if(touch.onUp && touch.checkBox(this.pos.x, this.pos.y, this.width, this.height)) {
            this.onUp = true
        } else {
            this.onUp = false
        }
    }
    update() {
        if(this.active) {
            this.DOWN()
            this.ONDOWN()
            this.ONUP()
        }
        requestAnimationFrame(()=>this.update())
    }
}

touch.hitbox.cir = class HitboxCir {
    constructor(x, y, radius) {
        this.pos = {
            x: x,
            y: y
        }
        this.radius = radius

        this.down = false
        this.onDown = false
        this.onUp = false 

        this.active = true

        this.update()
    }
    DOWN() {
        if(touch.down && touch.checkCir(this.pos.x, this.pos.y, this.radius)) {
            this.down = true
        } else {
            this.down = false
        }
    }
    ONDOWN() {
        if(touch.onDown && touch.checkCir(this.pos.x, this.pos.y, this.radius)) {
            this.onDown = true
        } else {
            this.onDown = false
        }
    }
    ONUP() {
        if(touch.onUp && touch.checkCir(this.pos.x, this.pos.y, this.radius)) {
            this.onUp = true
        } else {
            this.onUp = false
        }
    }
    update() {
        if(this.active) {
            this.DOWN()
            this.ONDOWN()
            this.ONUP()
        }
        requestAnimationFrame(()=>this.update())
    }
}

export default touch