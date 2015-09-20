"use strict";

var Piece = require('./Piece.js');

var moves = {
	maxScope: 1,
	offsets: {
		move: [
			[1, 1], [1, 0], [1, -1],
			[0, 1], [0, 0], [0, -1],
			[-1, 1], [-1, 0], [-1, -1]
		]
	}
};

module.exports = class King extends Piece {

	constructor(isWhite){
		super(isWhite, moves, 'King', 'K', 'K');
	}

}