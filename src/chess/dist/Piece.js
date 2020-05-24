"use strict";
exports.__esModule = true;
var Tile_1 = require("./Tile");
var DirectionAngle_1 = require("./DirectionAngle");
var Direction_1 = require("./Direction");
var Piece = (function () {
    function Piece(tile, captured, isWhite, hasMoved) {
        if (captured === void 0) { captured = false; }
        if (isWhite === void 0) { isWhite = false; }
        if (hasMoved === void 0) { hasMoved = false; }
        this.tile = tile;
        this.captured = captured;
        this.isWhite = isWhite;
        this.hasMoved = hasMoved;
    }
    Piece.fromPiece = function (piece) {
        return new this(Tile_1.Tile.fromTile(piece.tile), piece.captured, piece.isWhite, piece.hasMoved);
    };
    Piece.prototype.inBoard = function (board) {
        return !(this.tile.x > board.getSize() || this.tile.y > board.getSize() || this.tile.x < 1 || this.tile.y < 1);
    };
    Piece.prototype.genMovesLin = function (dir, currentPlayer, enemyPlayer, board) {
        var moves = new Array();
        var limit;
        var yMultiplier;
        var xMultiplier;
        switch (dir) {
            case Direction_1.Direction.Down:
                limit = board.getSize() - this.tile.y;
                xMultiplier = 0;
                yMultiplier = 1;
                break;
            case Direction_1.Direction.Up:
                limit = this.tile.y - 1;
                xMultiplier = 0;
                yMultiplier = -1;
                break;
            case Direction_1.Direction.Right:
                limit = board.getSize() - this.tile.x;
                xMultiplier = 1;
                yMultiplier = 0;
                break;
            default:
                limit = this.tile.x - 1;
                xMultiplier = -1;
                yMultiplier = 0;
        }
        for (var i = 1; i <= limit; i++) {
            var tempTile = new Tile_1.Tile(this.tile.x + (i * xMultiplier), this.tile.y + (i * yMultiplier));
            if (enemyPlayer.piecePresent(tempTile)) {
                moves.push(tempTile);
                break;
            }
            else if (currentPlayer.piecePresent(tempTile)) {
                break;
            }
            else {
                moves.push(tempTile);
            }
        }
        return moves;
    };
    Piece.prototype.genMovesAng = function (dir, currentPlayer, enemyPlayer, board) {
        var moves = new Array();
        var limit = board.getSize();
        var yMultiplier;
        var xMultiplier;
        switch (dir) {
            case DirectionAngle_1.DirectionAngle.UpRight:
                xMultiplier = 1;
                yMultiplier = 1;
                break;
            case DirectionAngle_1.DirectionAngle.UpLeft:
                xMultiplier = -1;
                yMultiplier = 1;
                break;
            case DirectionAngle_1.DirectionAngle.DownRight:
                xMultiplier = 1;
                yMultiplier = -1;
                break;
            default:
                xMultiplier = -1;
                yMultiplier = -1;
        }
        for (var i = 1; i <= limit; i++) {
            var tempTile = new Tile_1.Tile(this.tile.x + (i * xMultiplier), this.tile.y + (i * yMultiplier));
            if (board.inBoard(tempTile)) {
                if (enemyPlayer.piecePresent(tempTile)) {
                    moves.push(tempTile);
                    break;
                }
                else if (currentPlayer.piecePresent(tempTile)) {
                    break;
                }
                else {
                    moves.push(tempTile);
                }
            }
        }
        return moves;
    };
    Piece.prototype.isLegalMove = function (oldtile, tile, currentPlayer, enemyPlayer, board) {
        if (board.inBoard(tile)) {
            var currPiece = currentPlayer.getPieceByTile(oldtile);
            var moves = new Array();
            if (currPiece != null) {
                moves = currPiece.generateMoves(currentPlayer, enemyPlayer, board);
                if (moves.length > 0) {
                    for (var i = 0; i < moves.length; i++) {
                        if (moves[i].equals(tile) && !currentPlayer.piecePresent(tile)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    return Piece;
}());
exports.Piece = Piece;
//# sourceMappingURL=Piece.js.map