
const playButton = document.getElementById("playButton");
const audioPlayer = document.getElementById("audioPlayer");
let isPlaying = true;

// Función para reproducir o pausar la música
function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
    isPlaying = !isPlaying;
}


// Evento de clic en el botón de imagen
playButton.addEventListener("click", togglePlay);
