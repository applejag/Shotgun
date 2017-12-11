
/*
	Actions
	'shoot'
	'shotgun'
	'reload'
	'dodge'
 */

class Player {
	static folder = 'gifs/';

	constructor(id) {
		this.imgQuery = '#' + id + 'Image';
		this.imgPrefix = id + "_";

		this.dead = false;
		this.ammo = 0;
		this.action = 'none';

		this.playAnimation('walk');
	}

	evaluateAction(enemy) {
		if (enemy.action === 'shotgun')
			this.dead = true;

		switch (this.action) {
			case 'shoot':
				if (this.ammo > 0)
					this.ammo--;
				break;

			case 'shotgun':
				if (this.ammo === 3)
					this.ammo = 0;
				break;

			case 'reload':
				if (enemy.action === 'shoot' || enemy.action === 'shotgun')
					this.dead = true;
				else if (this.ammo < 3)
					this.ammo++;
				break;
		}
		
		this.playAnimation(this.getAnimation(enemy));
	}
	
	playAnimation(anim) {
		if (!anim) return;
		const path = Player.folder + anim + '.gif';
		$(this.imgQuery).attr('src', path);
	}

	getAnimation(enemy) {
		if (this.action === 'dodge') {
			if (enemy.action === 'shoot') return 'dodge_bullet';
			if (enemy.action === 'shotgun') return 'dodge_shotgun';
			return 'dodge_nothing';
		}
		if (this.action === 'reload') {
			if (enemy.action === 'shoot') return 'die';
			if (enemy.action === 'shotgun') return 'die_shotgun';
			return 'reload';
		}
		if (this.action === 'shoot' || this.action === 'shotgun') {
			if (enemy.action === 'shoot') return 'shoot_dodge';
			if (enemy.action === 'shotgun') return 'shoot_die';
			return 'shoot';
		}

		return null;
	}
}