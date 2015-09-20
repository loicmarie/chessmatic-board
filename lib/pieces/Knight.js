var Piece = require('./Piece.js');

var moves = {
	maxScope: 1,
	offsets: {
		move: [
			[-2, -1], [-2, 1],
			[-1, -2], [-1, 2],
			[1, -2], [1, 2],
			[2, -1], [2, 1]
		]
	}
};

module.exports = class Knight extends Piece {

	constructor(isWhite){
		super(isWhite, moves, 'Knight', 'N', 'N');
	}

}