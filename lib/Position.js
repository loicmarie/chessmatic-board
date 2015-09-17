function charToNumber(character){
	return 7 - (character.charCodeAt(0) - 97);
}

function parseMove(){
	switch(move){
		case 'O-O': 
		case 'O-O-O':
			return { rook: move };
		default:
			if(move.indexOf('x') > -1){
				move = move.replace(/x/g, '');
			}
			let row = move.substring(move.length-1, move.length),
				column = move.substring(move.length-2, move.length-1),
				firstChar = move.substring(0, 1),
				which = move.replace(firstChar, '').replace(row, '').replace(column, '');
				console.log('--> '+row);
				console.log('--> '+column);
				console.log('--> '+which);
			return {
				piece: (firstChar == firstChar.toUpperCase()) ? firstChar : 'P',
				row: parseInt(row)-1,
				column: charToNumber(column),
				which: which
			}
	}
}

module.exports = class Position {
	
	constructor(){

		this._pieces = [
			new Rook({y: 0, x: 0}, true), new Rook({y: 0, x: 7}, true),
			new Knight({y: 0, x: 1}, true), new Knight({y: 0, x: 6}, true),
			new Bishop({y: 0, x: 2}, true), new Bishop({y: 0, x: 5}, true),
			new Queen({y: 0, x: 3}, true), new King({y: 0, x: 4}, true),
			new Pawn({y: 1, x: 3}, true), new Pawn({y: 1, x: 3}, true), new Pawn({y: 1, x: 3}, true), new Pawn({y: 1, x: 3}, true), 
			new Pawn({y: 1, x: 3}, true), new Pawn({y: 1, x: 3}, true), new Pawn({y: 1, x: 3}, true), new Pawn({y: 1, x: 3}, true), 

			new Rook({y: 7, x: 0}, false), new Rook({y: 7, x: 7}, false),
			new Knight({y: 7, x: 1}, false), new Knight({y: 7, x: 6}, false),
			new Bishop({y: 7, x: 2}, false), new Bishop({y: 7, x: 5}, false),
			new Queen({y: 7, x: 3}, false), new King({y: 7, x: 4}, false),
			new Pawn({y: 6, x: 3}, false), new Pawn({y: 6, x: 3}, false), new Pawn({y: 6, x: 3}, false), new Pawn({y: 6, x: 3}, false), 
			new Pawn({y: 6, x: 3}, false), new Pawn({y: 6, x: 3}, false), new Pawn({y: 6, x: 3}, false), new Pawn({y: 6, x: 3}, false), 
		];

		this._isWhiteToPlay = true;

		this._rooks = {
			K: true,
			Q: true, 
			k: true,
			q: true
		};
	}

	get pieces(){
		return this._pieces;
	}
	get isWhiteToPlay(){
		return this._isWhiteToPlay;
	}
	get isWhiteKingsideCastle(){
		return this._rooks.K;
	}
	get isBlackKingsideCastle(){
		return this._rooks.k;
	}
	get isWhiteQueensideCastle(){
		return this._rooks.Q;
	}
	get isBlackQueensideCastle(){
		return this._rooks.q;
	}

	play(move){

		let move = parseMove(move);

		if(move.rook){

			this.castle(move.rook);

		} else {

			let origin = this.getOrigin(move);
			this.move(origin.column, origin.row, move.column, move.row);

		}
	}

	castle(rook){

		if(rook == 'O-O'){
			if(this.isWhiteToPlay){
				if(this.isWhiteKingsideCastle){
					this.kingsideCastle(true);
				} else {
					throw new Error('Invalid move: castle not allowed');
				}
			} else {
				if(this.isBlackKingsideCastle){
					this.kingsideCastle(false);
				} else {
					throw new Error('Invalid move: castle not allowed');
				}
			}
		} else if(rook == 'O-O-O') {
			if(this.isWhiteToPlay){
				if(this.isWhiteQueensideCastle){
					this.queensideCastle(true);
				} else {
					throw new Error('Invalid move: castle not allowed');
				}
			} else {
				if(this.isBlackQueensideCastle){
					this.queensideCastle(false);
				} else {
					throw new Error('Invalid move: castle not allowed');
				}
			}
		}
	}

	kingsideCastle(white){
		let y = (white) ? 0 : 7;
			rook = this.get(0, y),
			king = this.get(3, y);
		rook.move(2, y);
		king.move(1, y);
	}

	queensideCastle(white){
		let y = (white) ? 0 : 7;
			rook = this.get(7, y),
			king = this.get(3, y);
		rook.move(4, y);
		king.move(5, y);
	}

	isKingsideCastle(white){	
		return (white)
			? (this.rooks.K && !(this.get(1, 0) || this.get(2, 0)))
			: (this.rooks.k && !(this.get(1, 7) || this.get(2, 7)));
	}

	isQueensideCastle(white){	
		return (white)
			? (this.rooks.Q && !(this.get(4, 0) || this.get(5, 0)))
			: (this.rooks.q && !(this.get(4, 7) || this.get(5, 7)));
	}

	get(x, y){
		for(let i=0; i<this.pieces.length; i++){
			if(this.pieces[i].coord.x == x && this.pieces[i].coord.y == y){
				return this.pieces[i];
			}
		}
		return false;
	}

};