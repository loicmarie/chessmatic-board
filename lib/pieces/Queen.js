var moves = {
	maxScope: 7,
	offsets: [
		[1, 1], [1, 0], [1, -1],
		[0, 1], [0, 0], [0, -1],
		[-1, 1], [-1, 0], [-1, -1]
	]
};

module.exports = class Queen extends Piece {

	constructor(coord, isWhite){
		super(coord, isWhite, moves, 'Queen', 'Q', 'Q');
	}

}