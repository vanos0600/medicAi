/**
 * MEDIC AI POLYCLINIC - MASTER SCRIPT
 * Handles Mobile Menu, Language Switcher, Cookies, and Page Specifics.
 */

document.addEventListener('DOMContentLoaded', function() {
    
    /* =========================================
       1. MOBILE MENU FUNCTIONALITY
       ========================================= */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    const body = document.body;

    // Crear el fondo oscuro (Backdrop) dinámicamente si no existe
    let mobileBackdrop = document.querySelector('.mobile-menu-backdrop');
    if (!mobileBackdrop) {
        mobileBackdrop = document.createElement('div');
        mobileBackdrop.className = 'mobile-menu-backdrop';
        body.appendChild(mobileBackdrop);
    }

    // Función para cerrar el menú
    const closeMobileMenu = () => {
        // Nota: Usamos 'nav-active' para coincidir con el CSS
        nav.classList.remove('nav-active'); 
        body.classList.remove('mobile-menu-open');
        
        // Resetear icono
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    };

    // Toggle del menú
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle clases
            nav.classList.toggle('nav-active');
            body.classList.toggle('mobile-menu-open');
            
            // Toggle Icono (Hamburguesa <-> X)
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (nav.classList.contains('nav-active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Cerrar menú al hacer clic en un enlace
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('nav-active')) {
                    setTimeout(closeMobileMenu, 300); // Pequeño retraso para suavidad
                }
            });
        });

        // Cerrar al hacer clic fuera (en el backdrop)
        if (mobileBackdrop) {
            mobileBackdrop.addEventListener('click', closeMobileMenu);
        }

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('nav-active')) {
                closeMobileMenu();
            }
        });
        
        // Cerrar al redimensionar la pantalla (volver a escritorio)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1024 && nav.classList.contains('nav-active')) {
                closeMobileMenu();
            }
        });
    }

    /* =========================================
       2. LANGUAGE SWITCHER
       ========================================= */
    const switchButton = document.getElementById('switchButton');
    const languageDropdown = document.getElementById('languageDropdown'); // Si existe el HTML complejo
    const currentLang = document.getElementById('currentLang'); // El texto "EN" o "CS"
    
    if (switchButton) {
        switchButton.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Si existe el dropdown complejo (versión ourSpecialist.html)
            if (languageDropdown) {
                const isVisible = languageDropdown.style.display === 'block';
                languageDropdown.style.display = isVisible ? 'none' : 'block';
                this.classList.toggle('active');
            } else {
                // Fallback simple para páginas sin dropdown HTML
                alert("Language feature coming soon / Funkce jazyka již brzy.");
            }
        });

        // Lógica si existe el dropdown
        if (languageDropdown && currentLang) {
            languageDropdown.querySelectorAll('div[data-lang]').forEach(item => {
                item.addEventListener('click', function() {
                    const lang = this.getAttribute('data-lang');
                    // Actualizar texto si existe el span, si no, buscar dentro del botón
                    if(currentLang) {
                        currentLang.textContent = lang.toUpperCase();
                    } else {
                        switchButton.innerHTML = `<i class="fas fa-globe"></i> ${lang.toUpperCase()}`;
                    }
                    
                    languageDropdown.style.display = 'none';
                    switchButton.classList.remove('active');
                    alert('Language switched to: ' + lang.toUpperCase());
                });
            });

            // Cerrar dropdown al hacer clic fuera
            document.addEventListener('click', function() {
                languageDropdown.style.display = 'none';
                switchButton.classList.remove('active');
            });
        }
    }

    /* =========================================
       3. COOKIE BANNER
       ========================================= */
    const cookieBanner = document.getElementById("cookieBanner");
    const acceptCookiesBtn = document.getElementById("acceptCookies");
    const manageCookiesBtn = document.getElementById("manageCookies");

    if (cookieBanner && acceptCookiesBtn) {
        // Verificar LocalStorage
        if (!localStorage.getItem("cookiesAccepted")) {
            setTimeout(() => {
                // Usamos style display o clase show según tu CSS
                cookieBanner.style.display = "block"; 
                // Si usas clase para animación:
                // cookieBanner.classList.add("show");
            }, 1000); 
        } else {
             cookieBanner.style.display = "none";
        }

        acceptCookiesBtn.addEventListener("click", function() {
            localStorage.setItem("cookiesAccepted", "true");
            cookieBanner.style.display = "none";
        });

        if (manageCookiesBtn) {
            manageCookiesBtn.addEventListener("click", function() {
                alert("Cookie preferences settings would open here.");
            });
        }
    }

    /* =========================================
       4. PAGE SPECIFIC: PATIENT PORTAL LOGIN
       (Solo se ejecuta si existe el formulario)
       ========================================= */
    const loginForm = document.getElementById('loginForm') || document.querySelector('.portal-login');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            // Simulación de carga visual
            btn.innerText = "Authenticating...";
            btn.style.opacity = "0.7";
            btn.disabled = true;
            
            setTimeout(() => {
                alert("Login Successful (Simulation)\nWelcome back to Medic AI Portal.");
                // Resetear botón
                btn.innerText = originalText;
                btn.style.opacity = "1";
                btn.disabled = false;
                
                // Opcional: Redirigir al home o dashboard
                // window.location.href = 'index.html';
            }, 1500);
        });
    }

});