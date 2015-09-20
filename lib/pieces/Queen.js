var Piece = require('./Piece.js');

var moves = {
	maxScope: 7,
	offsets: {
		move: [
			[1, 1], [1, 0], [1, -1],
			[0, 1], [0, 0], [0, -1],
			[-1, 1], [-1, 0], [-1, -1]
		]
	}
};

module.exports = class Queen extends Piece {

	constructor(isWhite){
		super(isWhite, moves, 'Queen', 'Q', 'Q');
	}

}