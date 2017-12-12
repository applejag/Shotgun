
class Round {

	constructor() {
		this.player = new Player('player');
		this.computer = new AIPlayer('computer');

		$('#buttonStart').click(this.onButtonStart.bind(this));
		$('#buttonReplay').click(this.onButtonReplay.bind(this));
		$('#buttonDodge').click(this.onActionCallback.bind(this, 'dodge'));
		$('#buttonShoot').click(this.onActionCallback.bind(this, 'shoot'));
		$('#buttonShotgun').click(this.onActionCallback.bind(this, 'shotgun'));
		$('#buttonReload').click(this.onActionCallback.bind(this, 'reload'));
	}

	spawnPlayers() {
		if (this.player.dead || this.computer.dead)
			setTimeout(this.showActions.bind(this), 4000);
		else
			this.showActions();

		if (this.player.dead) this.player.spawn();
		if (this.computer.dead) this.computer.spawn();
	}

	showActions() {
		$('#buttonActions').show();

		let shotgun = this.player.ammo === 3;
		let noShoot = this.player.ammo === 0;

		$('#buttonShoot').toggle(!shotgun).attr('disabled', noShoot);
		$('#buttonReload').attr('disabled', shotgun);
		$('#buttonShotgun').toggle(shotgun);
	}

	hideActions() {
		$('#buttonActions').hide();
	}

	evaluateRound() {
		this.computer.evaluateAction(this.player);
		this.player.evaluateAction(this.computer);

		setTimeout(this.evaluateDeaths.bind(this), 2000);
	}

	evaluateDeaths() {
		if (this.player.dead) {
			if (this.computer.dead)
				this.showWinner(null);
			else
				this.showWinner(this.computer);
		} else if (this.computer.dead)
			this.showWinner(this.player);
		else
			this.showActions();
	}

	showWinner(winner) {
		if (!winner) {
			this.setGameOverText('DRAW');
			return;
		}
		let name = winner === this.player ? 'PLAYER' : 'COMPUTER';

		if (winner.action === 'shotgun') this.setGameOverText(`SHOTGUN!<br>${name} WINS`);
		else this.setGameOverText(`${name} WINS`);

		winner.won();
	}

	setGameOverText(text) {
		$('#buttonReplay').hide();
		$('#gameOverBox').fadeIn();
		$('#gameOverText').html(text);

		setTimeout(() => $('#buttonReplay').show(), 1000);
	}

	setWinStreakText() {
		// its never 0
		if (this.streak > 0) {
			$('#winStreakText').show().text('+' + this.streak);
			$('#loseStreakText').fadeOut();
		} else {
			$('#loseStreakText').show().text(this.streak);
			$('#winStreakText').fadeOut();
		}
	}

	/* Button callbacks */
	onButtonStart() {
		$('#buttonStart').hide();
		this.spawnPlayers();
	}

	onButtonReplay() {
		$('#buttonReplay').hide();
		$('#gameOverBox').fadeOut();
		this.spawnPlayers();
	}
	
	onActionCallback(action) {
		this.hideActions();
		this.player.action = action;
		this.evaluateRound();
	}
}