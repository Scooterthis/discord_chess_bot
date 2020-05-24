import { Tile } from './Tile';
import { Piece } from './Piece';
import { Direction } from './Direction';
import { Player } from './Player';
import { Board } from './Board';

export class Rook extends Piece {

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
    * @param {Player} currentPlayer The player who's legal moves this function will return.
    * @param {Player} enemyPlayer this player is required to calculate legal moves for the currentPlayer
    * @param {Board} board the board that the two players exist in.
    * @return {Array<Tile>} returns an array of legal moves.
    */
    public generateMoves (currentPlayer: Player, enemyPlayer: Player, board: Board): Array<Tile> {

        let right: Array<Tile> = this.genMovesLin(Direction.Right, currentPlayer, enemyPlayer, board);
        let left: Array<Tile> = this.genMovesLin(Direction.Left, currentPlayer, enemyPlayer, board);
        let up: Array<Tile> = this.genMovesLin(Direction.Up, currentPlayer, enemyPlayer, board);
        let down: Array<Tile> = this.genMovesLin(Direction.Down, currentPlayer, enemyPlayer, board);

        return right.concat(left, up, down);
    }

    static fromRook(rook: Rook) {
        return new this(
            Tile.fromTile(rook.tile),
            rook.captured,
            rook.isWhite,
            rook.hasMoved
        );
    }
}