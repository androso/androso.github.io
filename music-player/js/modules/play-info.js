import Playlist from "./playlist.js";

const RenderPlayInfo = (() => {
    const playButtonEl = document.querySelector(".main-play-button");
    const currentSong = Playlist.songInfo.currentSong;
    const init = () => {
        addListeners();
    }
    
    const addListeners = () => {
        playButtonEl.addEventListener("click", toggleStatus);
        window.addEventListener("keydown", event => event.code === "Space" ? toggleStatus() : false);
    }

    const toggleStatus = () => {
        Playlist.songInfo.toggleSongState();
        // find out if there's a way to render just the .play-icon and if it's worth the effor (tradeoff)
        Playlist.songInfo.renderSong();
        changeElementsState();
    }
    const changeElementsState = () => {
        if (currentSong.paused) {
            playButtonEl.innerText = "PLAY";
        } else {
            playButtonEl.innerText = "PAUSE";
        }   
    }
    return {
        init,
    }
})();



export default RenderPlayInfo;
