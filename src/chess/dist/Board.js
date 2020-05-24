"use strict";
exports.__esModule = true;
var Tile_1 = require("./Tile");
var King_1 = require("./King");
var Queen_1 = require("./Queen");
var Rook_1 = require("./Rook");
var Bishop_1 = require("./Bishop");
var Knight_1 = require("./Knight");
var Pawn_1 = require("./Pawn");
var Board = (function () {
    function Board(size) {
        this.tiles = new Array();
        this.size = Math.floor(size);
        for (var i = 1; i <= this.size; i++) {
            for (var j = 1; j <= this.size; j++) {
                this.tiles.push(new Tile_1.Tile(j, i));
            }
        }
    }
    Board.fromBoard = function (board) {
        return new this(board.size);
    };
    Board.prototype.getSize = function () {
        return this.size;
    };
    Board.prototype.inBoard = function (tile) {
        return !(tile.x > this.size || tile.y > this.size || tile.x < 1 || tile.y < 1);
    };
    Board.prototype.printBoard = function (white, black) {
        var boardString = "";
        var pieces = new Array();
        for (var i = 0; i < this.tiles.length; i++) {
            if (white.getPieceByTile(this.tiles[i]) instanceof Queen_1.Queen && !white.getPieceByTile(this.tiles[i]).captured) {
                pieces.push("wQ");
            }
            else if (white.getPieceByTile(this.tiles[i]) instanceof King_1.King && !white.getPieceByTile(this.tiles[i]).captured) {
                pieces.push("wK");
            }
            else if (white.getPieceByTile(this.tiles[i]) instanceof Knight_1.Knight && !white.getPieceByTile(this.tiles[i]).captured) {
                pieces.push("wk");
            }
            else if (white.getPieceByTile(this.tiles[i]) instanceof Rook_1.Rook && !white.getPieceByTile(this.tiles[i]).captured) {
                pieces.push("wR");
            }
            else if (white.getPieceByTile(this.tiles[i]) instanceof Bishop_1.Bishop && !white.getPieceByTile(this.tiles[i]).captured) {
                pieces.push("wB");
            }
            else if (white.getPieceByTile(this.tiles[i]) instanceof Pawn_1.Pawn && !white.getPieceByTile(this.tiles[i]).captured) {
                pieces.push("wP");
            }
            else if (black.getPieceByTile(this.tiles[i]) instanceof Queen_1.Queen && !black.getPieceByTile(this.tiles[i]).captured) {
                pieces.push("bQ");
            }
            else if (black.getPieceByTile(this.tiles[i]) instanceof King_1.King && !black.getPieceByTile(this.tiles[i]).captured) {
                pieces.push("bK");
            }
            else if (black.getPieceByTile(this.tiles[i]) instanceof Knight_1.Knight && !black.getPieceByTile(this.tiles[i]).captured) {
                pieces.push("bk");
            }
            else if (black.getPieceByTile(this.tiles[i]) instanceof Rook_1.Rook && !black.getPieceByTile(this.tiles[i]).captured) {
                pieces.push("bR");
            }
            else if (black.getPieceByTile(this.tiles[i]) instanceof Bishop_1.Bishop && !black.getPieceByTile(this.tiles[i]).captured) {
                pieces.push("bB");
            }
            else if (black.getPieceByTile(this.tiles[i]) instanceof Pawn_1.Pawn && !black.getPieceByTile(this.tiles[i]).captured) {
                pieces.push("bP");
            }
            else
                pieces.push("  ");
        }
        boardString += "`\n     1    2    3    4    5    6    7    8  \n";
        boardString += "  _________________________________________\n";
        boardString += "A | " + pieces[0] + " | " + pieces[1] + " | " + pieces[2] + " | " + pieces[3] + " | " + pieces[4] + " | " + pieces[5] + " | " + pieces[6] + " | " + pieces[7] + " |\n";
        boardString += "  |____|____|____|____|____|____|____|____|\n";
        boardString += "B | " + pieces[8] + " | " + pieces[9] + " | " + pieces[10] + " | " + pieces[11] + " | " + pieces[12] + " | " + pieces[13] + " | " + pieces[14] + " | " + pieces[15] + " |\n";
        boardString += "  |____|____|____|____|____|____|____|____|\n";
        boardString += "C | " + pieces[16] + " | " + pieces[17] + " | " + pieces[18] + " | " + pieces[19] + " | " + pieces[20] + " | " + pieces[21] + " | " + pieces[22] + " | " + pieces[23] + " |\n";
        boardString += "  |____|____|____|____|____|____|____|____|\n";
        boardString += "D | " + pieces[24] + " | " + pieces[25] + " | " + pieces[26] + " | " + pieces[27] + " | " + pieces[28] + " | " + pieces[29] + " | " + pieces[30] + " | " + pieces[31] + " |\n";
        boardString += "  |____|____|____|____|____|____|____|____|\n";
        boardString += "E | " + pieces[32] + " | " + pieces[33] + " | " + pieces[34] + " | " + pieces[35] + " | " + pieces[36] + " | " + pieces[37] + " | " + pieces[38] + " | " + pieces[39] + " |\n";
        boardString += "  |____|____|____|____|____|____|____|____|\n";
        boardString += "F | " + pieces[40] + " | " + pieces[41] + " | " + pieces[42] + " | " + pieces[43] + " | " + pieces[44] + " | " + pieces[45] + " | " + pieces[46] + " | " + pieces[47] + " |\n";
        boardString += "  |____|____|____|____|____|____|____|____|\n";
        boardString += "G | " + pieces[48] + " | " + pieces[49] + " | " + pieces[50] + " | " + pieces[51] + " | " + pieces[52] + " | " + pieces[53] + " | " + pieces[54] + " | " + pieces[55] + " |\n";
        boardString += "  |____|____|____|____|____|____|____|____|\n";
        boardString += "H | " + pieces[56] + " | " + pieces[57] + " | " + pieces[58] + " | " + pieces[59] + " | " + pieces[60] + " | " + pieces[61] + " | " + pieces[62] + " | " + pieces[63] + " |\n";
        boardString += "  |____|____|____|____|____|____|____|____|\n`";
        return boardString;
    };
    return Board;
}());
exports.Board = Board;
//# sourceMappingURL=Board.js.map