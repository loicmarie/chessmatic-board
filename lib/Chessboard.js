"use strict";

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

	show(){
		var board = this.position.board,
			str = "";
		for(var i=0; i<board.length; i++){
			for(var j=0; j<board[i].length; j++){
				str += (board[i][j]) 
					? " "+((board[i][j].isWhite)
						? board[i][j].id.toUpperCase()
						: board[i][j].id.toLowerCase())+" "
					: " . ";
			}
			str += "\n";
		}
		return str;
	}

};

