document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE MENU FUNCTIONALITY =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('mobile-active');
            
            // Change hamburger to X icon
            const icon = mobileMenuBtn.querySelector('i');
            if (nav.classList.contains('mobile-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('#nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('mobile-active')) {
                    nav.classList.remove('mobile-active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('mobile-active') && 
                !nav.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                nav.classList.remove('mobile-active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('mobile-active')) {
                nav.classList.remove('mobile-active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== COOKIE BANNER =====
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookies = document.getElementById('acceptCookies');
    const manageCookies = document.getElementById('manageCookies');
    
    if (cookieBanner && acceptCookies) {
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
        
        if (manageCookies) {
            manageCookies.addEventListener('click', (e) => {
                e.preventDefault();
                // Here you would typically show more detailed cookie preferences
                alert('Cookie management functionality would be implemented here.');
            });
        }
    }

    // ===== FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const purpose = document.getElementById('purpose');
            
            if (!name || !email || !purpose) return;
            
            let isValid = true;
            let errorMessage = '';
            
            // Reset previous error states
            [name, email, purpose].forEach(field => {
                if (field) field.style.borderColor = '';
            });
            
            // Name validation
            if (!name.value.trim()) {
                name.style.borderColor = 'red';
                isValid = false;
                errorMessage = 'Please fill in all required fields.';
            }
            
            // Email validation
            if (!email.value.trim()) {
                email.style.borderColor = 'red';
                isValid = false;
                errorMessage = 'Please fill in all required fields.';
            } else {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email.value)) {
                    email.style.borderColor = 'red';
                    isValid = false;
                    errorMessage = 'Please enter a valid email address.';
                }
            }
            
            // Purpose validation
            if (!purpose.value) {
                purpose.style.borderColor = 'red';
                isValid = false;
                errorMessage = 'Please select a reason for contact.';
            }
            
            if (!isValid) {
                alert(errorMessage);
                return;
            }
            
            // If validation passes, show success message
            alert('Thank you for your message. We will be in touch soon.');
            contactForm.reset();
        });
    }

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#' || targetId === '#0') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset considering fixed header
                const headerHeight = document.getElementById('header')?.offsetHeight || 100;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });

    // ===== LANGUAGE DROPDOWN =====
    const switchButton = document.getElementById('switchButton');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLang = document.getElementById('currentLang');
    
    if (switchButton && languageDropdown) {
        switchButton.addEventListener('click', function(e) {
            e.stopPropagation();
            switchButton.classList.toggle('active');
        });
        
        // Select language
        languageDropdown.querySelectorAll('div[data-lang]').forEach(item => {
            item.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                if (currentLang) {
                    currentLang.textContent = lang.toUpperCase();
                }
                switchButton.classList.remove('active');
                
                // Here you would typically implement actual language switching
                console.log('Language changed to:', lang);
                // For now, just show an alert
                alert('Language changed to: ' + lang);
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            switchButton.classList.remove('active');
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                switchButton.classList.remove('active');
            }
        });
    }

    // ===== SEARCH FUNCTIONALITY =====
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm) {
        const searchInput = searchForm.querySelector('input[type="search"]');
        const searchBtn = searchForm.querySelector('.search-btn');
        
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchTerm = searchInput.value.trim();
            if (!searchTerm) {
                searchInput.focus();
                return;
            }
            
            // Add loading state
            if (searchBtn) {
                const originalHtml = searchBtn.innerHTML;
                searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                searchBtn.disabled = true;
                
                // Simulate search processing
                setTimeout(() => {
                    // Perform actual search - for now just submit the form
                    searchForm.submit();
                    
                    // Restore button (though page will reload on submit)
                    searchBtn.innerHTML = originalHtml;
                    searchBtn.disabled = false;
                }, 1000);
            } else {
                searchForm.submit();
            }
        });
        
        // Enhance search input
        searchInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }

    // ===== ANIMATION ON SCROLL =====
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
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

    // ===== WINDOW RESIZE HANDLER =====
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Close mobile menu on resize to larger screens
            if (window.innerWidth > 768 && nav && nav.classList.contains('mobile-active')) {
                nav.classList.remove('mobile-active');
                const icon = mobileMenuBtn?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            }
        }, 250);
    });

    // ===== ENHANCE ACCESSIBILITY =====
    // Add keyboard navigation for mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ===== GLOBAL FUNCTIONS =====
// Debounce function for performance
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

// Throttle function for scroll events
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
// ===== HEADER RESPONSIVENESS - NO HTML CHANGES =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    const headerTools = document.querySelector('.header-tools');
    const body = document.body;

    // Create mobile backdrop element
    const mobileBackdrop = document.createElement('div');
    mobileBackdrop.className = 'mobile-menu-backdrop';
    document.body.appendChild(mobileBackdrop);

    // Mobile menu functionality
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpening = !nav.classList.contains('mobile-active');
            
            nav.classList.toggle('mobile-active');
            body.classList.toggle('mobile-menu-open');
            
            // Change hamburger to X icon
            const icon = mobileMenuBtn.querySelector('i');
            if (nav.classList.contains('mobile-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                
                // Move header tools into mobile menu visually
                if (headerTools && !headerTools.classList.contains('mobile-moved')) {
                    // Clone header tools and append to nav for mobile
                    const clonedHeaderTools = headerTools.cloneNode(true);
                    clonedHeaderTools.classList.add('mobile-header-tools');
                    clonedHeaderTools.style.display = 'block';
                    clonedHeaderTools.style.padding = '20px';
                    clonedHeaderTools.style.borderTop = '1px solid var(--background-grey)';
                    clonedHeaderTools.style.background = 'white';
                    
                    // Style the cloned elements for mobile
                    const searchForm = clonedHeaderTools.querySelector('.search-form');
                    if (searchForm) {
                        searchForm.style.marginBottom = '15px';
                        searchForm.style.width = '100%';
                    }
                    
                    const buttons = clonedHeaderTools.querySelectorAll('.btn');
                    buttons.forEach(btn => {
                        btn.style.width = '100%';
                        btn.style.justifyContent = 'center';
                        btn.style.marginBottom = '10px';
                    });
                    
                    const languageButton = clonedHeaderTools.querySelector('.language-button');
                    if (languageButton) {
                        languageButton.style.width = '100%';
                        languageButton.style.justifyContent = 'center';
                    }
                    
                    nav.appendChild(clonedHeaderTools);
                    headerTools.classList.add('mobile-moved');
                }
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                
                // Remove cloned header tools when closing
                const mobileHeaderTools = nav.querySelector('.mobile-header-tools');
                if (mobileHeaderTools) {
                    mobileHeaderTools.remove();
                    headerTools.classList.remove('mobile-moved');
                }
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('#nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (nav.classList.contains('mobile-active')) {
                    // Don't prevent default for anchor links
                    setTimeout(() => {
                        nav.classList.remove('mobile-active');
                        body.classList.remove('mobile-menu-open');
                        const icon = mobileMenuBtn.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                        
                        // Remove cloned header tools
                        const mobileHeaderTools = nav.querySelector('.mobile-header-tools');
                        if (mobileHeaderTools) {
                            mobileHeaderTools.remove();
                            headerTools.classList.remove('mobile-moved');
                        }
                    }, 300);
                }
            });
        });

        // Close mobile menu when clicking on backdrop
        mobileBackdrop.addEventListener('click', function() {
            nav.classList.remove('mobile-active');
            body.classList.remove('mobile-menu-open');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            // Remove cloned header tools
            const mobileHeaderTools = nav.querySelector('.mobile-header-tools');
            if (mobileHeaderTools) {
                mobileHeaderTools.remove();
                headerTools.classList.remove('mobile-moved');
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('mobile-active')) {
                nav.classList.remove('mobile-active');
                body.classList.remove('mobile-menu-open');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                
                // Remove cloned header tools
                const mobileHeaderTools = nav.querySelector('.mobile-header-tools');
                if (mobileHeaderTools) {
                    mobileHeaderTools.remove();
                    headerTools.classList.remove('mobile-moved');
                }
            }
        });
    }

    // Enhanced language dropdown functionality for both desktop and mobile
    function setupLanguageDropdown(buttonId, dropdownId, currentLangId) {
        const switchButton = document.getElementById(buttonId);
        const languageDropdown = document.getElementById(dropdownId);
        const currentLang = document.getElementById(currentLangId);
        
        if (switchButton && languageDropdown) {
            switchButton.addEventListener('click', function(e) {
                e.stopPropagation();
                switchButton.classList.toggle('active');
            });
            
            languageDropdown.querySelectorAll('div[data-lang]').forEach(item => {
                item.addEventListener('click', function() {
                    const lang = this.getAttribute('data-lang');
                    
                    // Update all language displays
                    const allLangDisplays = document.querySelectorAll('[id*="currentLang"], [id*="CurrentLang"]');
                    allLangDisplays.forEach(display => {
                        display.textContent = lang.toUpperCase();
                    });
                    
                    switchButton.classList.remove('active');
                    
                    // Close mobile menu if open
                    if (nav && nav.classList.contains('mobile-active')) {
                        nav.classList.remove('mobile-active');
                        body.classList.remove('mobile-menu-open');
                        const icon = mobileMenuBtn.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                    
                    alert('Language changed to: ' + lang);
                });
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function() {
                switchButton.classList.remove('active');
            });
        }
    }

    // Setup both desktop and any mobile language dropdowns
    setupLanguageDropdown('switchButton', 'languageDropdown', 'currentLang');

    // Window resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Close mobile menu and restore on larger screens
            if (window.innerWidth > 768) {
                if (nav && nav.classList.contains('mobile-active')) {
                    nav.classList.remove('mobile-active');
                    body.classList.remove('mobile-menu-open');
                    const icon = mobileMenuBtn?.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    
                    // Remove any cloned mobile header tools
                    const mobileHeaderTools = nav.querySelector('.mobile-header-tools');
                    if (mobileHeaderTools) {
                        mobileHeaderTools.remove();
                        if (headerTools) {
                            headerTools.classList.remove('mobile-moved');
                        }
                    }
                }
            }
        }, 250);
    });

    // Handle search form in mobile
    document.addEventListener('click', function(e) {
        if (e.target.closest('.search-form') && window.innerWidth <= 768) {
            e.preventDefault();
            // Focus on search input
            const searchInput = e.target.closest('.search-form').querySelector('input[type="search"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
});

// Keep your existing smooth scrolling and other functionality
document.addEventListener('DOMContentLoaded', function() {
    // Your existing smooth scrolling code
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#' || targetId === '#0') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.getElementById('header')?.offsetHeight || 100;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Your existing cookie banner code
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookies = document.getElementById('acceptCookies');
    const manageCookies = document.getElementById('manageCookies');
    
    if (cookieBanner && acceptCookies && !localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.style.display = 'block';
        }, 1000);
        
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

    // Your existing form validation code
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const purpose = document.getElementById('purpose');
            
            if (!name || !email || !purpose) return;
            
            let isValid = true;
            let errorMessage = '';
            
            [name, email, purpose].forEach(field => {
                if (field) field.style.borderColor = '';
            });
            
            if (!name.value.trim()) {
                name.style.borderColor = 'red';
                isValid = false;
                errorMessage = 'Please fill in all required fields.';
            }
            
            if (!email.value.trim()) {
                email.style.borderColor = 'red';
                isValid = false;
                errorMessage = 'Please fill in all required fields.';
            } else {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email.value)) {
                    email.style.borderColor = 'red';
                    isValid = false;
                    errorMessage = 'Please enter a valid email address.';
                }
            }
            
            if (!purpose.value) {
                purpose.style.borderColor = 'red';
                isValid = false;
                errorMessage = 'Please select a reason for contact.';
            }
            
            if (!isValid) {
                alert(errorMessage);
                return;
            }
            
            alert('Thank you for your message. We will be in touch soon.');
            contactForm.reset();
        });
    }
});