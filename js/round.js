
class Round {

	constructor() {
		this.player = new Player('player');
		this.computer = new Player('computer');

		$('#buttonStart').click(this.onButtonStart.bind(this));
		$('#buttonDodge').click(this.onActionCallback.bind(this, 'dodge'));
		$('#buttonShoot').click(this.onActionCallback.bind(this, 'shoot'));
		$('#buttonShotgun').click(this.onActionCallback.bind(this, 'shotgun'));
		$('#buttonReload').click(this.onActionCallback.bind(this, 'reload'));

		this.setGameOverText(null);
	}

	spawnPlayers() {
		if (this.player.dead || this.computer.dead)
			setTimeout(this.showActions.bind(this), 4000);

		if (this.player.dead) this.player.spawn();
		if (this.computer.dead) this.computer.spawn();
	}

	showActions() {
		$('#buttonActions').show();

		let shotgun = this.player.ammo === 3;
		$('#buttonShoot').toggle(!shotgun);
		$('#buttonShotgun').toggle(shotgun);
	}

	hideActions() {
		$('#buttonActions').hide();
	}

	evaluateRound() {
		this.player.evaluateAction(this.computer);
		this.computer.evaluateAction(this.player);

		setTimeout(this.evaluateDeaths.bind(this), 2000);
	}

	evaluateDeaths() {
		if (this.player.dead) {
			if (this.computer.dead)
				this.setGameOverText('DRAW');
			else
				this.setGameOverText('COMPUTER WINS');
		} else if (this.computer.dead)
			this.setGameOverText('PLAYER WINS');
		else
			this.showActions();
	}

	setGameOverText(text) {
		if (!text) {
			$('#gameOverText').hide();
		} else {
			$('#gameOverText').fadeIn();
			$('#gameOverText').text(text);
		}
	}

	/* Button callbacks */
	onButtonStart() {
		$('#buttonStart').hide();
		this.spawnPlayers();
	}
	
	onActionCallback(action) {
		this.hideActions();
		this.player.action = action;
		this.evaluateRound();
	}
}