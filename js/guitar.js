// window.onload = function() {
    const modal2 = document.getElementById("modal2");
    const openModalBtn2 = document.getElementById("openModal2"); 
    const closeModalBtn2 = document.querySelector(".close-btn2");
    
    openModalBtn2.addEventListener("click", () => {
      modal2.style.display = "flex";
    });
  
    closeModalBtn2.addEventListener("click", () => {
      modal2.style.display = "none";
    });
  
    // Cerrar el segundo modal al hacer clic fuera del contenido
    window.addEventListener("click", (event) => {
      if (event.target === modal2) {
        modal2.style.display = "none";
      }
    });
// };


// Crear contexto de audio
const context = new (window.AudioContext || window.AudioContext)();

// Cantidad de amortiguación de la señal
let dampening = 0.99;

// Función para generar el sonido de una cuerda al "tocar"
function pluck(frequency) {
    const pluck = context.createScriptProcessor(4096, 0, 1);

    // Periodo de la señal en muestras
    const N = Math.round(context.sampleRate / frequency);
    const y = new Float32Array(N);

    // Inicializar con ruido aleatorio en las frecuencias
    for (let i = 0; i < N; i++) {
        y[i] = Math.random() * 2 - 1;
    }

    let n = 0;
    pluck.onaudioprocess = function (e) {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < e.outputBuffer.length; i++) {
            y[n] = (y[n] + y[(n + 1) % N]) / 2;
            output[i] = y[n];
            y[n] *= dampening;
            n++;
            if (n >= N) n = 0;
        }
    };

    // Aplicar un filtro de paso de banda para limpiar la señal
    const bandpass = context.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = frequency;
    bandpass.Q.value = 1;

    pluck.connect(bandpass);

    // Desconectar para evitar fugas de memoria
    setTimeout(() => {
        pluck.disconnect();
        bandpass.disconnect();
    }, 2000);

    return bandpass;
}

// Función para tocar una cuerda
function tocarNota(frecuencia) {
    pluck(frecuencia).connect(context.destination);
}

// Tocar cuerdas con un click
const strings = document.querySelectorAll('.string');

strings.forEach(cuerda => {
    cuerda.addEventListener('click', () => {
        const frecuencia = parseFloat(cuerda.getAttribute('data-freq'));
        context.resume().then(() => {
            tocarNota(frecuencia);
        });

        // Activar la animación al hacer Click
        cuerda.classList.add('active');

        // Duración de la animación
        setTimeout(() => {
            cuerda.classList.remove('active');
        }, 300); 
    });
});

// Tocar cuerdas con el teclado numerico
document.addEventListener('keydown', (event) => {
    let keyMap = {
        '1': 'string1',
        '2': 'string2',
        '3': 'string3',
        '4': 'string4',
        '5': 'string5',
        '6': 'string6'
    };

    let stringId = keyMap[event.key];
    if (stringId) {
        let string = document.getElementById(stringId);
        const frecuencia = parseFloat(string.getAttribute('data-freq'));
        context.resume().then(() => {
            tocarNota(frecuencia);
        });

        // Activar la animación al tocar el Teclado
        string.classList.add('active');

        // Duración de la animación
        setTimeout(() => {
            string.classList.remove('active');
        }, 300); 
    }
});