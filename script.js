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
});