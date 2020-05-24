import { Piece } from './Piece';
import { Tile } from './Tile';
import { Player } from './Player';
import { Board } from './Board';

export class Knight extends Piece {

    /**
     * @param {Tile} tile this this.tile of the piece.
     * @param {boolean} captured the captured status of the peice.
     * @param {boolean} isWhite is the piece white or black.
     * @param {boolean} hasMoves has the piece moved or not.
    */
    constructor (tile: Tile, captured: boolean = false, isWhite: boolean = false, hasMoved: boolean = false) {
        super(tile, captured, isWhite, hasMoved)
    }

    /**
     * Generate an array of moves for a Knight.
     * @abstract
     * @param {Player} currentPlayer The player who's legal moves this function will return.
     * @param {Player} enemyPlayer this player is required to calculate legal moves for the currentPlayer
     * @param {Board} board the board that the two players exist in.
     * @return {Array} returns an array of legal moves.
     */
    public generateMoves (currentPlayer: Player, enemyPlayer: Player, board: Board): Array<Tile> {

        var moves: Array<Tile> = new Array<Tile>();

        var tempTile = new Tile(this.tile.x + 1, this.tile.y + 2);
        if((enemyPlayer.piecePresent(tempTile) || !currentPlayer.piecePresent(tempTile)) && board.inBoard(tempTile)){
            moves.push(tempTile);
        }

        tempTile = new Tile(this.tile.x + 2, this.tile.y + 1);
        if((enemyPlayer.piecePresent(tempTile) || !currentPlayer.piecePresent(tempTile)) && board.inBoard(tempTile)){
            moves.push(tempTile);
        }
        
        tempTile = new Tile(this.tile.x - 2, this.tile.y + 1);
        if((enemyPlayer.piecePresent(tempTile) || !currentPlayer.piecePresent(tempTile)) && board.inBoard(tempTile)){
            moves.push(tempTile);
        }

        tempTile = new Tile(this.tile.x - 1, this.tile.y + 2);
        if((enemyPlayer.piecePresent(tempTile) || !currentPlayer.piecePresent(tempTile)) && board.inBoard(tempTile)){
            moves.push(tempTile);
        }

        tempTile = new Tile(this.tile.x - 1, this.tile.y - 2);
        if((enemyPlayer.piecePresent(tempTile) || !currentPlayer.piecePresent(tempTile)) && board.inBoard(tempTile)){
            moves.push(tempTile);
        }

        tempTile = new Tile(this.tile.x - 2, this.tile.y - 1 );
        if((enemyPlayer.piecePresent(tempTile) || !currentPlayer.piecePresent(tempTile)) && board.inBoard(tempTile)){
            moves.push(tempTile);
        }

        tempTile = new Tile(this.tile.x + 1, this.tile.y - 2);
        if((enemyPlayer.piecePresent(tempTile) || !currentPlayer.piecePresent(tempTile)) && board.inBoard(tempTile)){
            moves.push(tempTile);
        }

        tempTile = new Tile(this.tile.x + 2, this.tile.y - 1);
        if((enemyPlayer.piecePresent(tempTile) || !currentPlayer.piecePresent(tempTile)) && board.inBoard(tempTile)){
            moves.push(tempTile);
        }
        
        return moves;
    }

    static fromKnight(knight: Knight) {
        return new this(
            Tile.fromTile(knight.tile),
            knight.captured,
            knight.isWhite,
            knight.hasMoved
        );
    }
}