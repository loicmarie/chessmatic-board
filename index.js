module.exports = {
	run: function(){
		var Chessboard = require('./lib/Chessboard.js'),
			chessboard = new Chessboard();

		console.log(chessboard.show());
		chessboard.play('Nf3');
		console.log(chessboard.show());
		chessboard.play('d6');
		console.log(chessboard.show());
		chessboard.play('Nc3');
		console.log(chessboard.show());
		chessboard.play('e5');
		console.log(chessboard.show());
		chessboard.play('d4');
		console.log(chessboard.show());
		chessboard.play('exd4');
		console.log(chessboard.show());
		chessboard.play('Nxd4');
		console.log(chessboard.show());
	}
}