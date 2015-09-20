var Piece = require('./Piece.js');

var moves = {
	maxScope: 7,
	offsets: [
		[1, 1], [1, -1],
		[-1, 1], [-1, -1]
	]
};

module.exports = class Bishop extends Piece {

	constructor(isWhite){
		super(isWhite, moves, 'Bishop', 'B', 'B');
	}

}