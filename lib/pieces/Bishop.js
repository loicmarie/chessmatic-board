var moves = {
	maxScope: 7,
	offsets: [
		[1, 1], [1, -1],
		[-1, 1], [-1, -1]
	]
};

module.exports = class Bishop extends Piece {

	constructor(coord, isWhite){
		super(coord, isWhite, moves, 'Bishop', 'B', 'B');
	}

}