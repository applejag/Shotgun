
class Game {

	constructor() {
		this.playerLeft = new Player('player');
		this.playerRight = new Player('computer');
	}

	evaluateRound() {
		this.playerLeft.evaluateAction(this.playerRight);
		this.playerRight.evaluateAction(this.playerLeft);
	}

	setGameOverText(text) {
		$('#gameOverText').text(text);
	}

}