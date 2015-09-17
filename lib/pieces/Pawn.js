var moves = {
	maxScope: 1,
	offsets: [
		[ 1, 0 ]
	]
};

module.exports = class Pawn extends Piece {

	constructor(coord, isWhite){
		super(coord, isWhite, moves, 'Pawn', 'P', '');
	}

}