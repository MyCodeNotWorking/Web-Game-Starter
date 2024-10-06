const Random = {
    int: function(min, max) {
        return Math.floor(Math.random() * (max - min +  1)) + min;
    },
    float: function(min, max) {
        return Math.random() * (max - min) + min;
    },
    bool: function() {
        return Math.random() >= 0.5;
    }
};
