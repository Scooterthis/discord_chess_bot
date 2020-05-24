const chess = require("../chess.js");

var board = new chess.Board(8);

module.exports.createPlayer = function(name,isWhite) {
	return new chess.Player(name,isWhite);
}

module.exports.createEmptyPlayer = function(name, isWhite) {
	var player = this.createPlayer(name,isWhite);
	this.clearPlayerPieces(player);
	return player;
}

module.exports.createTile = function(x,y) {
	return new chess.Tile(x,y);
}

module.exports.clearPlayerPieces = function(player) {
	player.queen = this.createPiece("queen", -1000,-1000);
	player.king = this.createPiece("king", -1000,-1000);
	player.pawns = [];
	player.bishops = [];
	player.knights = [];
	player.rooks = [];
}

module.exports.createPiece = function(type, x, y) {
	switch (type) {
		case "king":
			return new chess.King(new chess.Tile(x,y));
		case "queen":
			return new chess.Queen(new chess.Tile(x,y));
		case "rook":
			return new chess.Rook(new chess.Tile(x,y));
		case "pawn":
			return new chess.Pawn(new chess.Tile(x,y));
		case "knight":
			return new chess.Knight(new chess.Tile(x,y));
		case "bishop":
			return new chess.Bishop(new chess.Tile(x,y));
	}
}

module.exports.addPieceToPlayer = function(piece, player) {
	if (piece instanceof chess.King) {
		player.king = piece
	} else if (piece instanceof chess.Queen) {
		player.queen = piece
	} else if (piece instanceof chess.Rook) {
		player.rooks.push(piece);
	} else if (piece instanceof chess.Pawn) {
		player.pawns.push(piece);
	} else if (piece instanceof chess.Knight) {
		player.knights.push(piece);
	} else if (piece instanceof chess.Bishop) {
		player.bishops.push(piece);
	}
}

module.exports.addPieceOfTypeToPlayer = function(type, x, y, player) {
	this.addPieceToPlayer(createPiece(type,x,y),player);
}

module.exports.getPossibleMoves = function(piece, player, enemyPlayer) {
	return piece.generateMoves(player,enemyPlayer,board);
}

module.exports.coordinatesToTiles = function(coordinates) {
	var tiles = [];

	for (var i = 0; i < coordinates.length;i++) {
		tiles.push(this.createTile(coordinates[i][0],coordinates[i][1]));
	}

	return tiles;
}
