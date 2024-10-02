//keyboard.js
var keyboard = {
  init: function() {
    document.addEventListener("keydown", (e) => {
      this.addKey(e.key, this.keys)

      if(!e.repeat) {
        this.addKey(e.key, this.on.down_keys)
        requestAnimationFrame(() => {
          this.removeKey(e.key, this.on.down_keys)
        })
      }
    })
    document.addEventListener("keyup", (e) => {
      this.removeKey(e.key, this.keys)

      this.addKey(e.key, this.on.up_keys)
      requestAnimationFrame(() => {
          this.removeKey(e.key, this.on.up_keys)
      })
    })
  },
  keys: [],
  on: {
    down_keys: [],
    up_keys:[]
  },
  isDown: function(key) {
    for(var i = 0; i < this.keys.length; i ++) {
      if(this.keys[i] == key) {
        return true
      } else {
        return false
      }
    }
  },
  addKey(key, array) {
    for(var i = 0; i < array.length; i ++) {
      if(array[i] == key) {
        return
      }
    }
    array.push(key)
  },
  removeKey(key, array) {
    for(var i = 0; i < array.length; i ++) {
      if(array[i] == key) {
        array.splice(i, 1)
        return
      }
    }
    console.log("the requested key was not found in the array")
  },
  onDown(key) {
    for(var i = 0; i < this.on.down_keys.length; i ++) {
      if(this.on.down_keys[i] == key) {
        return true
      } else {
        return false
      }
    }
  },
  onUp(key) {
    for(var i = 0; i < this.on.up_keys.length; i ++) {
      if(this.on.up_keys[i] == key) {
        return true
      } else {
        return false
      }
    }
  },
  loop_keys(array) {
    //...
  }
}
keyboard.init()