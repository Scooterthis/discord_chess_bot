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
var King = (function (_super) {
    __extends(King, _super);
    function King(tile, captured, isWhite, hasMoved) {
        if (captured === void 0) { captured = false; }
        if (isWhite === void 0) { isWhite = false; }
        if (hasMoved === void 0) { hasMoved = false; }
        return _super.call(this, tile, captured, isWhite, hasMoved) || this;
    }
    King.prototype.generateMoves = function (currentPlayer, enemyPlayer, board) {
        var moves = new Array();
        var tempTile = new Tile_1.Tile(this.tile.x + 1, this.tile.y);
        if (!currentPlayer.piecePresent(tempTile) && board.inBoard(tempTile)) {
            moves.push(tempTile);
        }
        tempTile = new Tile_1.Tile(this.tile.x + 1, this.tile.y + 1);
        if (!currentPlayer.piecePresent(tempTile) && board.inBoard(tempTile)) {
            moves.push(tempTile);
        }
        tempTile = new Tile_1.Tile(this.tile.x + 1, this.tile.y - 1);
        if (!currentPlayer.piecePresent(tempTile) && board.inBoard(tempTile)) {
            moves.push(tempTile);
        }
        tempTile = new Tile_1.Tile(this.tile.x - 1, this.tile.y + 1);
        if (!currentPlayer.piecePresent(tempTile) && board.inBoard(tempTile)) {
            moves.push(tempTile);
        }
        tempTile = new Tile_1.Tile(this.tile.x - 1, this.tile.y - 1);
        if (!currentPlayer.piecePresent(tempTile) && board.inBoard(tempTile)) {
            moves.push(tempTile);
        }
        tempTile = new Tile_1.Tile(this.tile.x - 1, this.tile.y);
        if (!currentPlayer.piecePresent(tempTile) && board.inBoard(tempTile)) {
            moves.push(tempTile);
        }
        tempTile = new Tile_1.Tile(this.tile.x, this.tile.y + 1);
        if (!currentPlayer.piecePresent(tempTile) && board.inBoard(tempTile)) {
            moves.push(tempTile);
        }
        tempTile = new Tile_1.Tile(this.tile.x, this.tile.y - 1);
        if (!currentPlayer.piecePresent(tempTile) && board.inBoard(tempTile)) {
            moves.push(tempTile);
        }
        return moves;
    };
    King.fromKing = function (king) {
        return new this(Tile_1.Tile.fromTile(king.tile), king.captured, king.isWhite, king.hasMoved);
    };
    return King;
}(Piece_1.Piece));
exports.King = King;
//# sourceMappingURL=King.js.map