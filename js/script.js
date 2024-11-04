document.addEventListener('DOMContentLoaded', function() {
    // Variables para el carrusel 3D
    const carousel3D = document.getElementById('carousel3D');
    const cards3D = carousel3D.getElementsByClassName('card');
    let currentIndex3D = 1; // Comienza con la batería activa

    // Variables para el carrusel mobile
    const carouselMobile = document.getElementById('carouselMobile');
    const slider = carouselMobile.querySelector('.slider');
    const slides = slider.getElementsByClassName('slide');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    let currentIndexMobile = 0;

    // Función para actualizar el carrusel 3D
    function updateCarousel3D() {
        Array.from(cards3D).forEach((card, index) => {
            const offset = index - currentIndex3D;
            card.style.transform = `rotateY(${offset * 30}deg) translateX(${offset * 500}px)`;
            card.classList.toggle('active', index === currentIndex3D);
        });
    }

    // Función para actualizar el carrusel mobile
    function updateCarouselMobile() {
        slider.style.transform = `translateX(-${currentIndexMobile * 100}%)`;
    }

    // Event listeners para el carrusel 3D
    document.addEventListener('keydown', (e) => {
        if (window.innerWidth > 768 && carousel3D.style.display !== 'none') {
            if (e.key === 'ArrowLeft') {
                currentIndex3D = (currentIndex3D === 0) ? cards3D.length - 1 : currentIndex3D - 1;
                updateCarousel3D();
            } else if (e.key === 'ArrowRight') {
                currentIndex3D = (currentIndex3D === cards3D.length - 1) ? 0 : currentIndex3D + 1;
                updateCarousel3D();
            }
        }
    });

    // Click events para las cards 3D
    Array.from(cards3D).forEach((card, index) => {
        card.addEventListener('click', () => {
            if (window.innerWidth > 768) {
                currentIndex3D = index;
                updateCarousel3D();
            }
        });
    });

    // Event listeners para los botones de navegación mobile
    prevButton.addEventListener('click', () => {
        prevButton.disabled = true;
        nextButton.disabled = true;

        currentIndexMobile = (currentIndexMobile === 0) ? slides.length - 1 : currentIndexMobile - 1;
        updateCarouselMobile();

        setTimeout(() => {
            prevButton.disabled = false;
            nextButton.disabled = false;
        }, 500); // Espera medio segundo
    });

    nextButton.addEventListener('click', () => {
        prevButton.disabled = true;
        nextButton.disabled = true;

        currentIndexMobile = (currentIndexMobile === slides.length - 1) ? 0 : currentIndexMobile + 1;
        updateCarouselMobile();

        setTimeout(() => {
            prevButton.disabled = false;
            nextButton.disabled = false;
        }, 500); // Espera medio segundo
    });

    // Soporte para gestos táctiles en mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
        const swipeDistance = touchStartX - touchEndX;
        if (Math.abs(swipeDistance) > 50) { // Umbral mínimo para considerar un swipe
            if (swipeDistance > 0) {
                // Swipe izquierda
                currentIndexMobile = (currentIndexMobile === slides.length - 1) ? 0 : currentIndexMobile + 1;
            } else {
                // Swipe derecha
                currentIndexMobile = (currentIndexMobile === 0) ? slides.length - 1 : currentIndexMobile - 1;
            }
            updateCarouselMobile();
        }
    });

    // Inicialización
    updateCarousel3D();
    updateCarouselMobile();

    // Manejo de resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCarousel3D();
            updateCarouselMobile();
        }, 250);
    });
});
