/* ===== GLOBAL HELPER FUNCTIONS ===== */
// (Se definen fuera para que estén disponibles)

/**
 * Debounce: Retrasa la ejecución de una función hasta que haya pasado
 * un tiempo sin que se llame. Útil para eventos como 'resize'.
 */
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

/**
 * Throttle: Limita la ejecución de una función a una vez
 * cada X milisegundos. Útil para eventos como 'scroll'.
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}


/* ===== MAIN SCRIPT (RUNS AFTER DOM LOADS) ===== */
document.addEventListener('DOMContentLoaded', function() {

    const body = document.body;

    // ===== 1. HEADER RESPONSIVENESS & MOBILE MENU =====
    // (Usamos la versión avanzada que clona los header-tools)

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    const headerTools = document.querySelector('.header-tools');

    // Crear el fondo oscuro (backdrop) para el menú móvil
    const mobileBackdrop = document.createElement('div');
    mobileBackdrop.className = 'mobile-menu-backdrop';
    body.appendChild(mobileBackdrop);

    // Helper function para cerrar el menú
    const closeMobileMenu = () => {
        nav.classList.remove('mobile-active');
        body.classList.remove('mobile-menu-open');
        
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        
        // Eliminar las herramientas clonadas
        const mobileHeaderTools = nav.querySelector('.mobile-header-tools');
        if (mobileHeaderTools) {
            mobileHeaderTools.remove();
        }
        if (headerTools) {
            headerTools.classList.remove('mobile-moved');
        }
    };

    if (mobileMenuBtn && nav && headerTools) {
        
        // Abrir/Cerrar con el botón de hamburguesa
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            nav.classList.toggle('mobile-active');
            body.classList.toggle('mobile-menu-open');
            
            const icon = mobileMenuBtn.querySelector('i');
            
            if (nav.classList.contains('mobile-active')) {
                // --- Abrir Menú ---
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                
                // Clonar header-tools y meterlos en el nav
                if (!headerTools.classList.contains('mobile-moved')) {
                    const clonedHeaderTools = headerTools.cloneNode(true);
                    clonedHeaderTools.classList.add('mobile-header-tools');
                    
                    // Aplicar estilos para que se vea bien en el menú
                    clonedHeaderTools.style.display = 'block';
                    clonedHeaderTools.style.padding = '20px';
                    clonedHeaderTools.style.borderTop = '1px solid var(--background-grey, #eee)';
                    clonedHeaderTools.style.background = 'white';
                    
                    const searchForm = clonedHeaderTools.querySelector('.search-form');
                    if (searchForm) {
                        searchForm.style.marginBottom = '15px';
                        searchForm.style.width = '100%';
                    }
                    
                    clonedHeaderTools.querySelectorAll('.btn, .language-button').forEach(el => {
                        el.style.width = '100%';
                        el.style.justifyContent = 'center';
                        el.style.marginBottom = '10px';
                    });
                    
                    nav.appendChild(clonedHeaderTools);
                    headerTools.classList.add('mobile-moved');
                    
                    // Volver a configurar el listener del idioma para el botón clonado
                    // Asumimos que los IDs se clonan, necesitamos una forma más robusta
                    // Pero para este caso, re-configuramos el *nuevo* botón
                    const newLangBtn = clonedHeaderTools.querySelector('.language-button');
                    const newLangDropdown = clonedHeaderTools.querySelector('.language-dropdown');
                    const newLangCurrent = clonedHeaderTools.querySelector('#currentLang'); // ID duplicado, pero lo manejamos
                    
                    if (newLangBtn && newLangDropdown && newLangCurrent) {
                         // Damos IDs únicos temporales si es necesario, o usamos clases
                         // Por ahora, solo re-adjuntamos el listener
                         newLangBtn.addEventListener('click', (ev) => {
                             ev.stopPropagation();
                             newLangBtn.classList.toggle('active');
                         });
                         newLangDropdown.querySelectorAll('div[data-lang]').forEach(item => {
                             item.addEventListener('click', () => {
                                const lang = item.getAttribute('data-lang');
                                // Actualizar AMBOS textos de idioma
                                document.querySelectorAll('#currentLang').forEach(sp => sp.textContent = lang.toUpperCase());
                                newLangBtn.classList.remove('active');
                                alert('Language changed to: ' + lang);
                                closeMobileMenu(); // Cerrar menú al seleccionar
                             });
                         });
                    }
                }
            } else {
                // --- Cerrar Menú ---
                closeMobileMenu();
            }
        });

        // Cerrar al hacer clic en un enlace del nav
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('mobile-active')) {
                    // Retraso para que el scroll suave funcione antes de cerrar
                    setTimeout(closeMobileMenu, 300);
                }
            });
        });

        // Cerrar al hacer clic en el fondo (backdrop)
        mobileBackdrop.addEventListener('click', closeMobileMenu);

        // Cerrar con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('mobile-active')) {
                closeMobileMenu();
            }
        });
    }

    // ===== 2. COOKIE BANNER =====
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookies = document.getElementById('acceptCookies');
    const manageCookies = document.getElementById('manageCookies');
    
    if (cookieBanner && acceptCookies) {
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => {
                cookieBanner.style.display = 'block';
            }, 1000);
        }
        
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.style.display = 'none';
        });
        
        if (manageCookies) {
            manageCookies.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Cookie management functionality would be implemented here.');
            });
        }
    }

    // ===== 3. FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const purpose = document.getElementById('purpose');
            
            if (!name || !email || !purpose) return;
            
            let isValid = true;
            let errorMessages = [];
            
            [name, email, purpose].forEach(field => {
                if (field) field.style.borderColor = '';
            });
            
            if (!name.value.trim()) {
                name.style.borderColor = 'red';
                isValid = false;
                errorMessages.push('Name is required.');
            }
            
            if (!email.value.trim()) {
                email.style.borderColor = 'red';
                isValid = false;
                errorMessages.push('Email is required.');
            } else {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email.value)) {
                    email.style.borderColor = 'red';
                    isValid = false;
                    errorMessages.push('Please enter a valid email address.');
                }
            }
            
            if (!purpose.value) {
                purpose.style.borderColor = 'red';
                isValid = false;
                errorMessages.push('Please select a reason for contact.');
            }
            
            if (!isValid) {
                // Usamos el primer error para la alerta
                alert(errorMessages[0]);
                return;
            }
            
            alert('Thank you for your message. We will be in touch soon.');
            contactForm.reset();
        });
    }

    // ===== 4. SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#' || targetId === '#0') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.getElementById('header')?.offsetHeight || 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // history.pushState(null, null, targetId); // Opcional
            }
        });
    });

    // ===== 5. LANGUAGE DROPDOWN (Desktop) =====
    // Esta función configura el *original* (no el clonado)
    const setupLanguageDropdown = (buttonId, dropdownId, currentLangId) => {
        const switchButton = document.getElementById(buttonId);
        const languageDropdown = document.getElementById(dropdownId);
        
        if (switchButton && languageDropdown) {
            switchButton.addEventListener('click', (e) => {
                e.stopPropagation();
                switchButton.classList.toggle('active');
            });
            
            languageDropdown.querySelectorAll('div[data-lang]').forEach(item => {
                item.addEventListener('click', function() {
                    const lang = this.getAttribute('data-lang');
                    
                    // Actualizar todos los displays de idioma (original y clonado)
                    document.querySelectorAll('#' + currentLangId).forEach(display => {
                        display.textContent = lang.toUpperCase();
                    });
                    
                    switchButton.classList.remove('active');
                    alert('Language changed to: ' + lang);
                });
            });
        }
    };
    
    // Configurar el botón de idioma de escritorio
    setupLanguageDropdown('switchButton', 'languageDropdown', 'currentLang');

    // Cerrar dropdowns (menú de idioma) al hacer clic fuera
    document.addEventListener('click', () => {
        document.querySelectorAll('.language-button.active').forEach(button => {
            button.classList.remove('active');
        });
    });

    // Cerrar dropdowns con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.language-button.active').forEach(button => {
                button.classList.remove('active');
            });
        }
    });

    // ===== 6. SEARCH FUNCTIONALITY =====
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm) {
        const searchInput = searchForm.querySelector('input[type="search"]');
        const searchBtn = searchForm.querySelector('.search-btn');
        
        searchForm.addEventListener('submit', function(e) {
            const searchTerm = searchInput.value.trim();
            if (!searchTerm) {
                e.preventDefault(); // Prevenir envío si está vacío
                searchInput.focus();
                return;
            }
            
            // Simulación de búsqueda (la página recargará)
            if (searchBtn) {
                searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                searchBtn.disabled = true;
            }
        });
        
        if (searchInput) {
            searchInput.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            searchInput.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        }
    }

    // ===== 7. ANIMATION ON SCROLL =====
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target); // Dejar de observar una vez que aparece
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ===== 8. WINDOW RESIZE HANDLER =====
    // Usamos la función debounce definida al inicio
    window.addEventListener('resize', debounce(function() {
        // Cerrar menú móvil si la pantalla se agranda
        if (window.innerWidth > 768 && nav && nav.classList.contains('mobile-active')) {
            closeMobileMenu();
        }
    }, 250));

    // ===== 9. ENHANCE ACCESSIBILITY =====
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click(); // Simular clic al presionar Enter o Espacio
            }
        });
    }

    // ===== 10. PERFORMANCE (Lazy loading) =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src; // Cargar imagen
                    img.removeAttribute('data-src'); // Limpiar
                    img.classList.remove('lazy'); // Quitar clase 'lazy'
                    imageObserver.unobserve(img); // Dejar de observar
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    
});