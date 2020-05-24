const chess = require("../chess.js");
const assert = require('assert');
const test = require("./TestLifeEasier.js");
const testCase = require("./TestCase.js");


//-----------------------------
//@PAWN
//-----------------------------

//Test White Pawn
var pawn = new testCase([test.createTile(5,7),test.createTile(5,6)],"White Pawn Movement")
pawn.scenario = function() {
	var whitePawn = test.createEmptyPlayer("WhitePawnJim", true);
	var emptyEnemy = test.createEmptyPlayer("EmptyEnemy", true);

	test.addPieceToPlayer(test.createPiece("pawn",5,5),whitePawn);

	return test.getPossibleMoves(whitePawn.pawns[0],whitePawn,emptyEnemy);
}

pawn.test();

//Test White Pawn Ally Collision
var pawn = new testCase([],"White Pawn Ally Collision")
pawn.scenario = function() {
	var whitePawn = test.createEmptyPlayer("WhitePawnJim", true);
	var emptyEnemy = test.createEmptyPlayer("EmptyEnemy", true);

	test.addPieceToPlayer(test.createPiece("pawn",5,5), whitePawn);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),whitePawn);
		}
	}

	return test.getPossibleMoves(whitePawn.pawns[0],whitePawn,emptyEnemy);
}

pawn.test();


//Test White Pawn Enemy
var pawn = new testCase([test.createTile(4,6),test.createTile(6,6)],"White Pawn Enemy Collision")
pawn.scenario = function() {
	var whitePawn = test.createEmptyPlayer("WhitePawnJim", true);
	var emptyEnemy = test.createEmptyPlayer("EmptyEnemy", true);

	test.addPieceToPlayer(test.createPiece("pawn",5,5), whitePawn);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),emptyEnemy);
		}
	}

	return test.getPossibleMoves(whitePawn.pawns[0],whitePawn,emptyEnemy);
}

pawn.test();

//Test Black Pawn
var pawn = new testCase([test.createTile(5,3),test.createTile(5,4)],"Black Pawn Movement")
pawn.scenario = function() {
	var whitePawn = test.createEmptyPlayer("WhitePawnJim", false);
	var emptyEnemy = test.createEmptyPlayer("EmptyEnemy", false);

	test.addPieceToPlayer(test.createPiece("pawn",5,5),whitePawn);

	return test.getPossibleMoves(whitePawn.pawns[0],whitePawn,emptyEnemy);
}

pawn.test();

//Test Black Pawn Ally Collision
var pawn = new testCase([],"Black Pawn Ally Collision")
pawn.scenario = function() {
	var whitePawn = test.createEmptyPlayer("WhitePawnJim", false);
	var emptyEnemy = test.createEmptyPlayer("EmptyEnemy", false);

	test.addPieceToPlayer(test.createPiece("pawn",5,5), whitePawn);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),whitePawn);
		}
	}

	return test.getPossibleMoves(whitePawn.pawns[0],whitePawn,emptyEnemy);
}

pawn.test();


//Test Black Pawn Enemy
var pawn = new testCase([test.createTile(4,4),test.createTile(6,4)],"Black Pawn Enemy Collision")
pawn.scenario = function() {
	var whitePawn = test.createEmptyPlayer("WhitePawnJim", false);
	var emptyEnemy = test.createEmptyPlayer("EmptyEnemy", false);

	test.addPieceToPlayer(test.createPiece("pawn",5,5), whitePawn);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),emptyEnemy);
		}
	}

	return test.getPossibleMoves(whitePawn.pawns[0],whitePawn,emptyEnemy);
}

pawn.test();

//-----------------------------
//@ROOK
//-----------------------------

var pieceTest = new testCase(test.coordinatesToTiles([[5,6],[5,7],[5,8],[5,4],[5,3],[5,2],[5,1],[6,5],[7,5],[8,5],[4,5],[3,5],[2,5],[1,5]]), "White Rook Movement");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", true);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("rook",5,5),player);

	return test.getPossibleMoves(player.rooks[0],player,enemy);
}

pieceTest.test();

//White Rook Ally Collision
var pieceTest = new testCase([], "White Rook Ally Collision");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", true);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("rook",5,5),player);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),player);
		}
	}

	return test.getPossibleMoves(player.rooks[0],player,enemy);
}

pieceTest.test();

//White Rook Enemy Collision
var pieceTest = new testCase(test.coordinatesToTiles([[5,6],[5,4],[6,5],[4,5]]), "White Rook Enemy Collision");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", true);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("rook",5,5),player);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),enemy);
		}
	}

	return test.getPossibleMoves(player.rooks[0],player,enemy);
}

pieceTest.test();

//Black Rook Movement
var pieceTest = new testCase(test.coordinatesToTiles([[5,6],[5,7],[5,8],[5,4],[5,3],[5,2],[5,1],[6,5],[7,5],[8,5],[4,5],[3,5],[2,5],[1,5]]), "Black Rook Movement");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", false);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("rook",5,5),player);

	return test.getPossibleMoves(player.rooks[0],player,enemy);
}

pieceTest.test();

//Black Rook Ally Collision
var pieceTest = new testCase([], "Black Rook Ally Collision");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", false);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("rook",5,5),player);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),player);
		}
	}

	return test.getPossibleMoves(player.rooks[0],player,enemy);
}

pieceTest.test();

//Black Rook Enemy Collision
var pieceTest = new testCase(test.coordinatesToTiles([[5,6],[5,4],[6,5],[4,5]]), "Black Rook Enemy Collision");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", false);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("rook",5,5),player);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),enemy);
		}
	}

	return test.getPossibleMoves(player.rooks[0],player,enemy);
}

pieceTest.test();

//-----------------------------
//@KNIGHT
//-----------------------------

var pieceTest = new testCase(test.coordinatesToTiles([[6,7],[7,6],[3,6],[4,7],[4,3],[3,4],[6,3],[7,4]]), "White Knight Movement");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", true);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("knight",5,5),player);

	return test.getPossibleMoves(player.knights[0],player,enemy);
}

pieceTest.test();

//White Knight Ally Collision
var pieceTest = new testCase([], "White Knight Ally Collision");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", true);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("knight",5,5),player);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),player);
		}
	}

	return test.getPossibleMoves(player.knights[0],player,enemy);
}

pieceTest.test();

//White Knight Enemy Collision
var pieceTest = new testCase(test.coordinatesToTiles([[6,7],[7,6],[3,6],[4,7],[4,3],[3,4],[6,3],[7,4]]), "White Knight Enemy Collision");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", true);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("knight",5,5),player);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),enemy);
		}
	}

	return test.getPossibleMoves(player.knights[0],player,enemy);
}

pieceTest.test();

//Black Knight Movement
var pieceTest = new testCase(test.coordinatesToTiles([[6,7],[7,6],[3,6],[4,7],[4,3],[3,4],[6,3],[7,4]]), "Black Knight Movement");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", false);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("knight",5,5),player);

	return test.getPossibleMoves(player.knights[0],player,enemy);
}

pieceTest.test();

//Black Knight Ally Collision
var pieceTest = new testCase([], "Black Knight Ally Collision");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", false);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("knight",5,5),player);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),player);
		}
	}

	return test.getPossibleMoves(player.knights[0],player,enemy);
}

pieceTest.test();

//Black Knight Enemy Collision
var pieceTest = new testCase(test.coordinatesToTiles([[6,7],[7,6],[3,6],[4,7],[4,3],[3,4],[6,3],[7,4]]), "Black Knight Enemy Collision");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", false);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("knight",5,5),player);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),enemy);
		}
	}

	return test.getPossibleMoves(player.knights[0],player,enemy);
}

pieceTest.test();

//-----------------------------
//@ Bishop
//-----------------------------

var pieceTest = new testCase(test.coordinatesToTiles([[6,6],[7,7],[8,8],[4,6],[3,7],[2,8],[4,4],[3,3],[2,2],[1,1],[6,4],[7,3],[8,2]]), "White bishop Movement");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", true);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("bishop",5,5),player);

	return test.getPossibleMoves(player.bishops[0],player,enemy);
}

pieceTest.test();

//White bishop Ally Collision
var pieceTest = new testCase([], "White bishop Ally Collision");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", true);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("bishop",5,5),player);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),player);
		}
	}

	return test.getPossibleMoves(player.bishops[0],player,enemy);
}

pieceTest.test();

//White bishop Enemy Collision
var pieceTest = new testCase(test.coordinatesToTiles([[6,6],[4,6],[4,4],[6,4]]), "White bishop Enemy Collision");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", true);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("bishop",5,5),player);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),enemy);
		}
	}

	return test.getPossibleMoves(player.bishops[0],player,enemy);
}

pieceTest.test();

//Black bishop Movement
var pieceTest = new testCase(test.coordinatesToTiles([[6,6],[7,7],[8,8],[4,6],[3,7],[2,8],[4,4],[3,3],[2,2],[1,1],[6,4],[7,3],[8,2]]), "Black bishop Movement");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", false);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("bishop",5,5),player);

	return test.getPossibleMoves(player.bishops[0],player,enemy);
}

pieceTest.test();

//Black bishop Ally Collision
var pieceTest = new testCase([], "Black bishop Ally Collision");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", false);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("bishop",5,5),player);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),player);
		}
	}

	return test.getPossibleMoves(player.bishops[0],player,enemy);
}

pieceTest.test();

//Black bishop Enemy Collision
var pieceTest = new testCase(test.coordinatesToTiles([[6,6],[4,6],[4,4],[6,4]]), "Black bishop Enemy Collision");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", false);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("bishop",5,5),player);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),enemy);
		}
	}

	return test.getPossibleMoves(player.bishops[0],player,enemy);
}

pieceTest.test();

//-----------------------------
//@ queen
//-----------------------------

var pieceTest = new testCase(test.coordinatesToTiles([[5,6],[5,7],[5,8],[5,4],[5,3],[5,2],[5,1],[6,5],[7,5],[8,5],[4,5],[3,5],[2,5],[1,5],[6,6],[7,7],[8,8],[4,6],[3,7],[2,8],[4,4],[3,3],[2,2],[1,1],[6,4],[7,3],[8,2]]), "White queen Movement");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", true);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("queen",5,5),player);

	return test.getPossibleMoves(player.queen,player,enemy);
}

pieceTest.test();

//White queen Ally Collision
var pieceTest = new testCase([], "White queen Ally Collision");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", true);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("queen",5,5),player);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),player);
		}
	}

	return test.getPossibleMoves(player.queen,player,enemy);
}

pieceTest.test();

//White queen Enemy Collision
var pieceTest = new testCase(test.coordinatesToTiles([[5,6],[5,4],[6,5],[4,5],[6,6],[4,6],[4,4],[6,4]]), "White queen Enemy Collision");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", true);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("queen",5,5),player);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),enemy);
		}
	}

	return test.getPossibleMoves(player.queen,player,enemy);
}

pieceTest.test();

//Black queen Movement
var pieceTest = new testCase(test.coordinatesToTiles([[5,6],[5,7],[5,8],[5,4],[5,3],[5,2],[5,1],[6,5],[7,5],[8,5],[4,5],[3,5],[2,5],[1,5],[6,6],[7,7],[8,8],[4,6],[3,7],[2,8],[4,4],[3,3],[2,2],[1,1],[6,4],[7,3],[8,2]]), "Black queen Movement");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", false);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("queen",5,5),player);

	return test.getPossibleMoves(player.queen,player,enemy);
}

pieceTest.test();

//Black queen Ally Collision
var pieceTest = new testCase([], "Black queen Ally Collision");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", false);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("queen",5,5),player);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),player);
		}
	}

	return test.getPossibleMoves(player.queen,player,enemy);
}

pieceTest.test();

//Black queen Enemy Collision
var pieceTest = new testCase(test.coordinatesToTiles([[5,6],[5,4],[6,5],[4,5],[6,6],[4,6],[4,4],[6,4]]), "Black queen Enemy Collision");
pieceTest.scenario = function() {
	var player = test.createEmptyPlayer("player", false);
	var enemy = test.createEmptyPlayer("enemy", false);

	test.addPieceToPlayer(test.createPiece("queen",5,5),player);

	for (var x = 1; x < 8; x++) {
		for (var y = 1; y < 8; y++) {
			test.addPieceToPlayer(test.createPiece("pawn",x,y),enemy);
		}
	}

	return test.getPossibleMoves(player.queen,player,enemy);
}

pieceTest.test();
