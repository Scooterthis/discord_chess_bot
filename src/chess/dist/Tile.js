"use strict";
exports.__esModule = true;
var Tile = (function () {
    function Tile(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = Math.floor(x);
        this.y = Math.floor(y);
    }
    Tile.fromTile = function (tile) {
        return new this(tile.x, tile.y);
    };
    Tile.prototype.equals = function (tile) {
        return this.x == tile.x && this.y == tile.y;
    };
    return Tile;
}());
exports.Tile = Tile;
//# sourceMappingURL=Tile.js.map