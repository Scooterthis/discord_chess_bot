"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Tile_1 = require("./Tile");
var Piece_1 = require("./Piece");
var Direction_1 = require("./Direction");
var Rook = (function (_super) {
    __extends(Rook, _super);
    function Rook(tile, captured, isWhite, hasMoved) {
        if (captured === void 0) { captured = false; }
        if (isWhite === void 0) { isWhite = false; }
        if (hasMoved === void 0) { hasMoved = false; }
        return _super.call(this, tile, captured, isWhite, hasMoved) || this;
    }
    Rook.prototype.generateMoves = function (currentPlayer, enemyPlayer, board) {
        var right = this.genMovesLin(Direction_1.Direction.Right, currentPlayer, enemyPlayer, board);
        var left = this.genMovesLin(Direction_1.Direction.Left, currentPlayer, enemyPlayer, board);
        var up = this.genMovesLin(Direction_1.Direction.Up, currentPlayer, enemyPlayer, board);
        var down = this.genMovesLin(Direction_1.Direction.Down, currentPlayer, enemyPlayer, board);
        return right.concat(left, up, down);
    };
    Rook.fromRook = function (rook) {
        return new this(Tile_1.Tile.fromTile(rook.tile), rook.captured, rook.isWhite, rook.hasMoved);
    };
    return Rook;
}(Piece_1.Piece));
exports.Rook = Rook;
//# sourceMappingURL=Rook.js.map