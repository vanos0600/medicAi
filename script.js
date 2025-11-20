//* ===== MOBILE MENU FUNCTIONALITY & OTHERS ===== */
document.addEventListener('DOMContentLoaded', function() {
    // --- VARIABLES GLOBALES ---
    const body = document.body;

    /* =========================================
       1. MOBILE MENU
       ========================================= */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');

    // Create mobile backdrop
    const mobileBackdrop = document.createElement('div');
    mobileBackdrop.className = 'mobile-menu-backdrop';
    body.appendChild(mobileBackdrop);

    // Close mobile menu function
    const closeMobileMenu = () => {
        nav.classList.remove('mobile-active');
        body.classList.remove('mobile-menu-open');
        
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    };

    // Mobile menu toggle
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            nav.classList.toggle('mobile-active');
            body.classList.toggle('mobile-menu-open');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (nav.classList.contains('mobile-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on links
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('mobile-active')) {
                    setTimeout(closeMobileMenu, 300);
                }
            });
        });

        // Close menu with backdrop
        mobileBackdrop.addEventListener('click', closeMobileMenu);

        // Close menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('mobile-active')) {
                closeMobileMenu();
            }
        });
    }

    /* =========================================
       2. LANGUAGE DROPDOWN
       ========================================= */
    const switchButton = document.getElementById('switchButton');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLang = document.getElementById('currentLang');
    
    if (switchButton && languageDropdown && currentLang) {
        switchButton.addEventListener('click', function(e) {
            e.stopPropagation();
            switchButton.classList.toggle('active');
        });
        
        languageDropdown.querySelectorAll('div[data-lang]').forEach(item => {
            item.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                currentLang.textContent = lang.toUpperCase();
                switchButton.classList.remove('active');
                // Aquí podrías añadir lógica real de cambio de idioma
                console.log('Language changed to: ' + lang); 
            });
        });
        
        document.addEventListener('click', function() {
            switchButton.classList.remove('active');
        });
    }

    // Close menu on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav && nav.classList.contains('mobile-active')) {
            closeMobileMenu();
        }
    });

    /* =========================================
       3. COOKIE BANNER FUNCTIONALITY (NUEVO)
       ========================================= */
    const cookieBanner = document.getElementById("cookieBanner");
    const acceptCookiesBtn = document.getElementById("acceptCookies");
    const manageCookiesBtn = document.getElementById("manageCookies");

    if (cookieBanner && acceptCookiesBtn) {
        // Comprobar si ya se aceptaron las cookies
        if (!localStorage.getItem("cookiesAccepted")) {
            // Pequeño retraso para que la animación se vea suave al cargar la web
            setTimeout(() => {
                cookieBanner.classList.add("show");
            }, 500); 
        }

        // Botón Aceptar
        acceptCookiesBtn.addEventListener("click", function() {
            localStorage.setItem("cookiesAccepted", "true");
            cookieBanner.classList.remove("show");
        });

        // Botón Gestionar (Opcional)
        if (manageCookiesBtn) {
            manageCookiesBtn.addEventListener("click", function() {
                // Aquí iría la lógica para abrir el modal de preferencias
                alert("Abrir configuración de cookies...");
            });
        }
    }
});