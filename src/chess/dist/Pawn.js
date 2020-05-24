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
var Pawn = (function (_super) {
    __extends(Pawn, _super);
    function Pawn(tile, captured, isWhite, hasMoved, enPassant) {
        if (captured === void 0) { captured = false; }
        if (isWhite === void 0) { isWhite = false; }
        if (hasMoved === void 0) { hasMoved = false; }
        if (enPassant === void 0) { enPassant = false; }
        var _this = _super.call(this, tile, captured, isWhite, hasMoved) || this;
        _this.enPassantEligable = enPassant;
        return _this;
    }
    Pawn.fromPawn = function (pawn) {
        return new this(Tile_1.Tile.fromTile(pawn.tile), pawn.captured, pawn.isWhite, pawn.hasMoved, pawn.enPassantEligable);
    };
    Pawn.prototype.generateMoves = function (currentPlayer, enemyPlayer, board) {
        var position = this.tile;
        var moves = new Array();
        if (currentPlayer.isWhite) {
            if (!this.hasMoved && !enemyPlayer.piecePresent(new Tile_1.Tile(position.x, position.y + 2))) {
                moves.push(new Tile_1.Tile(position.x, position.y + 2));
            }
            ;
            if (!enemyPlayer.piecePresent(new Tile_1.Tile(position.x, position.y + 1))) {
                moves.push(new Tile_1.Tile(position.x, position.y + 1));
            }
            if (enemyPlayer.piecePresent(new Tile_1.Tile(position.x - 1, position.y + 1))) {
                moves.push(new Tile_1.Tile(position.x - 1, position.y + 1));
            }
            if (enemyPlayer.piecePresent(new Tile_1.Tile(position.x - 1, position.y))) {
                var ePiece = enemyPlayer.getPieceByTile(new Tile_1.Tile(position.x - 1, position.y));
                if (ePiece instanceof Pawn && ePiece.enPassantEligable) {
                    moves.push(new Tile_1.Tile(position.x - 1, position.y + 1));
                }
            }
            if (enemyPlayer.piecePresent(new Tile_1.Tile(position.x + 1, position.y + 1))) {
                moves.push(new Tile_1.Tile(position.x + 1, position.y + 1));
            }
            if (enemyPlayer.piecePresent(new Tile_1.Tile(position.x + 1, position.y))) {
                var ePiece = enemyPlayer.getPieceByTile(new Tile_1.Tile(position.x + 1, position.y));
                if (ePiece instanceof Pawn && ePiece.enPassantEligable) {
                    moves.push(new Tile_1.Tile(position.x + 1, position.y + 1));
                }
            }
        }
        else {
            if (!this.hasMoved && !enemyPlayer.piecePresent(new Tile_1.Tile(position.x, position.y - 2))) {
                moves.push(new Tile_1.Tile(position.x, position.y - 2));
            }
            if (!enemyPlayer.piecePresent(new Tile_1.Tile(position.x, position.y - 1))) {
                moves.push(new Tile_1.Tile(position.x, position.y - 1));
            }
            if (enemyPlayer.piecePresent(new Tile_1.Tile(position.x - 1, position.y - 1))) {
                moves.push(new Tile_1.Tile(position.x - 1, position.y - 1));
            }
            if (enemyPlayer.piecePresent(new Tile_1.Tile(position.x - 1, position.y))) {
                var ePiece = enemyPlayer.getPieceByTile(new Tile_1.Tile(position.x - 1, position.y));
                if (ePiece instanceof Pawn && ePiece.enPassantEligable) {
                    moves.push(new Tile_1.Tile(position.x - 1, position.y - 1));
                }
            }
            if (enemyPlayer.piecePresent(new Tile_1.Tile(position.x + 1, position.y - 1))) {
                moves.push(new Tile_1.Tile(position.x + 1, position.y - 1));
            }
            if (enemyPlayer.piecePresent(new Tile_1.Tile(position.x + 1, position.y))) {
                var ePiece = enemyPlayer.getPieceByTile(new Tile_1.Tile(position.x + 1, position.y));
                if (ePiece instanceof Pawn && ePiece.enPassantEligable) {
                    moves.push(new Tile_1.Tile(position.x + 1, position.y - 1));
                }
            }
        }
        for (var i = 0; i < moves.length; i++) {
            if (currentPlayer.piecePresent(moves[i]) || !board.inBoard(moves[i])) {
                moves.splice(i, 1);
                i--;
            }
        }
        return moves;
    };
    return Pawn;
}(Piece_1.Piece));
exports.Pawn = Pawn;
//# sourceMappingURL=Pawn.js.map