import { Tile } from './Tile';
import { King } from './King';
import { Queen } from './Queen';
import { Board } from './Board';
import { Rook } from './Rook';
import { Bishop } from './Bishop';
import { Knight } from './Knight';
import { Pawn } from './Pawn';

export class Player {
    public isWhite: boolean;
    public rooks: Array<Rook>;
    public king: King;
    public queen: Queen;
    public bishops: Array<Bishop>;
    public knights: Array<Knight>;
    public ct: number = 0;
    public playerName: string;

    public pawns: Array<Pawn>;

    // Piece type for promotion
    public promotions: Array<any>;

    /**
     * @param {Boolean} isWhite determines if the player is white or black.
     * @param {String} playerName the name of the player.
     */
    constructor (isWhite: boolean = false, playerName: string = "no_name") {
        this.playerName = playerName;
        this.rooks = new Array<Rook>();
        this.pawns = new Array<Pawn>();
        this.knights = new Array<Knight>();
        this.bishops = new Array<Bishop>();
        this.isWhite = isWhite;
        this.promotions = new Array<any>();
        if (isWhite) {
            this.rooks.push(new Rook(new Tile(1, 1), false, true));
            this.rooks.push(new Rook(new Tile(8, 1), false, true));
            for (let i = 1; i <= 8; i++) {
                this.pawns.push(new Pawn(new Tile(i, 2), false, true));
            }
            this.queen = new Queen(new Tile(4, 1), false, true);
            this.bishops.push(new Bishop(new Tile(3, 1), false, true));
            this.bishops.push(new Bishop(new Tile(6, 1), false, true));
            this.king = new King(new Tile(5, 1), false, true)
            this.knights.push(new Knight(new Tile(2, 1), false, true));
            this.knights.push(new Knight(new Tile(7, 1), false, true));

        } else {
            this.rooks.push(new Rook(new Tile(1, 8)));
            this.rooks.push(new Rook(new Tile(8, 8)));
            for (let i = 1; i <= 8; i++) {
                this.pawns.push(new Pawn(new Tile(i, 7)));
            }
            this.queen = new Queen(new Tile(4, 8));
            this.bishops.push(new Bishop(new Tile(3, 8)));
            this.bishops.push(new Bishop(new Tile(6, 8)));
            this.king = new King(new Tile(5, 8))
            this.knights.push(new Knight(new Tile(2, 8)));
            this.knights.push(new Knight(new Tile(7, 8)));

        }
    }

    /**
     * Static method in turn of copy constructor.
     * @param {Player} player the peice to make a copy of.
     */
    static fromPlayer(player: Player): Player {
        var isWhite: boolean = player.isWhite;
        var playerName: string = player.playerName;

        var rooks: Array<Rook> = new Array<Rook>();
        for (let rook of player.rooks) {
            rooks.push(Rook.fromRook(rook));
        }

        var promotions = [];
        for (let piece of player.promotions) {
            if (piece instanceof Pawn){
                promotions.push(Pawn.fromPawn(piece));
            } else if (piece instanceof Rook) {
                promotions.push(Rook.fromRook(piece));
            } else if (piece instanceof Bishop) {
                promotions.push(Bishop.fromBishop(piece));
            } else if (piece instanceof Knight) {
                promotions.push(Knight.fromKnight(piece));
            } else if (piece instanceof Queen) {
                promotions.push(Queen.fromQueen(piece));
            }
        }

        var king: King = King.fromKing(player.king);
        var queen: Queen = Queen.fromQueen(player.queen);

        var bishops: Array<Bishop> = new Array<Bishop>();
        for (let bishop of player.bishops) {
            bishops.push(Bishop.fromBishop(bishop));
        }

        var knights: Array<Knight> = new Array<Knight>();
        for (let knight of player.knights) {
            knights.push(Knight.fromKnight(knight));
        }

        var pawns: Array<Pawn> = new Array<Pawn>();
        for (let pawn of player.pawns) {
            pawns.push(Pawn.fromPawn(<Pawn> pawn));
        }

        var ct: number = player.ct;

        var newPlayer = new this(
            isWhite, 
            playerName);

        var playerExtra = {
            rooks: rooks,
            king: king,
            queen: queen,
            bishops: bishops,
            knights: knights,
            pawns: pawns,
            ct: ct,
            promotions: promotions,
        };

        return <Player> (<any>Object).assign(newPlayer, playerExtra);
    }
    

    /**
     * Move a piece from one tile to another.
     * @param {Tile} currentTile the tile where the piece is at.
     * @param {Tile} newTile the tile where the pieuce is being moved to.
     * @param {Player} enemyPlayer the enemy player.
     * @param {Board} board the board the peice is playing on.
     * @returns {boolean} returns true if a piece was moved, returns false if the piece couldn't move
     */
    public movePiece(currentTile: Tile, newTile: Tile, enemyPlayer: Player, board: Board): boolean {
        let piece = this.getPieceByTile(currentTile);
        if (piece == null) return false;

        if(piece.isLegalMove(currentTile, newTile, this, enemyPlayer, board)){
            let oldTile = piece.tile;

            piece.tile = newTile;
            piece.hasMoved = true;
            
            if(piece instanceof Pawn && Math.abs(newTile.y - oldTile.y) == 2){
                piece.enPassantEligable = true;
            }

            // disgusting ugly enPassant logic, I hate it... but it works. I'm sorry :(
            if(enemyPlayer.piecePresent(newTile)){
                enemyPlayer.getPieceByTile(newTile).captured = true;
                this.ct = 0;
            } else if (piece instanceof Pawn && Math.abs(newTile.x - oldTile.x) == 1) { 
                if (this.isWhite) {
                    let enPassantTile = new Tile(newTile.x, newTile.y - 1);
                    if(enemyPlayer.piecePresent(enPassantTile)) {
                        let enPassantPiece = enemyPlayer.getPieceByTile(enPassantTile);
                        if (enPassantPiece instanceof Pawn) {
                            enPassantPiece.captured = true;
                            this.ct = 0;
                        } else {
                            this.ct++;
                        }
                    } else {
                        this.ct++;
                    }
                } else {
                    let enPassantTile = new Tile(newTile.x, newTile.y + 1);
                    if(enemyPlayer.piecePresent(enPassantTile)) {
                        let enPassantPiece = enemyPlayer.getPieceByTile(enPassantTile);
                        if (enPassantPiece instanceof Pawn) {
                            enPassantPiece.captured = true;
                            this.ct = 0;
                        } else {
                            this.ct++;
                        }
                    } else {
                        this.ct++;
                    }
                }
            } else {
                this.ct++;
            }
            this.removeEnpassant(enemyPlayer);
            return true;

        } else {
            return false;
        }
    }

    /**
     * @param {Player} player 
     */
    public removeEnpassant(player: Player): void{
        for(let pawn of player.pawns){
        pawn.enPassantEligable = false;
        }
    }

    /**
     * Find the peice at a current tile location
     * @param {Tile} tile the tile where the piece is being moved to.
     * @returns {Piece}
     */
    public piecePresent (tile: Tile): boolean {
        return this.getPieceByTile(tile) != null;
    }

    /**
     * Find the peice at a current tile location
     * @param {Tile} tile the tile where the piece is being moved to.
     * @returns {boolean}
     */
    public getPieceByTile (tile: Tile): Pawn | Rook | King | Queen | Bishop | Knight {
        // loop through each rook
        for(let i = 0; i < this.rooks.length; i++){

            // if the rook is found at given tile, and it's not captured return the piece
            if(this.rooks[i].tile.equals(tile) && !this.rooks[i].captured){
                return this.rooks[i];
            }
        }
        
        // loop through each pawn
        for(let i = 0; i < this.pawns.length; i++){

            // if the pawn is found at given tile, and it's not captured return the piece
            if(this.pawns[i].tile.equals(tile) && !this.pawns[i].captured){
                return this.pawns[i];
            }
        }
        // loop through each bishop
        for(let i = 0; i < this.bishops.length; i++){

            // if the bishop is found at given tile, and it's not captured return the bishop
            if(this.bishops[i].tile.equals(tile) && !this.bishops[i].captured){
                return this.bishops[i];
            }
        }

        // loop through each knight
        for(let i = 0; i < this.knights.length; i++){
            // if the knight is found at given tile, and it's not captured return the piece
            if(this.knights[i].tile.equals(tile) && !this.knights[i].captured){
                return this.knights[i];
            }
        }

        // if the queen is found at the current tile and it isn't captured return the queen.
        if(this.queen.tile.equals(tile) && !this.queen.captured){
            return this.queen;
        }

        // if the queen is found at the current tile and it isn't captured return the queen.
        if(this.king.tile.equals(tile) && !this.king.captured){
            return this.king;
        }

        // loop through each promotion
        for(let i = 0; i < this.promotions.length; i++){
            if(this.promotions[i].tile.equals(tile) && !this.promotions[i].captured){
                return this.promotions[i];
            }
        }

        // return null if there is not a piece found at the current location
        return null;
    }

}