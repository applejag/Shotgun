
class Loader {

	constructor(oncomplete) {
		this.imagesCount = 0;
		this.imagesLoaded = 0;
		this.oncomplete = oncomplete;
		
		var s = Loader.getImagePaths();
		this.imagesCount = s.length;
		
		$('#loader').attr('max', this.imagesCount);
		imageCache.pushArray(s, ()=>this.loadImageEvent(), ()=>this.loadAllEvent());
	}

	loadImageEvent() {
		this.imagesLoaded++;
		this.setLoadedStatus();
	}

	loadAllEvent() {
		this.imagesLoaded = this.imagesCount;
		this.setLoadedStatus();
		
		$('#loaderContainer').fadeOut('slow',
			() => $('#content').fadeIn('slow'));

		if (typeof this.oncomplete === 'function') this.oncomplete();
	}

	setLoadedStatus() {
		$('#loader').attr('value', this.imagesLoaded);
		$('#loaderValue').text(this.imagesLoaded);
		$('#loaderCount').text(this.imagesCount);
	}

	static getImagePaths() {
		var s = [
			'gifs/shell_yes.png',
			'gifs/shell_no.png',
		];
		const prefix = ['computer_', 'player_'];
		
		for (var i=prefix.length-1; i>=0; i--) {
			s.push('gifs/' + prefix[i] + 'die_shotgun.gif');
			s.push('gifs/' + prefix[i] + 'die.gif');
			s.push('gifs/' + prefix[i] + 'dodge_bullet.gif');
			s.push('gifs/' + prefix[i] + 'dodge_nothing.gif');
			s.push('gifs/' + prefix[i] + 'dodge_shotgun.gif');
			s.push('gifs/' + prefix[i] + 'draw.gif');
			s.push('gifs/' + prefix[i] + 'reload.gif');
			s.push('gifs/' + prefix[i] + 'shoot_die.gif');
			s.push('gifs/' + prefix[i] + 'shoot_dodge.gif');
			s.push('gifs/' + prefix[i] + 'shoot.gif');
			s.push('gifs/' + prefix[i] + 'walk.gif');
		}

		return s;
	}
}