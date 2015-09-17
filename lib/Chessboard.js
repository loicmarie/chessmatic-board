var Position = require('./Position.js');

module.exports = class Chessboard {

	constructor(){
		this.position = new Position();
	}

	play(move){
		this.position.play(move);
	}

	isMoveAllowed(){

	}

};