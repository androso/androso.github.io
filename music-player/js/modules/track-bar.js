const trackBar = (() => {
	let innerProgressBarEl = document.querySelector(".inner-progress-bar");
	const init = (currentSong) => {
		// For some weird reason we need to wait for the song's metadata to be loaded fully in order to get its duration
		// Otherwise it returned NaN
		setTimeout(() => {
			// innerProgressBarEl.style.animationDuration = currentSong.duration + "s";
			// innerProgressBarEl.style.animationPlayState = "running";
			innerProgressBarEl.style.animation = `track-bar ${currentSong.duration}s linear running`;
		}, 150);
	};
	const pause = () => {
		const songDataLoaded = setTimeout(() => {
			innerProgressBarEl.style.animationPlayState = "paused";
		}, 150);
	};
	const reset = (currentSong) => {
		const newInnerProgressBarEl = innerProgressBarEl.cloneNode(true);
		innerProgressBarEl.parentElement.replaceChild(
			newInnerProgressBarEl,
			innerProgressBarEl
		);
		// making this variable point to the new progressBar in the DOM
		innerProgressBarEl = document.querySelector(".inner-progress-bar");
		init(currentSong);
	};
	return {
		init,
		pause,
		reset,
	};
})();

export default trackBar;
