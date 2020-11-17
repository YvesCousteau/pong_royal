
const StartBackgroundSound = () => {
	const intro = new Audio('./assets/intro.wav'); 
	const loop = new Audio('./assets/loop.wav'); 

	loop.loop = true;

	intro.addEventListener('timeupdate', function() {
	  var buffer = .44
	  if(this.currentTime > this.duration - buffer)
	    loop.play();
	}, false);

	intro.play();
}

export { StartBackgroundSound }