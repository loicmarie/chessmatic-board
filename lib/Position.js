let Rook = require('./pieces/Rook.js'),
	Bishop = require('./pieces/Bishop.js'),
	Knight = require('./pieces/Knight.js'),
	Pawn = require('./pieces/Pawn.js'),
	Queen = require('./pieces/Queen.js'),
	King = require('./pieces/King.js');

let capturedPieces = [];

function charToNumber(character){
	return (character.charCodeAt(0) - 97);
}

function parseMove(move){
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
			return {
				piece: (firstChar == firstChar.toUpperCase()) ? firstChar : 'P',
				row: 8 - parseInt(row),
				column: charToNumber(column),
				which: which
			}
	}
}

module.exports = class Position {
	
	constructor(){
		this._board = [
			[new Rook(false), new Knight(false), new Bishop(false), new Queen(false), new King(false), new Bishop(false), new Knight(false), new Rook(false)],
			[new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false)],
			[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
			[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
			[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
			[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
			[new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true)],
			[new Rook(true), new Knight(true), new Bishop(true), new Queen(true), new King(true), new Bishop(true), new Knight(true), new Rook(true)]
		];

		this._isCheck = false;
		this._isCheckmate = false;
		this._isDraw = false;
		this._isWhiteToPlay = true;
		this._hasKingMoved = {
			white: false,
			black: false
		};
	}

	get board(){
		return this._board;
	}
	get isWhiteToPlay(){
		return this._isWhiteToPlay;
	}
	set isWhiteToPlay(isWhiteToPlay){
		this._isWhiteToPlay = isWhiteToPlay;
	}
	get hasWhiteKingMoved(){
		return this._hasKingMoved.white;
	}
	get hasBlackKingMoved(){
		return this._hasKingMoved.black;
	}

	isCastle(white, kingside){
		return ((kingside) ? 
			((white)
				? (this.hasWhiteKingMoved && !(this.get(1, 0) || this.get(2, 0)))
				: (this.hasBlackKingMoved && !(this.get(1, 7) || this.get(2, 7)))
			) : ((white)
				? (this.hasWhiteKingMoved && !(this.get(4, 0) || this.get(5, 0)))
				: (this.hasBlackKingMoved && !(this.get(4, 7) || this.get(5, 7)))
			));
	}

	play(move){
		move = parseMove(move);
		console.log(move);
		if(move.rook){
			this.castle(move.rook);
		} else {
			let from = this.getOrigin(move);//console.log(from)
			if(this.board[from.row][from.column]){
				capturedPieces.push(this.board[from.row][from.column]);
			}
			this.move(from.column, from.row, move.column, move.row);
		}
		this.isWhiteToPlay = !this.isWhiteToPlay;
	}

	move(x1, y1, x2, y2){
		this.board[y1][x1].move({x: x2, y: y2});
		this.board[y2][x2] = this.board[y1][x1];
		this.board[y1][x1] = undefined;
		
	}

	castle(rook){
		let kingside = (rook == 'O-O'),
			white = this.isWhiteToPlay;
		if(this.isCastle(white, kingside)){
			let y = (white) ? 0 : 7,
				rook = this.get((kingside) ? 0 : 7, y),
				king = this.get(3, y);
			rook.move((kingside) ? 2 : 4, y);
			king.move((kingside) ? 1 : 5, y);
		} else {
			throw new Error('Invalid move: castle not allowed');
		}
	}

	get(x, y){
		return this.board[y][x];
	}

	getOrigin(move){
		for(var i=0; i<this.board.length; i++){
			for(var j=0; j<this.board[i].length; j++){
				if(this.board[i][j]
					&& this.board[i][j].id == move.piece.toUpperCase() 
					&& this.board[i][j].canMoveTo(this, {column: j, row: i}, move)
					&& (move.which == '' || 
						(i == move.which - 1
						|| j == charToNumber(move.which)))
					){
					return {
						column: j,
						row: i
					};
				}
			}
		}
		throw new Error('Invalid move: There is no piece to move');
	}

};