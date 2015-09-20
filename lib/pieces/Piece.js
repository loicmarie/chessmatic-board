"use strict";

module.exports = class Piece {

	constructor(isWhite, moves, name, id, letter){
		this._isWhite = isWhite;
		this._moves = moves;
		this._name = name;
		this._id = id;
		this._letter = letter;
		this._coord = {
			x: 0,
			y: 0
		}
	}

	get isWhite(){
		return this._isWhite;
	}
	get moves(){
		return this._moves;
	}
	get name(){
		return this._name;
	}
	get id(){
		return this._id;
	}
	get letter(){
		return this._letter;
	}
	get coord(){
		return this._coord;
	}
	set coord(coord){
		this._coord = coord;
	}

	canMoveTo(position, from, to){

		let isValidMove = false,
			pieceFrom = position.board[from.row][from.column], 
			pieceTo = position.board[to.row][to.column], 
			offsets = this.moves.offsets,
			maxScope = this.moves.maxScope;

		if(position.isWhiteToPlay != this.isWhite){
			return false;
		} else if(pieceTo && pieceFrom.isWhite == pieceTo.isWhite){
			return false;
		}

		if(!offsets.attack){
			for(let k=0; k<offsets.move.length; k++){
				let hasVisibility = true, 
					i=1;
				while(i<=maxScope && hasVisibility && this.isOnBoardAfterMove(from, offsets.move[k][0]*i, offsets.move[k][1]*i)){
					if(from.row+(offsets.move[k][0]*i) == to.row && from.column+(offsets.move[k][1]*i) == to.column){
						isValidMove = true;
					} else if(position.board[from.row+(offsets.move[k][0]*i)][from.column+(offsets.move[k][1]*i)]){
						hasVisibility = false;
					}
					i++;
				}
			}
		} else {
			if(pieceTo){
				for(let k=0; k<offsets.attack.length; k++){
					let hasVisibility = true, 
						i=1;
					while(i<=maxScope && hasVisibility && this.isOnBoardAfterMove(from, offsets.attack[k][0]*i, offsets.attack[k][1]*i)){
						if(from.row+(offsets.attack[k][0]*i) == to.row && from.column+(offsets.attack[k][1]*i) == to.column){
							isValidMove = true;
						} else if(position.board[from.row+(offsets.attack[k][0]*i)][from.column+(offsets.attack[k][1]*i)]){
							hasVisibility = false;
						}
						i++;
					}
				}
			} else {
				for(let k=0; k<offsets.move.length; k++){
					let hasVisibility = true, 
						i=1;
					while(i<=maxScope && hasVisibility && this.isOnBoardAfterMove(from, offsets.move[k][0]*i, offsets.move[k][1]*i)){
						if(from.row+(offsets.move[k][0]*i) == to.row && from.column+(offsets.move[k][1]*i) == to.column){
							isValidMove = true;
						} else if(position.board[from.row+(offsets.move[k][0]*i)][from.column+(offsets.move[k][1]*i)]){
							hasVisibility = false;
						}
						i++;
					}
				}
			}
		}
		return isValidMove;
	}

	move(x, y){
		this.coord = {x, y};
	}

	isOnBoardAfterMove(from, drow, dcolumn){
		return from.row + drow <= 7
			&& from.row + drow >= 0
			&& from.column + dcolumn <= 7
			&& from.column + dcolumn >= 0;
	};

};
	// switch(char){
	// 	case 'R':
	// 		this.piece = new Rook('w');
	// 		break;
	// 	case 'r':
	// 		this.piece = new Rook('b');
	// 		break;
	// 	case 'N':
	// 		this.piece = new Knight('w');
	// 		break;
	// 	case 'n':
	// 		this.piece = new Knight('b');
	// 		break;
	// 	case 'B':
	// 		this.piece = new Bishop('w');
	// 		break;
	// 	case 'b':
	// 		this.piece = new Bishop('b');
	// 		break;
	// 	case 'Q':
	// 		this.piece = new Queen('w');
	// 		break;
	// 	case 'q':
	// 		this.piece = new Queen('b');
	// 		break;
	// 	case 'K':
	// 		this.piece = new King('w');
	// 		break;
	// 	case 'k':
	// 		this.piece = new King('b');
	// 		break;
	// 	case 'P':
	// 		this.piece = new Pawn('w');
	// 		break;
	// 	case 'p':
	// 		this.piece = new Pawn('b');
	// 		break;
	// }
	// this.pos = pos;


// Piece.prototype.isValidMove = function(states, dest){

// 	var isValidMove = false,
// 		current_state = states[states.length-1],
// 		offsets = this.piece.getOffsets(this, states),
// 		cell = current_state.position[dest.row][dest.column];
		
// 	if(cell && cell.piece.color == this.piece.color){
// 		return false;
// 	} else if(current_state.player != this.piece.color){
// 		return false;
// 	}

// 	for(var off=0; off<offsets.length; off++){
// 		var hasVisibility = true, 
// 			i=1;
// 		while(i<=this.piece.maxScope && hasVisibility && this.isOnBoardAfterMove(offsets[off][0]*i, offsets[off][1]*i)){
// 			if(this.pos.row+(offsets[off][0]*i) == dest.row && this.pos.column+(offsets[off][1]*i) == dest.column){
// 				isValidMove = true;
// 			} else if(current_state.position[this.pos.row+(offsets[off][0]*i)][this.pos.column+(offsets[off][1]*i)]){
// 				hasVisibility = false;
// 			}
// 			i++;
// 		}
// 	}
// 	return isValidMove;
// }



// module.exports = Piece;