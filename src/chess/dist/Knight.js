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
var Piece_1 = require("./Piece");
var Tile_1 = require("./Tile");
var Knight = (function (_super) {
    __extends(Knight, _super);
    function Knight(tile, captured, isWhite, hasMoved) {
        if (captured === void 0) { captured = false; }
        if (isWhite === void 0) { isWhite = false; }
        if (hasMoved === void 0) { hasMoved = false; }
        return _super.call(this, tile, captured, isWhite, hasMoved) || this;
    }
    Knight.prototype.generateMoves = function (currentPlayer, enemyPlayer, board) {
        var moves = new Array();
        var tempTile = new Tile_1.Tile(this.tile.x + 1, this.tile.y + 2);
        if ((enemyPlayer.piecePresent(tempTile) || !currentPlayer.piecePresent(tempTile)) && board.inBoard(tempTile)) {
            moves.push(tempTile);
        }
        tempTile = new Tile_1.Tile(this.tile.x + 2, this.tile.y + 1);
        if ((enemyPlayer.piecePresent(tempTile) || !currentPlayer.piecePresent(tempTile)) && board.inBoard(tempTile)) {
            moves.push(tempTile);
        }
        tempTile = new Tile_1.Tile(this.tile.x - 2, this.tile.y + 1);
        if ((enemyPlayer.piecePresent(tempTile) || !currentPlayer.piecePresent(tempTile)) && board.inBoard(tempTile)) {
            moves.push(tempTile);
        }
        tempTile = new Tile_1.Tile(this.tile.x - 1, this.tile.y + 2);
        if ((enemyPlayer.piecePresent(tempTile) || !currentPlayer.piecePresent(tempTile)) && board.inBoard(tempTile)) {
            moves.push(tempTile);
        }
        tempTile = new Tile_1.Tile(this.tile.x - 1, this.tile.y - 2);
        if ((enemyPlayer.piecePresent(tempTile) || !currentPlayer.piecePresent(tempTile)) && board.inBoard(tempTile)) {
            moves.push(tempTile);
        }
        tempTile = new Tile_1.Tile(this.tile.x - 2, this.tile.y - 1);
        if ((enemyPlayer.piecePresent(tempTile) || !currentPlayer.piecePresent(tempTile)) && board.inBoard(tempTile)) {
            moves.push(tempTile);
        }
        tempTile = new Tile_1.Tile(this.tile.x + 1, this.tile.y - 2);
        if ((enemyPlayer.piecePresent(tempTile) || !currentPlayer.piecePresent(tempTile)) && board.inBoard(tempTile)) {
            moves.push(tempTile);
        }
        tempTile = new Tile_1.Tile(this.tile.x + 2, this.tile.y - 1);
        if ((enemyPlayer.piecePresent(tempTile) || !currentPlayer.piecePresent(tempTile)) && board.inBoard(tempTile)) {
            moves.push(tempTile);
        }
        return moves;
    };
    Knight.fromKnight = function (knight) {
        return new this(Tile_1.Tile.fromTile(knight.tile), knight.captured, knight.isWhite, knight.hasMoved);
    };
    return Knight;
}(Piece_1.Piece));
exports.Knight = Knight;
//# sourceMappingURL=Knight.js.map