const chess = require('../chess.js');
const test = require("./TestLifeEasier.js");
const TestCase = require("./TestCase.js");
const event = require('events');

var eventEmitter = new event.EventEmitter;
var scenario;
var game;
var mess;

function genMove(str){
    let num1;
    let num2;
    if(str.length > 2){
        return false;
    }
    str = str.toUpperCase();
    switch (str[0]){
        case 'A':
            num1 = 1;
            break;
        case 'B':
            num1 = 2;
            break;
        case 'C':
            num1 = 3;
            break;
        case 'D':
            num1 = 4;
            break;
        case 'E':
            num1 = 5;
            break;
        case 'F':
            num1 = 6;
            break;
        case 'G':
            num1 = 7;
            break;
        case 'H':
            num1 = 8;
            break;
        default:
            num1 = null;
    }
    num2 = parseInt(str[1])

    try{
        return new chess.Tile(num2, num1);
    }
    catch{
        return null
    }
}

var printBoard = function(message) {
  // console.log(message);
  mess = message;
}

var createMove = function(string1, string2) {
  var move = {
    from:genMove(string1),
    to: genMove(string2)
  }

  return move;
}

var move = function(string1,string2,output = printBoard) {
  eventEmitter.emit('move0', createMove(string1,string2), output);
}

var createGame = function() {
  eventEmitter = new event.EventEmitter;
  game = new chess.Game(eventEmitter, 'move' + '0');
  game.start(printBoard);
}

var testScenario = function(testCondition, name, myFun) {
  scenario = new TestCase(testCondition,name);
  scenario.scenario = myFun;
  scenario.getAnswer = (message) => {console.log(message)};
  scenario.test();
}

testScenario("illegal move", "White Taking Turn Out Of Phase", () => {
  createGame();
  move('b1','c1');
  move('c1','d1');
  return mess;
});

testScenario("illegal move", "Black Taking Turn Out Of Phase", () => {
  createGame();
  move('g1','f1');
  return mess;
});

testScenario("illegal move", "Enemy Collision", () => {
  createGame();
  move('b1','c1');
  move('g1','f1');
  move('c1','d1');
  move('f1','e1');
  move('d1','e1');
  return mess;
})

testScenario("illegal move", "Ally Collision", () => {
  createGame();
  move('a2','c1');
  move('g1','f1');
  move('b1','c1');
  return mess;
})

testScenario("illegal move", "Pawn Movement: Start Two Space Movement", () => {
  createGame();
  move('b2','d2');
  move('g3','e3');
  move('d2','f2');
  return mess;
})

testScenario("illegal move", "Pawn Backwards Movement", () => {
  createGame();
  move('b2','d2');
  move('g3','f3');
  move('d2','c2');
  return mess;
})

testScenario("illegal move", "Pawn Sideways Movement", () => {
  createGame();
  move('b2','d2');
  move('g3','f3');
  move('d2','d1');
  return mess;
})

testScenario(`Black move\`
     1    2    3    4    5    6    7    8  \n  _________________________________________
A | wR | wk | wB | wQ | wK | wB | wk | wR |
  |____|____|____|____|____|____|____|____|
B | wP |    | wP | wP | wP | wP | wP | wP |
  |____|____|____|____|____|____|____|____|
C |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
D |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
E | wP |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
F |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
G |    | bP | bP | bP | bP | bP | bP | bP |
  |____|____|____|____|____|____|____|____|
H | bR | bk | bB | bQ | bK | bB | bk | bR |
  |____|____|____|____|____|____|____|____|
\``
, "Pawn Capture", () => {
  createGame();
  move('b2','d2');
  move('g1','e1');
  move('d2','e1');
  return mess;
})

testScenario(`Black move\`
     1    2    3    4    5    6    7    8  \n  _________________________________________
A | wR | wk | wB | wQ | wK | wB | wk | wR |
  |____|____|____|____|____|____|____|____|
B | wP |    | wP | wP | wP | wP | wP | wP |
  |____|____|____|____|____|____|____|____|
C |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
D |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
E |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
F |    |    | wP |    | bP |    |    |    |
  |____|____|____|____|____|____|____|____|
G | bP | bP |    | bP |    | bP | bP | bP |
  |____|____|____|____|____|____|____|____|
H | bR | bk | bB | bQ | bK | bB | bk | bR |
  |____|____|____|____|____|____|____|____|
\``, "Pawn En Passant Capture", () => {
  createGame();
  move('b2','d2');
  move('g5','f5');
  move('d2','e2');
  move('g3','e3');
  move('e2','f3');
  return mess;
})

testScenario("illegal move","Pawn Invalid En Passant Capture", () => {
  createGame();
  move('b2','d2');
  move('g3','e3');
  move('d2','e2');
  move('e3','d2');
  return mess;
})

testScenario(`Black move\`
     1    2    3    4    5    6    7    8  \n  _________________________________________
A | wR | wk | wB | wQ | wK | wB | wk | wR |
  |____|____|____|____|____|____|____|____|
B |    | wP | wP | wP | wP | wP | wP | wP |
  |____|____|____|____|____|____|____|____|
C |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
D |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
E |    |    |    | bk |    |    |    |    |
  |____|____|____|____|____|____|____|____|
F |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
G | bP |    | bP | bP | bP | bP | bP | bP |
  |____|____|____|____|____|____|____|____|
H | bR | wQ | bB | bQ | bK | bB | bk | bR |
  |____|____|____|____|____|____|____|____|
\``,"White Pawn Promotion", () => {
  createGame();
  move('b1','d1');
  move('g2','e2');
  move('d1','e2');
  move('h2','f3');
  move('e2','f2');
  move('f3','d2');
  move('f2','g2');
  move('d2','e4');
  move('g2','h2');
  return mess;
})

testScenario(`White move\`
     1    2    3    4    5    6    7    8  \n  _________________________________________
A | wR | bQ | wB | wQ | wK | wB | wk | wR |
  |____|____|____|____|____|____|____|____|
B | wP |    | wP | wP | wP | wP | wP | wP |
  |____|____|____|____|____|____|____|____|
C |    |    |    |    |    | wk |    |    |
  |____|____|____|____|____|____|____|____|
D |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
E |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
F |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
G | bP | bP |    | bP | bP | bP | bP | bP |
  |____|____|____|____|____|____|____|____|
H | bR | bk | bB | bQ | bK | bB | bk | bR |
  |____|____|____|____|____|____|____|____|
\``,"Black Pawn Promotion", () => {
  createGame();
  move('b2','d2');
  move('g3','e3');
  move('a2','c1');
  move('e3','d2');
  move('c1','d3');
  move('d2','c2');
  move('d3','e5');
  move('c2','b2');
  move('e5','c6');
  move('b2','a2');
  return mess;
})

testScenario("illegal move", "Rook Ally Collision", () => {
  createGame();
  move('a1','c3');
  return mess;
})

testScenario("illegal move","Rook Invalid Diagonal Movement", () => {
  createGame();
  move('b2','c2');
  move('g1','f1');
  move('a1','d4');
  return mess;
})

testScenario(`Black move\`
     1    2    3    4    5    6    7    8  \n  _________________________________________
A |    | wk | wB | wQ | wK | wB | wk | wR |
  |____|____|____|____|____|____|____|____|
B |    | wP | wP | wP | wP | wP | wP | wP |
  |____|____|____|____|____|____|____|____|
C |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
D | wP | wR |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
E | bP |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
F |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
G |    |    | bP | bP | bP | bP | bP | bP |
  |____|____|____|____|____|____|____|____|
H | bR | bk | bB | bQ | bK | bB | bk | bR |
  |____|____|____|____|____|____|____|____|
\``, "Rook Capture", () => {
  createGame();
  move('b1','d1');
  move('g1','e1');
  move('a1','c1');
  move('g2','e2');
  move('c1','c2');
  move('e2','d2');
  move('c2','d2');
  return mess;
})

testScenario("illegal move","Rook Board Boundries", () => {
  createGame();
  move('a1','a0');
  return mess;
});

testScenario("illegal move","Knight Ally Collision", () => {
  createGame();
  move('a2','b4');
  return mess;
})

testScenario(`Black move\`
     1    2    3    4    5    6    7    8  \n  _________________________________________
A | wR |    | wB | wQ | wK | wB | wk | wR |
  |____|____|____|____|____|____|____|____|
B | wP | wP | wP | wP | wP | wP | wP | wP |
  |____|____|____|____|____|____|____|____|
C |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
D |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
E |    | wk |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
F |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
G | bP |    | bP | bP | bP | bP | bP | bP |
  |____|____|____|____|____|____|____|____|
H | bR | bk | bB | bQ | bK | bB | bk | bR |
  |____|____|____|____|____|____|____|____|
\``,"Knight Capture", () => {
  createGame();
  move('a2','c3');
  move('g2','e2');
  move('c3','e2');
  return mess;
})

testScenario("illegal move","Knight Board Boundries", () => {
  createGame();
  move('a2','b0');
  return mess;
})

testScenario("illegal move","Bishop Ally Collision", () => {
  createGame();
  move('a3','c1');
  return mess;
})

testScenario(`Black move\`
     1    2    3    4    5    6    7    8  \n  _________________________________________
A | wR | wk |    | wQ | wK | wB | wk | wR |
  |____|____|____|____|____|____|____|____|
B | wP |    | wP | wP | wP | wP | wP | wP |
  |____|____|____|____|____|____|____|____|
C | wB | wP |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
D |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
E |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
F |    | bP |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
G | bP |    | bP | bP | bP | bP | bP | bP |
  |____|____|____|____|____|____|____|____|
H | bR | bk | bB | bQ | bK | bB | bk | bR |
  |____|____|____|____|____|____|____|____|
\``,"Bishop Diagonal Move", () => {
  createGame();
  move('b2','c2');
  move('g2','f2');
  move('a3','c1');
  return mess;
})

testScenario("illegal move","Bishop Invalid Movement", () => {
  createGame();
  move('b3','c3');
  move('g2','f2');
  move('a3','b3');
  return mess;
})

testScenario(`Black move\`
     1    2    3    4    5    6    7    8  \n  _________________________________________
A | wR | wk |    | wQ | wK | wB | wk | wR |
  |____|____|____|____|____|____|____|____|
B | wP |    | wP | wP | wP | wP | wP | wP |
  |____|____|____|____|____|____|____|____|
C |    | wP |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
D |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
E |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
F | bP | bP |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
G |    |    | bP | bP | wB | bP | bP | bP |
  |____|____|____|____|____|____|____|____|
H | bR | bk | bB | bQ | bK | bB | bk | bR |
  |____|____|____|____|____|____|____|____|
\``,"Bishop Capture", () => {
  createGame();
  move('b2','c2');
  move('g2','f2');
  move('a3','c1');
  move('g1','f1');
  move('c1','g5');
  return mess;
})

testScenario("illegal move", "Queen Invalid Movement", () => {
  createGame();
  move('b4','d4');
  move('g4','e4');
  move('a4','c4');
  move('g1','f2');
  move('c4','e5');
  return mess;
})

testScenario("illegal move", "Queen Ally Collision", () => {
  createGame();
  move('a4','c4');
  return mess;
})

testScenario("illegal move", "King Invalid Movement", () => {
  createGame();
  move('b5','d5');
  move('g5','e5');
  move('a5','c5');
  return mess;
})

testScenario("illegal move", "King Ally Collision", () => {
  createGame();
  move('a5','c5');
  return mess;
})

testScenario("illegal move", "King Check - Move a piece such that the king does not become unchecked", () => {
  createGame();
  move('b4','c4');
  move('g5','f5');
  move('c4','d4');
  move('h6','d2');
  move('d4','e4');
  return mess;
})

testScenario("illegal move", "King Check - Move the king such that the king does not become unchecked", () => {
  createGame();
  move('b4','c4');
  move('g5','f5');
  move('c4','d4');
  move('h6','d2');
  move('a5','b4');
  return mess;
})

testScenario(`Black move\`
     1    2    3    4    5    6    7    8  \n  _________________________________________
A | wR | wk | wB |    | wK | wB | wk | wR |
  |____|____|____|____|____|____|____|____|
B | wP | wP | wP | wQ | wP | wP | wP | wP |
  |____|____|____|____|____|____|____|____|
C |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
D |    | bB |    | wP |    |    |    |    |
  |____|____|____|____|____|____|____|____|
E |    |    |    |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
F |    |    |    |    | bP |    |    |    |
  |____|____|____|____|____|____|____|____|
G | bP | bP | bP | bP |    | bP | bP | bP |
  |____|____|____|____|____|____|____|____|
H | bR | bk | bB | bQ | bK |    | bk | bR |
  |____|____|____|____|____|____|____|____|
\``, "King Check - Move a piece such that the king does become unchecked", () => {
  createGame();
  move('b4','c4');
  move('g5','f5');
  move('c4','d4');
  move('h6','d2');
  move('a4','b4');
  return mess;
})

testScenario(`Black move\`
     1    2    3    4    5    6    7    8  \n  _________________________________________
A | wR | wk | wB | wQ |    | wB | wk | wR |
  |____|____|____|____|____|____|____|____|
B | wP | wP | wP | wP |    | wP | wP | wP |
  |____|____|____|____|____|____|____|____|
C |    |    |    | wK |    |    |    |    |
  |____|____|____|____|____|____|____|____|
D |    |    |    |    | wP |    |    |    |
  |____|____|____|____|____|____|____|____|
E |    |    | bB |    |    |    |    |    |
  |____|____|____|____|____|____|____|____|
F | bP |    |    |    | bP |    |    |    |
  |____|____|____|____|____|____|____|____|
G |    | bP | bP | bP |    | bP | bP | bP |
  |____|____|____|____|____|____|____|____|
H | bR | bk | bB | bQ | bK |    | bk | bR |
  |____|____|____|____|____|____|____|____|
\``, "King Check - Move the king such that the king does become unchecked", () => {
  createGame();
  move('b5','d5');
  move('g5','f5');
  move('a5','b5');
  move('g1','f1');
  move('b5','c5');
  move('h6','e3');
  move('c5','c4');
  return mess;
})

testScenario('illegal move', "King Check - Move the king such that the king becomes checked", () => {
  createGame();
  move('b5','d5');
  move('g5','f5');
  move('a5','b5');
  move('h6','e3');
  move('b5','c5');
  return mess;
})

testScenario('over', "King Capture", () => {
  createGame();
  move('b6','d6');
  move('g5','e5');
  move('b7','d7');
  move('h4','d8');
  return mess;
})

testScenario('over', "Test Game #1", () => {
  createGame();
  move('b5','d5');
  move('g5','e5');
  move('a7','c6');
  move('g6','f6');
  move('c6','e5');
  move('f6','e5');
  move('a4','e8');
  move('h5','g5');
  move('e8','e5');
  move('g5','g6');
  move('a6','d3');
  move('g4','e4');
  move('d3','e4');
  move('g6','f7');
  move('b8','d8');
  move('g8','e8');
  move('e4','g2');
  move('h3','g2');
  move('e5','e6');
  move('f7','f8');
  move('b4','d4');
  move('g7','e7');
  move('e6','g6');
  move('h4','g5');
  move('d8','e7');
  move('g5','e7');
  move('a8','e8');
  return mess;
})
