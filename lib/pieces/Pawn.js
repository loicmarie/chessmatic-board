"use strict";

var Piece = require('./Piece.js');

var moves = {
	maxScope: 1,
	offsets: {
		move: [
			[ 1, 0 ]
		],
		attack: [
			[ 1, 1 ],
			[ 1, -1 ]
		]
	}
};

module.exports = class Pawn extends Piece {

	constructor(isWhite){
		super(isWhite, moves, 'Pawn', 'P', '');
		this._isOnSecondRow = true;
	}

	get moves(){
		super.moves.maxScope = (this.isOnSecondRow) ? 2 : 1;
		if(super.isWhite){
			for(let j in super.moves.offsets){
				for(let i=0; i<super.moves.offsets[j].length; i++){
					super.moves.offsets[j][i][0] *= (super.moves.offsets[j][i][0] > 0) ? -1 : 1;
				}
			}
		} else {
			for(let j in super.moves.offsets){
				for(let i=0; i<super.moves.offsets[j].length; i++){
					super.moves.offsets[j][i][0] *= (super.moves.offsets[j][i][0] > 0) ? 1 : -1;
				}
			}
		}
		return super.moves;
	}
	get isOnSecondRow(){
		return this._isOnSecondRow;
	}
	set isOnSecondRow(isOnSecondRow){
		this._isOnSecondRow = isOnSecondRow;
	}

	move(coord){
		super.move(coord);
		this.isOnSecondRow = false;
	}

}