"use strict";
exports.__esModule = true;
var Tile_1 = require("./Tile");
var King_1 = require("./King");
var Queen_1 = require("./Queen");
var Rook_1 = require("./Rook");
var Bishop_1 = require("./Bishop");
var Knight_1 = require("./Knight");
var Pawn_1 = require("./Pawn");
var Player = (function () {
    function Player(isWhite, playerName) {
        if (isWhite === void 0) { isWhite = false; }
        if (playerName === void 0) { playerName = "no_name"; }
        this.ct = 0;
        this.playerName = playerName;
        this.rooks = new Array();
        this.pawns = new Array();
        this.knights = new Array();
        this.bishops = new Array();
        this.isWhite = isWhite;
        this.promotions = new Array();
        if (isWhite) {
            this.rooks.push(new Rook_1.Rook(new Tile_1.Tile(1, 1), false, true));
            this.rooks.push(new Rook_1.Rook(new Tile_1.Tile(8, 1), false, true));
            for (var i = 1; i <= 8; i++) {
                this.pawns.push(new Pawn_1.Pawn(new Tile_1.Tile(i, 2), false, true));
            }
            this.queen = new Queen_1.Queen(new Tile_1.Tile(4, 1), false, true);
            this.bishops.push(new Bishop_1.Bishop(new Tile_1.Tile(3, 1), false, true));
            this.bishops.push(new Bishop_1.Bishop(new Tile_1.Tile(6, 1), false, true));
            this.king = new King_1.King(new Tile_1.Tile(5, 1), false, true);
            this.knights.push(new Knight_1.Knight(new Tile_1.Tile(2, 1), false, true));
            this.knights.push(new Knight_1.Knight(new Tile_1.Tile(7, 1), false, true));
        }
        else {
            this.rooks.push(new Rook_1.Rook(new Tile_1.Tile(1, 8)));
            this.rooks.push(new Rook_1.Rook(new Tile_1.Tile(8, 8)));
            for (var i = 1; i <= 8; i++) {
                this.pawns.push(new Pawn_1.Pawn(new Tile_1.Tile(i, 7)));
            }
            this.queen = new Queen_1.Queen(new Tile_1.Tile(4, 8));
            this.bishops.push(new Bishop_1.Bishop(new Tile_1.Tile(3, 8)));
            this.bishops.push(new Bishop_1.Bishop(new Tile_1.Tile(6, 8)));
            this.king = new King_1.King(new Tile_1.Tile(5, 8));
            this.knights.push(new Knight_1.Knight(new Tile_1.Tile(2, 8)));
            this.knights.push(new Knight_1.Knight(new Tile_1.Tile(7, 8)));
        }
    }
    Player.fromPlayer = function (player) {
        var isWhite = player.isWhite;
        var playerName = player.playerName;
        var rooks = new Array();
        for (var _i = 0, _a = player.rooks; _i < _a.length; _i++) {
            var rook = _a[_i];
            rooks.push(Rook_1.Rook.fromRook(rook));
        }
        var promotions = [];
        for (var _b = 0, _c = player.promotions; _b < _c.length; _b++) {
            var piece = _c[_b];
            if (piece instanceof Pawn_1.Pawn) {
                promotions.push(Pawn_1.Pawn.fromPawn(piece));
            }
            else if (piece instanceof Rook_1.Rook) {
                promotions.push(Rook_1.Rook.fromRook(piece));
            }
            else if (piece instanceof Bishop_1.Bishop) {
                promotions.push(Bishop_1.Bishop.fromBishop(piece));
            }
            else if (piece instanceof Knight_1.Knight) {
                promotions.push(Knight_1.Knight.fromKnight(piece));
            }
            else if (piece instanceof Queen_1.Queen) {
                promotions.push(Queen_1.Queen.fromQueen(piece));
            }
        }
        var king = King_1.King.fromKing(player.king);
        var queen = Queen_1.Queen.fromQueen(player.queen);
        var bishops = new Array();
        for (var _d = 0, _e = player.bishops; _d < _e.length; _d++) {
            var bishop = _e[_d];
            bishops.push(Bishop_1.Bishop.fromBishop(bishop));
        }
        var knights = new Array();
        for (var _f = 0, _g = player.knights; _f < _g.length; _f++) {
            var knight = _g[_f];
            knights.push(Knight_1.Knight.fromKnight(knight));
        }
        var pawns = new Array();
        for (var _h = 0, _j = player.pawns; _h < _j.length; _h++) {
            var pawn = _j[_h];
            pawns.push(Pawn_1.Pawn.fromPawn(pawn));
        }
        var ct = player.ct;
        var newPlayer = new this(isWhite, playerName);
        var playerExtra = {
            rooks: rooks,
            king: king,
            queen: queen,
            bishops: bishops,
            knights: knights,
            pawns: pawns,
            ct: ct,
            promotions: promotions
        };
        return Object.assign(newPlayer, playerExtra);
    };
    Player.prototype.movePiece = function (currentTile, newTile, enemyPlayer, board) {
        var piece = this.getPieceByTile(currentTile);
        if (piece == null)
            return false;
        if (piece.isLegalMove(currentTile, newTile, this, enemyPlayer, board)) {
            var oldTile = piece.tile;
            piece.tile = newTile;
            piece.hasMoved = true;
            if (piece instanceof Pawn_1.Pawn && Math.abs(newTile.y - oldTile.y) == 2) {
                piece.enPassantEligable = true;
            }
            if (enemyPlayer.piecePresent(newTile)) {
                enemyPlayer.getPieceByTile(newTile).captured = true;
                this.ct = 0;
            }
            else if (piece instanceof Pawn_1.Pawn && Math.abs(newTile.x - oldTile.x) == 1) {
                if (this.isWhite) {
                    var enPassantTile = new Tile_1.Tile(newTile.x, newTile.y - 1);
                    if (enemyPlayer.piecePresent(enPassantTile)) {
                        var enPassantPiece = enemyPlayer.getPieceByTile(enPassantTile);
                        if (enPassantPiece instanceof Pawn_1.Pawn) {
                            enPassantPiece.captured = true;
                            this.ct = 0;
                        }
                        else {
                            this.ct++;
                        }
                    }
                    else {
                        this.ct++;
                    }
                }
                else {
                    var enPassantTile = new Tile_1.Tile(newTile.x, newTile.y + 1);
                    if (enemyPlayer.piecePresent(enPassantTile)) {
                        var enPassantPiece = enemyPlayer.getPieceByTile(enPassantTile);
                        if (enPassantPiece instanceof Pawn_1.Pawn) {
                            enPassantPiece.captured = true;
                            this.ct = 0;
                        }
                        else {
                            this.ct++;
                        }
                    }
                    else {
                        this.ct++;
                    }
                }
            }
            else {
                this.ct++;
            }
            this.removeEnpassant(enemyPlayer);
            return true;
        }
        else {
            return false;
        }
    };
    Player.prototype.removeEnpassant = function (player) {
        for (var _i = 0, _a = player.pawns; _i < _a.length; _i++) {
            var pawn = _a[_i];
            pawn.enPassantEligable = false;
        }
    };
    Player.prototype.piecePresent = function (tile) {
        return this.getPieceByTile(tile) != null;
    };
    Player.prototype.getPieceByTile = function (tile) {
        for (var i = 0; i < this.rooks.length; i++) {
            if (this.rooks[i].tile.equals(tile) && !this.rooks[i].captured) {
                return this.rooks[i];
            }
        }
        for (var i = 0; i < this.pawns.length; i++) {
            if (this.pawns[i].tile.equals(tile) && !this.pawns[i].captured) {
                return this.pawns[i];
            }
        }
        for (var i = 0; i < this.bishops.length; i++) {
            if (this.bishops[i].tile.equals(tile) && !this.bishops[i].captured) {
                return this.bishops[i];
            }
        }
        for (var i = 0; i < this.knights.length; i++) {
            if (this.knights[i].tile.equals(tile) && !this.knights[i].captured) {
                return this.knights[i];
            }
        }
        if (this.queen.tile.equals(tile) && !this.queen.captured) {
            return this.queen;
        }
        if (this.king.tile.equals(tile) && !this.king.captured) {
            return this.king;
        }
        for (var i = 0; i < this.promotions.length; i++) {
            if (this.promotions[i].tile.equals(tile) && !this.promotions[i].captured) {
                return this.promotions[i];
            }
        }
        return null;
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=Player.js.map