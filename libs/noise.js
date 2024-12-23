const Noise = (function () {
    function Noise(seed = Math.random()) {
        this.seed = seed;
        this.gradients = {};
        this.permutation = this._generatePermutationTable();
    }

    Noise.prototype._generatePermutationTable = function () {
        const perm = Array.from({ length: 256 }, (_, i) => i);
        for (let i = perm.length - 1; i > 0; i--) {
            const j = Math.floor(this.seed * (i + 1));
            [perm[i], perm[j]] = [perm[j], perm[i]];
        }
        return perm.concat(perm);
    };

    Noise.prototype._gradient = function (hash, x, y) {
        const h = hash & 7;
        const u = h < 4 ? x : y;
        const v = h < 4 ? y : x;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    };

    Noise.prototype._fade = function (t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    };

    Noise.prototype._lerp = function (a, b, t) {
        return a + t * (b - a);
    };

    Noise.prototype.perlin = function (x, y) {
        const xi = Math.floor(x) & 255;
        const yi = Math.floor(y) & 255;
        const xf = x - Math.floor(x);
        const yf = y - Math.floor(y);

        const u = this._fade(xf);
        const v = this._fade(yf);

        const aa = this.permutation[this.permutation[xi] + yi];
        const ab = this.permutation[this.permutation[xi] + yi + 1];
        const ba = this.permutation[this.permutation[xi + 1] + yi];
        const bb = this.permutation[this.permutation[xi + 1] + yi + 1];

        const x1 = this._lerp(
            this._gradient(aa, xf, yf),
            this._gradient(ba, xf - 1, yf),
            u
        );
        const x2 = this._lerp(
            this._gradient(ab, xf, yf - 1),
            this._gradient(bb, xf - 1, yf - 1),
            u
        );

        return (this._lerp(x1, x2, v) + 1) / 2; // Normalized to 0-1
    };

    Noise.prototype.random = function () {
        return Math.random();
    };

    return Noise;
})();

// Example usage
//const noise = new Noise(0.42); // Seeded noise
//console.log(noise.perlin(1.1, 2.3)); // Perlin noise value
//console.log(noise.random());         // Simple random noise
