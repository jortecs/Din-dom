// Obtener elementos
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.querySelector(".close-btn");

// Función para abrir el modal
openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Función para cerrar el modal
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});












// Selecciona el contenedor del piano en el DOM y define la ruta de la carpeta de audios
let pianoContainer = document.getElementsByClassName("piano-container")[0];
const base = "/assets/sounds/piano/"; // Ruta base donde están los archivos de audio de las teclas

// Definimos dos arreglos que relacionan teclas del teclado con teclas en el piano:
// Teclas blancas asociadas con letras
const whiteKeysBindings = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N"];
// Teclas negras asociadas con números
const blackKeysBindings = ["1", "2", "3", "4", "5", "6", "7", "8", "9","0"];

// Ejecuta esta función cuando la ventana cargue
window.onload = () => {
    // Variables para contar teclas blancas y negras
    let blackCount = 0;
    let whiteCount = 0;

    // Ciclo que crea 24 teclas virtuales en el contenedor del piano
    for (let index = 1; index <= 24; index++) {
        // Crea un nuevo elemento <div> para cada tecla del piano
        let div = document.createElement("div");

        // Verifica si la tecla es negra o blanca y le asigna una clase CSS correspondiente
        if (index <= 10) {
            div.classList.add("key", "black-key"); // Agrega la clase "black-key" a las primeras 10 teclas
            blackCount++;
        } else {
            div.classList.add("key", "white-key"); // Agrega la clase "white-key" a las siguientes 14 teclas
            whiteCount++;
        }

        // Establece el número del archivo de audio correspondiente a la tecla, asegurando que tiene dos dígitos
        const number = index <= 9 ? "0" + index : index;

        // Agrega un evento de clic a cada tecla: cuando se hace clic, reproduce el sonido de la tecla
        div.addEventListener("click", () => {
            new Audio(`${base}key${number}.mp3`).play();
        });

        // Agrega la tecla al contenedor del piano en el DOM
        pianoContainer.appendChild(div);
        }
};

// Función que reproduce el sonido y activa el efecto visual cuando se presiona una tecla del teclado
function playSoundByKey(key) {
    // Verifica si la tecla presionada corresponde a una tecla blanca usando whiteKeysBindings
    let index = whiteKeysBindings.indexOf(key.toUpperCase());
    let isWhiteKey = true; // Marca para indicar si es una tecla blanca

    // Si la tecla no se encuentra en whiteKeysBindings, busca en blackKeysBindings
    if (index === -1) {  
        index = blackKeysBindings.indexOf(key); // Actualiza el índice si es una tecla negra
        isWhiteKey = false; // Cambia la marca indicando que es una tecla negra
    }

    // Si la tecla existe en una de las listas, procede a reproducir el sonido y activar el efecto visual
    if (index !== -1) {
        // Obtiene el elemento visual de la tecla en el piano
        const pianoKey = pianoContainer.children[isWhiteKey ? index + 10 : index]; // Ajusta el índice para teclas blancas

        // Establece el número del archivo de audio para la tecla (con dos dígitos)
        const number = (isWhiteKey ? index + 11 : index + 1) <= 9 
                       ? "0" + (isWhiteKey ? index + 11 : index + 1) 
                       : isWhiteKey ? index + 11 : index + 1;

        // Reproduce el archivo de sonido asociado con la tecla
        new Audio(`${base}key${number}.mp3`).play();

        // Activa la animación visual de la tecla presionada
        activateKey(pianoKey);
    }
}

// Función que agrega un efecto visual a la tecla presionada en el piano
function activateKey(keyElement) {
    keyElement.classList.add("key-active"); // Agrega la clase .key-active para aplicar el efecto CSS
    // Después de 100 milisegundos, elimina la clase para que el efecto solo dure un momento
    setTimeout(() => keyElement.classList.remove("key-active"), 100);  
}

// Escucha eventos de tecla en todo el documento
document.addEventListener("keydown", (event) => {
    // Llama a playSoundByKey() pasándole la tecla presionada para reproducir el sonido y activar el efecto
    playSoundByKey(event.key);
});

