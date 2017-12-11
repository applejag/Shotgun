
class AIPlayer extends Player {

	evaluateAction(enemy) {
		this.action = this.getAIAction(enemy);
		super.evaluateAction(enemy);
	}

	getAIAction(enemy) {
		if (this.ammo === 3)
			return 'shotgun';

		let actions = ['reload'];

		if (this.ammo > 0)
			actions.push('shoot');
		
		if (enemy.ammo > 0)
			actions.push('dodge');

		let index = Math.floor(Math.random() * actions.length);

		return actions[index];
	}

}
