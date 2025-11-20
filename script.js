/* ===== GLOBAL HELPER FUNCTIONS ===== */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

document.addEventListener('DOMContentLoaded', function() {
    
    // =================================================
    // 1. MENÚ MÓVIL (Lógica Simplificada y Robusta)
    // =================================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav'); // Selecciona el <nav> directamente
    const body = document.body;
    
    // Crear fondo oscuro (backdrop) si no existe
    let backdrop = document.querySelector('.mobile-menu-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'mobile-menu-backdrop';
        body.appendChild(backdrop);
    }

    function toggleMenu() {
        if (!nav) return;
        nav.classList.toggle('active'); // Usamos la clase .active del CSS nuevo
        body.classList.toggle('mobile-menu-open');

        // Cambiar icono (Hamburguesa <-> X)
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (backdrop) {
        backdrop.addEventListener('click', toggleMenu);
    }

    // Cerrar menú al hacer clic en un enlace
    if (nav) {
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) toggleMenu();
            });
        });
    }

    // =================================================
    // 2. COOKIE BANNER (Lógica de Aceptación)
    // =================================================
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');

    // Verificar si ya se aceptaron las cookies
    if (cookieBanner && acceptBtn && !localStorage.getItem('cookiesAccepted')) {
        // Mostrar banner después de 1 segundo
        setTimeout(() => {
            cookieBanner.style.transform = 'translateY(0)'; // Deslizar hacia arriba
        }, 1000);

        acceptBtn.addEventListener('click', () => {
            // Ocultar banner
            cookieBanner.style.transform = 'translateY(100%)'; // Deslizar hacia abajo
            // Guardar preferencia en navegador
            localStorage.setItem('cookiesAccepted', 'true');
        });
    }

    // =================================================
    // 3. SWITCH DE IDIOMA
    // =================================================
    const switchButton = document.getElementById('switchButton');
    const currentLang = document.getElementById('currentLang');
    
    if (switchButton) {
        switchButton.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });
        
        // Cerrar al hacer clic fuera
        document.addEventListener('click', () => {
            switchButton.classList.remove('active');
        });

        // Selección de idioma
        const langOptions = document.querySelectorAll('.language-dropdown div');
        langOptions.forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                if (currentLang) currentLang.textContent = lang.toUpperCase();
            });
        });
    }

    // =================================================
    // 4. SCROLL SUAVE (Corrección para Header Fijo)
    // =================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#0') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Calcular posición restando la altura del header (80px)
                const headerOffset = 90; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // =================================================
    // 5. ANIMACIONES AL HACER SCROLL (Fade In)
    // =================================================
    // Añadir clase .fade-in a los elementos que quieras animar en el HTML
    const fadeElements = document.querySelectorAll('.fade-in, .stat-item, .step, .doctor-card');
    
    if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target); // Dejar de observar una vez animado
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(el => {
            el.classList.add('fade-in-hidden'); // Estado inicial
            observer.observe(el);
        });
    }

    // =================================================
    // 6. FORM VALIDATION (Formulario de Contacto)
    // =================================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            
            if(name.value.trim() === "" || email.value.trim() === "") {
                alert("Please fill in all required fields.");
                return;
            }
            
            alert('Message sent successfully! We will contact you shortly.');
            this.reset();
        });
    }

    // =================================================
    // 7. MANEJO DE RESIZE
    // =================================================
    window.addEventListener('resize', debounce(function() {
        // Si la pantalla crece más de 1024px, cerrar menú móvil para evitar bugs visuales
        if (window.innerWidth > 1024 && nav && nav.classList.contains('active')) {
            toggleMenu(); 
        }
    }, 250));
});