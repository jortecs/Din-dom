let pianoContainer = document.getElementsByClassName("piano-container")[0];
const base = "./audio/";

// Arreglo de teclas del teclado asociadas a las teclas blancas y negras
const whiteKeysBindings = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N"];
const blackKeysBindings = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Ejecutar al cargar la ventana
window.onload = () => {
    // Crear las teclas en el piano (10 negras y 14 blancas)
    let blackCount = 0;
    let whiteCount = 0;

    for (let index = 1; index <= 24; index++) {
        let div = document.createElement("div");

        // Asigna teclas negras y blancas de acuerdo a la posición
        if (index <= 10) {
            div.classList.add("key", "black-key");
            blackCount++;
        } else {
            div.classList.add("key", "white-key");
            whiteCount++;
        }

        // Asignar sonido de audio
        const number = index <= 9 ? "0" + index : index;
        div.addEventListener("click", () => {
            new Audio(`${base}key${number}.mp3`).play();
        });

        pianoContainer.appendChild(div);
    }
};

// Función para reproducir el sonido y activar el efecto visual para teclas blancas y negras
function playSoundByKey(key) {
    // Verifica si la tecla presionada es para una tecla blanca o negra
    let index = whiteKeysBindings.indexOf(key.toUpperCase());
    let isWhiteKey = true;

    if (index === -1) {  // Si no es una tecla blanca, verifica si es una tecla negra
        index = blackKeysBindings.indexOf(key);
        isWhiteKey = false;
    }

    // Si la tecla existe en alguna de las listas, reproduce el sonido y activa el efecto visual
    if (index !== -1) {
        const pianoKey = pianoContainer.children[isWhiteKey ? index + 10 : index];  // Ajusta el índice de la tecla visual

        const number = (isWhiteKey ? index + 11 : index + 1) <= 9 ? "0" + (isWhiteKey ? index + 11 : index + 1) : isWhiteKey ? index + 11 : index + 1;
        new Audio(`${base}key${number}.mp3`).play();

        activateKey(pianoKey);  // Activar el efecto visual
    }
}

// Función para activar el efecto de tecla activa
function activateKey(keyElement) {
    keyElement.classList.add("key-active");
    setTimeout(() => keyElement.classList.remove("key-active"), 100);  // Remover la clase tras un breve tiempo
}

// Escuchar eventos de teclado
document.addEventListener("keydown", (event) => {
    playSoundByKey(event.key);
});
