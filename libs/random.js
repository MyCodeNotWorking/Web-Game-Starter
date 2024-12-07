const Random = (() => {
    var int = function(min, max) {
        return Math.floor(Math.random() * (max - min +  1)) + min;
    }
    var float = function(min, max) {
        return Math.random() * (max - min) + min;
    }
    var bool = function() {
        return Math.random() >= 0.5;
    }

    return { int, float, bool }
})();
