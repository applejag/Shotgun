
class Round {

	constructor() {
		this.player = new Player('player');
		this.computer = new AIPlayer('computer');
		this.streak = 0;

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
				this.setGameOverText('DRAW');
			else {
				this.setGameOverText('COMPUTER WINS');
				this.streak = Math.min(this.streak - 1, -1);
				this.setWinStreakText();
			}
		} else if (this.computer.dead) {
			this.setGameOverText('PLAYER WINS');
			this.streak = Math.max(this.streak + 1, 1);
			this.setWinStreakText();
		} else
			this.showActions();
	}

	setGameOverText(text) {
		$('#buttonReplay').hide();
		$('#gameOverBox').fadeIn();
		$('#gameOverText').text(text);

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