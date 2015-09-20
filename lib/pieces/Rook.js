"use strict";

var Piece = require('./Piece.js');

var moves = {
	maxScope: 7,
	offsets: {
		move: [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1]
		]
	}
};

module.exports = class Rook extends Piece {

	constructor(isWhite){
		super(isWhite, moves, 'Rook', 'R', 'R');
	}

}