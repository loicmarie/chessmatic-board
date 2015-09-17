var moves = {
	maxScope: 1,
	offsets: [
		[-2, -1], [-2, 1],
		[-1, -2], [-1, 2],
		[1, -2], [1, 2],
		[2, -1], [2, 1]
	]
};

module.exports = class Knight extends Piece {

	constructor(coord, isWhite){
		super(coord, isWhite, moves, 'Knight', 'N', 'N');
	}

}