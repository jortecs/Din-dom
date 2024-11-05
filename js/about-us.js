const perfiles = document.querySelectorAll('.contenedorfotos > div');
const botonRetroceder = document.querySelector('#retroceder');
const botonAvanzar = document.querySelector('#avanzar');
let index = 0;
let perfilesPorSlide = calcularPerfilesPorSlide();

// Función para calcular cuántos perfiles mostrar según el ancho de la pantalla
function calcularPerfilesPorSlide() {
    return window.innerWidth >= 900 ? 3 : 1;
}

// Función para mostrar los perfiles activos
function mostrarPerfiles(n) {
    perfiles.forEach(perfil => perfil.classList.remove('activo'));
    if (n >= perfiles.length) {
        index = 0;
    } else if (n < 0) {
        index = perfiles.length - perfilesPorSlide;
    } else {
        index = n;
    }

    // Muestra los perfiles activos
    for (let i = 0; i < perfilesPorSlide; i++) {
        if (perfiles[index + i]) {
            perfiles[index + i].classList.add('activo');
        }
    }
}

// Funciones para avanzar y retroceder
function avanzar() {
    mostrarPerfiles(index + perfilesPorSlide);
}

function retroceder() {
    mostrarPerfiles(index - perfilesPorSlide);
}

// Función para ampliar la descripción de cada perfil
function configurarBotonesAmpliar() {
    const botonesAmpliar = document.querySelectorAll('.ampliar');

    botonesAmpliar.forEach((boton, idx) => {
        boton.addEventListener('click', () => {
            const parrafo = perfiles[idx].querySelector('p');
            parrafo.style.display = parrafo.style.display === 'block' ? 'none' : 'block';
        });
    });
}

// Para que el carrusel sea responsivo
window.addEventListener('resize', () => {
    const nuevoPerfilesPorSlide = calcularPerfilesPorSlide();
    if (nuevoPerfilesPorSlide !== perfilesPorSlide) {
        perfilesPorSlide = nuevoPerfilesPorSlide;
        mostrarPerfiles(index); 
    }
});


botonAvanzar.addEventListener('click', avanzar);
botonRetroceder.addEventListener('click', retroceder);
configurarBotonesAmpliar();
mostrarPerfiles(index);
