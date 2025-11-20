/* ===== MOBILE MENU FUNCTIONALITY ===== */
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    const headerTools = document.querySelector('.header-tools');

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

    // Language dropdown functionality
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
                alert('Language changed to: ' + lang);
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


    // ===== COOKIE BANNER FUNCTIONALITY =====
function initializeCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookies = document.getElementById('acceptCookies');
    const manageCookies = document.getElementById('manageCookies');
    
    // Verificar que todos los elementos existan
    if (!cookieBanner || !acceptCookies) {
        console.warn('Cookie banner elements not found');
        return;
    }
    
    // Comprobar si ya se aceptaron las cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (!cookiesAccepted) {
        // Mostrar el banner después de un delay
        setTimeout(() => {
            cookieBanner.style.display = 'block';
            document.body.style.marginBottom = cookieBanner.offsetHeight + 'px';
        }, 1000);
    }
    
    // Aceptar cookies
    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.style.display = 'none';
        document.body.style.marginBottom = '0';
        console.log('Cookies accepted');
    });
    
    // Gestionar cookies (si existe el botón)
    if (manageCookies) {
        manageCookies.addEventListener('click', (e) => {
            e.preventDefault();
            // Aquí puedes implementar un modal más elaborado
            const response = confirm('Would you like to customize your cookie preferences?');
            if (response) {
                // Lógica para gestión detallada de cookies
                alert('Cookie management panel would open here.');
            }
        });
    }
    
    // Cerrar banner con Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cookieBanner.style.display === 'block') {
            cookieBanner.style.display = 'none';
            document.body.style.marginBottom = '0';
        }
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeCookieBanner();
    
    // El resto de tu código JavaScript aquí...
});
});