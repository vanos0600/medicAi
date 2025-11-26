/**
 * Hospital AI POLYCLINIC - MASTER SCRIPT
 *.
 */

document.addEventListener('DOMContentLoaded', function() {
    
    /* =========================================
       1. MOBILE MENU FUNCTIONALITY
       ========================================= */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    const body = document.body;

    
    let mobileBackdrop = document.querySelector('.mobile-menu-backdrop');
    if (!mobileBackdrop) {
        mobileBackdrop = document.createElement('div');
        mobileBackdrop.className = 'mobile-menu-backdrop';
        body.appendChild(mobileBackdrop);
    }

    
    const closeMobileMenu = () => {
        
        nav.classList.remove('nav-active'); 
        body.classList.remove('mobile-menu-open');
        
        
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    };

    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            
            nav.classList.toggle('nav-active');
            body.classList.toggle('mobile-menu-open');
            
            
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

        
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('nav-active')) {
                    setTimeout(closeMobileMenu, 300); // Pequeño retraso para suavidad
                }
            });
        });

        
        if (mobileBackdrop) {
            mobileBackdrop.addEventListener('click', closeMobileMenu);
        }

        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('nav-active')) {
                closeMobileMenu();
            }
        });
        
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
    const languageDropdown = document.getElementById('languageDropdown'); 
    const currentLang = document.getElementById('currentLang'); 
    
    if (switchButton) {
        switchButton.addEventListener('click', function(e) {
            e.stopPropagation();
            
            
            if (languageDropdown) {
                const isVisible = languageDropdown.style.display === 'block';
                languageDropdown.style.display = isVisible ? 'none' : 'block';
                this.classList.toggle('active');
            } else {
                
                alert("Language feature coming soon / Funkce jazyka již brzy.");
            }
        });

        
        if (languageDropdown && currentLang) {
            languageDropdown.querySelectorAll('div[data-lang]').forEach(item => {
                item.addEventListener('click', function() {
                    const lang = this.getAttribute('data-lang');
                    
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
        
        if (!localStorage.getItem("cookiesAccepted")) {
            setTimeout(() => {
                
                cookieBanner.style.display = "block"; 
               
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
       
       ========================================= */
    const loginForm = document.getElementById('loginForm') || document.querySelector('.portal-login');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            
            btn.innerText = "Authenticating...";
            btn.style.opacity = "0.7";
            btn.disabled = true;
            
            setTimeout(() => {
                alert("Login Successful (Simulation)\nWelcome back to Medic AI Portal.");
                // Resetear botón
                btn.innerText = originalText;
                btn.style.opacity = "1";
                btn.disabled = false;
                
              
            }, 1500);
        });
    }

});