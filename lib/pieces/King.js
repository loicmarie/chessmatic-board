var moves = {
	maxScope: 1,
	offsets: [
		[1, 1], [1, 0], [1, -1],
		[0, 1], [0, 0], [0, -1],
		[-1, 1], [-1, 0], [-1, -1]
	]
};

module.exports = class King extends Piece {

	constructor(coord, isWhite){
		super(coord, isWhite, moves, 'King', 'K', 'K');
	}

}