const bodyEl = document.querySelector("body");
const albumCovers = document.querySelectorAll("img");
const albums = Array.from(albumCovers);

function unblurBackground(event) {
	if (!isAlbum(event)) {
		bodyEl.classList.add("unblur__body");
	} else {
		bodyEl.classList.remove("unblur__body");
	}
}

function playAlbum (event) {
    if (isAlbum(event)) {
        let song = event.target.parentElement.querySelector("audio");
        song.play();
    }
}

function isAlbum(event) {
	return albums.includes(event.target) ? true : false;
}

bodyEl.addEventListener("mouseover", unblurBackground);
bodyEl.addEventListener("click", playAlbum);