var Rook = require('../pieces/Rook.js'),
	Knight = require('../pieces/Knight.js'),
	Bishop = require('../pieces/Bishop.js'),
	Queen = require('../pieces/Queen.js'),
	King = require('../pieces/King.js'),
	Pawn = require('../pieces/Pawn.js');

module.exports = {
	position: [
		[new Rook({x: 0, y: 0}, true), "N", "B", "K", "Q", "B", "N", "R"],
		["P", "P", "P", "P", "P", "P", "P","P"],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["p", "p", "p", "p", "p", "p", "p", "p"],
		["r", "n", "b", "k", "q", "b", "n", "r"]
	],
	isWhiteToPlay: true,
	rooks: {
		K: true,
		Q: true, 
		k: true,
		q: true
	}
};