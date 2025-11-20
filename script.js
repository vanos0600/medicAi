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

/* ===== MAIN SCRIPT ===== */
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;

    // ===== 1. MOBILE MENU LOGIC (Simplified & Robust) =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn'); // Use class selector
    const nav = document.querySelector('nav'); // Select nav directly
    
    // Create backdrop if it doesn't exist
    let backdrop = document.querySelector('.mobile-menu-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'mobile-menu-backdrop';
        body.appendChild(backdrop);
    }

    function toggleMenu() {
        if (!nav) return;
        
        nav.classList.toggle('active'); // Use 'active' instead of 'mobile-active' to match new CSS
        body.classList.toggle('mobile-menu-open');

        // Toggle Icon
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

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Close on backdrop click
        backdrop.addEventListener('click', function() {
            if (nav.classList.contains('active')) toggleMenu();
        });

        // Close on link click
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) toggleMenu();
            });
        });
    }

    // ===== 2. LANGUAGE SWITCHER =====
    const switchButton = document.getElementById('switchButton');
    const currentLang = document.getElementById('currentLang');
    
    if (switchButton) {
        switchButton.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });
        
        // Close on click outside
        document.addEventListener('click', () => {
            switchButton.classList.remove('active');
        });

        // Handle selection
        const langOptions = document.querySelectorAll('.language-dropdown div');
        langOptions.forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                if (currentLang) currentLang.textContent = lang.toUpperCase();
                //alert('Language switched to ' + lang); // Optional feedback
            });
        });
    }

    // ===== 3. COOKIE BANNER =====
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookies = document.getElementById('acceptCookies');
    
    if (cookieBanner && acceptCookies && !localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.style.transform = 'translateY(0)'; // Slide up
        }, 1000);
        
        acceptCookies.addEventListener('click', () => {
            cookieBanner.style.transform = 'translateY(100%)'; // Slide down
            localStorage.setItem('cookiesAccepted', 'true');
        });
    }

    // ===== 4. WINDOW RESIZE (Debounced) =====
    window.addEventListener('resize', debounce(function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 1024 && nav && nav.classList.contains('active')) {
            toggleMenu(); // Resets classes
        }
    }, 250));

    // ===== 5. LAZY LOADING (Performance) =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if(img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }

    // ===== 6. SIMPLE FORM VALIDATION (Contact) =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your validation logic or submission here
            alert('Thank you! Message sent.');
            this.reset();
        });
    }
});