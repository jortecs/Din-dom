
// Obtener elementos
const modal1 = document.getElementById("modal1");
const openModalBtn1 = document.getElementById("openModal1");
const closeModalBtn1 = document.querySelector(".close-btn1");

// Función para abrir el modal:3
openModalBtn1.addEventListener("click", () => {
  modal1.style.display = "flex";
});

// Función para cerrar el modal//
closeModalBtn1.addEventListener("click", () => {
  modal1.style.display = "none";
});

// Cerrar modal al hacer clic fuera del contenido//
window.addEventListener("click", (event) => {
  if (event.target === modal1) {
    modal1.style.display = "none";
  }
});



/*esto es para que el tambor se oscuresca cuando se toque porque no hace rato no se oscurecia*/
const drums2 = document.querySelectorAll('.drumkit div');

function activateDrum(drum) {
    drum.classList.add('drum-active');

    const audio = document.getElementById(drum.dataset.note);

    audio.currentTime = 0; // repetir el sodino
    audio.play(); // Reproducir el sonido
}

//  desactivar el tambor
function deactivateDrum(drum) {
    drum.classList.remove('drum-active'); // Eliminar clase para volver a la normalidad
}

//evento de clic a cada tambor
drums2.forEach(drum => {
    drum.addEventListener('click', () => {
        activateDrum(drum);
        setTimeout(() => deactivateDrum(drum), 200); //se desactiva despues de 200  milisegundio 
    });
});

// Agregar evento de teclado
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase(); //tecla presionada

    const keyToDrumMap = {
        'r': document.querySelector('.kick-r'), 
        'w': document.querySelector('.kick'), 
        'e': document.querySelector('.snare'), 
        'y': document.querySelector('.tom1'),  
        'u': document.querySelector('.tom2'),   
        'i': document.querySelector('.tom3'),   
        't': document.querySelector('.hithat'),  
        'o': document.querySelector('.crash1'), 
        'q': document.querySelector('.crash2')  
    };

    const drum = keyToDrumMap[key];
    if (drum) {
        activateDrum(drum);
        setTimeout(() => deactivateDrum(drum), 200); // Desactivar después de 200 ms
    }
});