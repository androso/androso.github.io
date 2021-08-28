import { songsList } from "../data/songs.js";
import trackBar from "./track-bar.js";

const Playlist = ((_) => {
	// App data
	const songs = songsList;
	let currentlyPlayingIndex = 0;
	let currentSong = new Audio(songs[currentlyPlayingIndex].url);

	// DOM
	const playlistContainerEl = document.querySelector(".playlist");
	const playButtonEl = document.querySelector(".main-play-button");

	const init = () => {
		renderSong();
		addListeners();
	};

	const renderSong = () => {
		let markup = ``;

		const toggleIcon = (itemIndex) => {
			if (itemIndex === currentlyPlayingIndex) {
				return currentSong.paused ? "fa-play" : "fa-pause";
			} else {
				return "fa-play";
			}
		};

		songs.forEach((song, index) => {
			markup += `
            <li class="playlist__song ${
							index === currentlyPlayingIndex ? "playlist__song--active" : ""
						}" data-song-index="${index}">
                <div class="song__info">
                    <i class="play-icon fa ${toggleIcon(index)}"></i>
                    <div class="song__details">
                        <span class="song__title">${song.title}</span>
                        <br />
                        
                        <a class="song__artist-link" href="https://www.google.com/search?q=${song.artist.toLowerCase()}" target="_blank"><span class="song__artist">${
				song.artist
			}</span></a>
                        
                    </div>
                    <span class="song__duration">${song.time}</span>
                </div>
            </li>`;
		});
		playlistContainerEl.innerHTML = markup;
	};

	// AddListeners that works anytime you click on something but song__artist
	const addListeners = () => {
		playlistContainerEl.addEventListener("click", (event) => {
			if (event.target.matches(".play-icon")) {
				const songEl = event.target.parentNode.parentNode;
				const newIndex = Number(songEl.getAttribute("data-song-index"));
				updateSongState(newIndex);
			}
		});
		playlistContainerEl.addEventListener("dblclick", (event) => {
			let songEl = {};
			// in order to get the right song element to get the right song index, i needed to do different traversals
			if (event.target.matches(".song__title")) {
				songEl = event.target.parentNode.parentNode.parentNode;
			} else if (event.target.matches(".song__info")) {
				songEl = event.target.parentNode;
			} else {
				songEl = event.target.parentNode.parentNode;
			}
			const newIndex = Number(songEl.getAttribute("data-song-index"));
			updateSongState(newIndex);
		});
	};
	const updateSongState = (newIndex) => {
		if (newIndex === currentlyPlayingIndex) {
			toggleSongState();
			renderSong();
		} else {
			currentlyPlayingIndex = newIndex;
			currentSong.src = songs[newIndex].url;
			toggleSongState();
            trackBar.reset(currentSong);
			renderSong();
		}
	};
	const toggleSongState = () => {
		if (currentSong.paused) {
			currentSong.play();
			playButtonEl.innerText = "PAUSE";
            trackBar.init(currentSong);

			// We gotta search for a more less consuming-resources solution/alternative to the interval, the one we currently have is checking every second,
			// is there any way to just check after the song duration - the song currentTime safely?
			const songEndsInterval = setInterval((_) => {
				nextSong();
				if (currentSong.paused) {
					clearInterval(songEndsInterval);
				}
			}, 1000);
		} else {
			currentSong.pause();
			trackBar.pause(currentSong);
			playButtonEl.innerText = "PLAY";
		}
	};
	const nextSong = () => {
		if (currentSong.ended) {
			const nextIndex = currentlyPlayingIndex + 1;
			updateSongState(nextIndex);
			return true;
		}
	};
	return {
		init,
		songInfo: {
			currentSong,
			toggleSongState,
			renderSong,
		},
		// toggleSongState
	};
})();

export default Playlist;
