"use strict";
exports.__esModule = true;
var Tile_1 = require("./Tile");
var Player_1 = require("./Player");
var Queen_1 = require("./Queen");
var Rook_1 = require("./Rook");
var Bishop_1 = require("./Bishop");
var Knight_1 = require("./Knight");
var Pawn_1 = require("./Pawn");
var Board_1 = require("./Board");
var Game = (function () {
    function Game(eventEmitter, gameEventString, white, black, board) {
        if (white === void 0) { white = new Player_1.Player(true, "White"); }
        if (black === void 0) { black = new Player_1.Player(false, "Black"); }
        if (board === void 0) { board = new Board_1.Board(8); }
        this.ct = 0;
        this.black = black;
        this.white = white;
        this.over = false;
        this.eventEmitter = eventEmitter;
        this.gameEventString = gameEventString;
        this.board = board;
    }
    Game.fromGame = function (game) {
        var newGame = new this(game.eventEmitter, game.gameEventString, Player_1.Player.fromPlayer(game.white), Player_1.Player.fromPlayer(game.black), Board_1.Board.fromBoard(game.board));
        var gameExtra = {
            over: game.over,
            ct: game.ct
        };
        return Object.assign(newGame, gameExtra);
    };
    Game.prototype.start = function (func, whitePlayer, blackPlayer) {
        var _this = this;
        if (!this.over) {
            var whiteTurn = true;
            func('White move' + this.board.printBoard(this.white, this.black));
            this.eventEmitter.on(this.gameEventString, function (move, myFunc, author) {
                if (whiteTurn && author == whitePlayer) {
                    var tempGame = Game.fromGame(_this);
                    var isCheck = false;
                    if (typeof (move.piece) != "undefined") {
                        if (tempGame.castle(move.piece, tempGame.white, tempGame.black)) {
                            if (tempGame.check(tempGame.white, tempGame.black, tempGame.board)) {
                                myFunc('illegal move');
                                isCheck = true;
                            }
                        }
                    }
                    else {
                        if (tempGame.white.movePiece(move.from, move.to, tempGame.black, tempGame.board)) {
                            if (tempGame.check(tempGame.white, tempGame.black, tempGame.board)) {
                                myFunc('illegal move');
                                isCheck = true;
                            }
                        }
                    }
                    if (!isCheck) {
                        var success = void 0;
                        if (typeof (move.piece) != "undefined") {
                            success = _this.castle(move.piece, _this.white, _this.black);
                        }
                        else {
                            success = _this.white.movePiece(move.from, move.to, _this.black, _this.board);
                        }
                        if (!success) {
                            myFunc('illegal move');
                        }
                        else {
                            _this.promotePawn(_this.white);
                            myFunc('Black move' + _this.board.printBoard(_this.white, _this.black));
                            whiteTurn = !success;
                        }
                    }
                    if (_this.check(_this.black, _this.white, _this.board)) {
                        myFunc('Black is now in check');
                    }
                }
                else if (!whiteTurn && author == blackPlayer) {
                    var tempGame = Game.fromGame(_this);
                    var isCheck = false;
                    if (typeof (move.piece) != "undefined") {
                        if (tempGame.castle(move.piece, tempGame.black, tempGame.white)) {
                            if (tempGame.check(tempGame.black, tempGame.white, tempGame.board)) {
                                myFunc('illegal move');
                                isCheck = true;
                            }
                        }
                    }
                    else {
                        if (tempGame.black.movePiece(move.from, move.to, tempGame.white, tempGame.board)) {
                            if (tempGame.check(tempGame.black, tempGame.white, tempGame.board)) {
                                myFunc('illegal move');
                                isCheck = true;
                            }
                        }
                    }
                    if (!isCheck) {
                        var success = void 0;
                        if (typeof (move.piece) != "undefined") {
                            success = _this.castle(move.piece, _this.black, _this.white);
                        }
                        else {
                            success = _this.black.movePiece(move.from, move.to, _this.white, _this.board);
                        }
                        if (!success) {
                            myFunc('illegal move');
                        }
                        else {
                            _this.promotePawn(_this.black);
                            myFunc('White move' + _this.board.printBoard(_this.white, _this.black));
                            whiteTurn = success;
                        }
                    }
                    if (_this.check(_this.white, _this.black, _this.board)) {
                        myFunc('White is now in check');
                    }
                }
                else {
                    myFunc("Not your turn");
                }
                if (_this.stalemate()) {
                    _this.over = true;
                    myFunc("Stalemate.");
                    _this.eventEmitter.emit('gameOver');
                }
                if (_this.checkMate(_this.white, _this.black, _this.board)) {
                    _this.over = true;
                    myFunc("White is in check mate, Black wins!!");
                    myFunc("over");
                    _this.eventEmitter.emit('gameOver');
                }
                else if (_this.checkMate(_this.black, _this.white, _this.board)) {
                    _this.over = true;
                    myFunc("Black is in check mate, White wins!!");
                    myFunc("over");
                    _this.eventEmitter.emit('gameOver');
                }
            });
        }
    };
    Game.prototype.check = function (currentPlayer, enemyPlayer, board) {
        for (var _i = 0, _a = board.tiles; _i < _a.length; _i++) {
            var tile = _a[_i];
            var currPiece = enemyPlayer.getPieceByTile(tile);
            var moves = new Array();
            if (currPiece != null) {
                if (currPiece instanceof Pawn_1.Pawn) {
                    var piece = currPiece;
                    moves = piece.generateMoves(enemyPlayer, currentPlayer, board);
                }
                else if (currPiece instanceof Rook_1.Rook) {
                    var piece = currPiece;
                    moves = piece.generateMoves(enemyPlayer, currentPlayer, board);
                }
                else if (currPiece instanceof Bishop_1.Bishop) {
                    var piece = currPiece;
                    moves = piece.generateMoves(enemyPlayer, currentPlayer, board);
                }
                else if (currPiece instanceof Knight_1.Knight) {
                    var piece = currPiece;
                    moves = piece.generateMoves(enemyPlayer, currentPlayer, board);
                }
                else if (currPiece instanceof Queen_1.Queen) {
                    var piece = currPiece;
                    moves = piece.generateMoves(enemyPlayer, currentPlayer, board);
                }
                else {
                    var piece = currPiece;
                    moves = piece.generateMoves(enemyPlayer, currentPlayer, board);
                }
                if (moves.length != 0) {
                    for (var _b = 0, moves_1 = moves; _b < moves_1.length; _b++) {
                        var move = moves_1[_b];
                        if (currentPlayer.king.tile.equals(move)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    Game.prototype.checkMate = function (currentPlayer, enemyPlayer, theBoard) {
        if (this.check(currentPlayer, enemyPlayer, theBoard)) {
            var moves = void 0;
            if (!currentPlayer.queen.captured) {
                moves = currentPlayer.queen.generateMoves(currentPlayer, enemyPlayer, theBoard);
                for (var _i = 0, moves_2 = moves; _i < moves_2.length; _i++) {
                    var tile = moves_2[_i];
                    var tempPlayer = Player_1.Player.fromPlayer(currentPlayer);
                    var tempEPlayer = Player_1.Player.fromPlayer(enemyPlayer);
                    tempPlayer.movePiece(tempPlayer.queen.tile, tile, tempEPlayer, theBoard);
                    if (!this.check(tempPlayer, tempEPlayer, theBoard))
                        return false;
                }
            }
            moves = currentPlayer.king.generateMoves(currentPlayer, enemyPlayer, theBoard);
            for (var _a = 0, moves_3 = moves; _a < moves_3.length; _a++) {
                var tile = moves_3[_a];
                var tempPlayer = Player_1.Player.fromPlayer(currentPlayer);
                var tempEPlayer = Player_1.Player.fromPlayer(enemyPlayer);
                tempPlayer.movePiece(tempPlayer.king.tile, tile, tempEPlayer, theBoard);
                if (!this.check(tempPlayer, tempEPlayer, theBoard))
                    return false;
            }
            for (var _b = 0, _c = currentPlayer.pawns; _b < _c.length; _b++) {
                var pawn = _c[_b];
                if (!pawn.captured) {
                    moves = pawn.generateMoves(currentPlayer, enemyPlayer, theBoard);
                    for (var _d = 0, moves_4 = moves; _d < moves_4.length; _d++) {
                        var tile = moves_4[_d];
                        var tempPlayer = Player_1.Player.fromPlayer(currentPlayer);
                        var tempEPlayer = Player_1.Player.fromPlayer(enemyPlayer);
                        tempPlayer.movePiece(pawn.tile, tile, tempEPlayer, theBoard);
                        if (!this.check(tempPlayer, tempEPlayer, theBoard))
                            return false;
                    }
                }
            }
            for (var _e = 0, _f = currentPlayer.rooks; _e < _f.length; _e++) {
                var rook = _f[_e];
                if (!rook.captured) {
                    moves = rook.generateMoves(currentPlayer, enemyPlayer, theBoard);
                    for (var _g = 0, moves_5 = moves; _g < moves_5.length; _g++) {
                        var tile = moves_5[_g];
                        var tempPlayer = Player_1.Player.fromPlayer(currentPlayer);
                        var tempEPlayer = Player_1.Player.fromPlayer(enemyPlayer);
                        tempPlayer.movePiece(rook.tile, tile, tempEPlayer, theBoard);
                        if (!this.check(tempPlayer, tempEPlayer, theBoard))
                            return false;
                    }
                }
            }
            for (var _h = 0, _j = currentPlayer.bishops; _h < _j.length; _h++) {
                var bishop = _j[_h];
                if (!bishop.captured) {
                    moves = bishop.generateMoves(currentPlayer, enemyPlayer, theBoard);
                    for (var _k = 0, moves_6 = moves; _k < moves_6.length; _k++) {
                        var tile = moves_6[_k];
                        var tempPlayer = Player_1.Player.fromPlayer(currentPlayer);
                        var tempEPlayer = Player_1.Player.fromPlayer(enemyPlayer);
                        tempPlayer.movePiece(bishop.tile, tile, tempEPlayer, theBoard);
                        if (!this.check(tempPlayer, tempEPlayer, theBoard))
                            return false;
                    }
                }
            }
            for (var _l = 0, _m = currentPlayer.knights; _l < _m.length; _l++) {
                var knight = _m[_l];
                if (!knight.captured) {
                    moves = knight.generateMoves(currentPlayer, enemyPlayer, theBoard);
                    for (var _o = 0, moves_7 = moves; _o < moves_7.length; _o++) {
                        var tile = moves_7[_o];
                        var tempPlayer = Player_1.Player.fromPlayer(currentPlayer);
                        var tempEPlayer = Player_1.Player.fromPlayer(enemyPlayer);
                        tempPlayer.movePiece(knight.tile, tile, tempEPlayer, theBoard);
                        if (!this.check(tempPlayer, tempEPlayer, theBoard))
                            return false;
                    }
                }
            }
            return true;
        }
        return false;
    };
    Game.prototype.stalemate = function () {
        if (this.white.ct + this.black.ct > 50) {
            return true;
        }
    };
    Game.prototype.castle = function (tile, player, enemyPlayer) {
        if (!player.piecePresent(tile)) {
            return false;
        }
        var rook = player.getPieceByTile(tile);
        if (!(rook instanceof Rook_1.Rook))
            return false;
        if (!(rook.hasMoved || player.king.hasMoved)) {
            if (rook.tile.x == 1) {
                if (player.isWhite) {
                    if (!(player.piecePresent(new Tile_1.Tile(2, 1)) || player.piecePresent(new Tile_1.Tile(3, 1)) || player.piecePresent(new Tile_1.Tile(4, 1))
                        || enemyPlayer.piecePresent(new Tile_1.Tile(2, 1)) || enemyPlayer.piecePresent(new Tile_1.Tile(3, 1)) || enemyPlayer.piecePresent(new Tile_1.Tile(4, 1)))) {
                        rook.tile = new Tile_1.Tile(4, 1);
                        player.king.tile = new Tile_1.Tile(3, 1);
                        rook.hasMoved = true;
                        player.king.hasMoved = true;
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    if (!(player.piecePresent(new Tile_1.Tile(2, 8)) || player.piecePresent(new Tile_1.Tile(3, 8)) || player.piecePresent(new Tile_1.Tile(4, 8))
                        || enemyPlayer.piecePresent(new Tile_1.Tile(2, 8)) || enemyPlayer.piecePresent(new Tile_1.Tile(3, 8)) || enemyPlayer.piecePresent(new Tile_1.Tile(4, 8)))) {
                        rook.tile = new Tile_1.Tile(4, 8);
                        player.king.tile = new Tile_1.Tile(3, 8);
                        rook.hasMoved = true;
                        player.king.hasMoved = true;
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                if (player.isWhite) {
                    if (!(player.piecePresent(new Tile_1.Tile(7, 1)) || player.piecePresent(new Tile_1.Tile(6, 1))
                        || enemyPlayer.piecePresent(new Tile_1.Tile(7, 1)) || enemyPlayer.piecePresent(new Tile_1.Tile(6, 1)))) {
                        rook.tile = new Tile_1.Tile(6, 1);
                        player.king.tile = new Tile_1.Tile(7, 1);
                        rook.hasMoved = true;
                        player.king.hasMoved = true;
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    if (!(player.piecePresent(new Tile_1.Tile(7, 8)) || player.piecePresent(new Tile_1.Tile(6, 8))
                        || enemyPlayer.piecePresent(new Tile_1.Tile(7, 8)) || enemyPlayer.piecePresent(new Tile_1.Tile(6, 8)))) {
                        rook.tile = new Tile_1.Tile(6, 8);
                        player.king.tile = new Tile_1.Tile(7, 8);
                        rook.hasMoved = true;
                        player.king.hasMoved = true;
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
        else {
            return false;
        }
    };
    Game.prototype.promotePawn = function (currentPlayer) {
        for (var i = 0; i < currentPlayer.pawns.length; i++) {
            if (!currentPlayer.pawns[i].captured) {
                if (currentPlayer.pawns[i].tile.y == 8 && currentPlayer.isWhite) {
                    currentPlayer.pawns[i].captured = true;
                    currentPlayer.promotions.push(new Queen_1.Queen(currentPlayer.pawns[i].tile));
                }
                else if (currentPlayer.pawns[i].tile.y == 1 && !currentPlayer.isWhite) {
                    currentPlayer.pawns[i].captured = true;
                    currentPlayer.promotions.push(new Queen_1.Queen(currentPlayer.pawns[i].tile));
                }
            }
        }
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map