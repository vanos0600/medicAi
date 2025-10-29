// --- Mobile Menu Logic ---
const navLinks = document.querySelector('.nav-links');
const openBtn = document.getElementById('mobile-menu-open');
const closeBtn = document.getElementById('mobile-menu-close');
const backdrop = document.getElementById('mobile-menu-backdrop');

function toggleMenu() {
    const isActive = navLinks.classList.toggle('active');
    backdrop.classList.toggle('active');
    // Ensure the close button is visible when the menu is active
    if (isActive) {
        document.body.appendChild(closeBtn);
    }
}

// Event listeners for menu open, close, and backdrop click
openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
backdrop.addEventListener('click', toggleMenu); 

// Close menu when a navigation link is clicked
navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});


// --- Language Dropdown Logic ---
const langToggleDesktop = document.getElementById('language-toggle-desktop');
const langToggleMobile = document.getElementById('language-toggle-mobile');

// Unified function to handle dropdown toggle
function setupDropdown(buttonElement) {
    if (buttonElement) {
        buttonElement.addEventListener('click', (e) => {
            // Stop click from propagating up (which would close the mobile menu)
            e.stopPropagation(); 
            
            // Toggle the 'active' class on the clicked button
            buttonElement.classList.toggle('active');
            
            // Close the other dropdown if it's open
            const otherButton = buttonElement === langToggleDesktop ? langToggleMobile : langToggleDesktop;
            if (otherButton && otherButton.classList.contains('active')) {
                otherButton.classList.remove('active');
            }
        });
    }
}

setupDropdown(langToggleDesktop);
setupDropdown(langToggleMobile);

// Close dropdowns when clicking anywhere else on the document
document.addEventListener('click', (e) => {
    if (langToggleDesktop && !langToggleDesktop.contains(e.target)) {
        langToggleDesktop.classList.remove('active');
    }
    if (langToggleMobile && !langToggleMobile.contains(e.target)) {
        langToggleMobile.classList.remove('active');
    }
});

        // Cookie Banner
        const cookieBanner = document.getElementById('cookieBanner');
        const acceptCookies = document.getElementById('acceptCookies');
        const manageCookies = document.getElementById('manageCookies');
        
        // Check if user has already accepted cookies
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => {
                cookieBanner.style.display = 'block';
            }, 1000);
        }
        
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.style.display = 'none';
        });
        
        manageCookies.addEventListener('click', () => {
            // Here you would typically show more detailed cookie preferences
            alert('Cookie management functionality would be implemented here.');
        });

        // Form Validation
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const purpose = document.getElementById('purpose').value;
            
            if (!name || !email || !purpose) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // If validation passes, show success message
            alert('Thank you for your message. We will be in touch soon.');
            contactForm.reset();
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Animation on scroll
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                }
            });
        }, {
            threshold: 0.1
        });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    
        // Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const mobileBackdrop = document.createElement('div');
    const mobileCloseBtn = document.createElement('button');
    
    // Create mobile menu backdrop
    mobileBackdrop.className = 'mobile-menu-backdrop';
    document.body.appendChild(mobileBackdrop);
    
    // Create close button for mobile menu
    mobileCloseBtn.className = 'mobile-close-btn';
    mobileCloseBtn.innerHTML = '✕';
    navLinks.appendChild(mobileCloseBtn);
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        mobileBackdrop.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }
    
    // Event listeners
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileCloseBtn.addEventListener('click', toggleMobileMenu);
    mobileBackdrop.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on links (optional)
    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMobileMenu();
            }
        });
    });
    
    // Language dropdown functionality
    const languageButton = document.querySelector('.language-button');
    if (languageButton) {
        languageButton.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            languageButton.classList.remove('active');
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            mobileBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});