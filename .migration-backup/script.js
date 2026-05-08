// Utility: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility: Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Carousel Functionality
class Carousel {
    constructor(container) {
        this.track = document.getElementById('carouselTrack');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dotsContainer = document.getElementById('carouselDots');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentIndex = 0;
        this.autoSlideInterval = null;
        this.autoSlideDelay = 5000; // 5 seconds
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        // Create dots
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        
        // Button event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Auto-slide
        this.startAutoSlide();
        
        // Pause on hover
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', () => this.stopAutoSlide());
        carouselContainer.addEventListener('mouseleave', () => this.startAutoSlide());
        
        // Touch/swipe support
        this.addTouchSupport();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateCarousel();
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateCarousel();
    }
    
    updateCarousel() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        requestAnimationFrame(() => {
            const translateX = -this.currentIndex * 100;
            this.track.style.transform = `translate3d(${translateX}%, 0, 0)`;
            
            // Update dots
            const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
            
            // Reset transition flag after animation
            setTimeout(() => {
                this.isTransitioning = false;
            }, 600);
            
            // Reset auto-slide timer
            this.resetAutoSlide();
        });
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoSlideDelay);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    
    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
    
    addTouchSupport() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.stopAutoSlide();
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            currentX = e.touches[0].clientX;
            const diffX = currentX - startX;
            const translateX = -this.currentIndex * 100 + (diffX / this.track.offsetWidth) * 100;
            this.track.style.transform = `translate3d(${translateX}%, 0, 0)`;
            this.track.style.transition = 'none';
        }, { passive: false });
        
        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            this.track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            const diffX = currentX - startX;
            const threshold = 50; // Minimum swipe distance
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            } else {
                this.updateCarousel();
            }
            
            this.startAutoSlide();
        });
    }
}

// Smooth Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu.querySelectorAll('a');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking on theme toggle (mobile)
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                // Only close menu on mobile
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Observe sections for animation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel
    new Carousel();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect (throttled for performance)
    const navbar = document.querySelector('.navbar');
    
    const updateNavbar = throttle(() => {
        const currentScroll = window.pageYOffset;
        
        requestAnimationFrame(() => {
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.9)';
            } else {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.8)';
            }
        });
    }, 100);
    
    window.addEventListener('scroll', updateNavbar, { passive: true });
    
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Contact form handling with EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Using EmailJS to send email
                // IMPORTANT: You need to set up EmailJS first (see CONTACT_FORM_SETUP.md)
                // Replace these with your EmailJS credentials after signing up:
                const emailjsConfig = {
                    serviceId: 'YOUR_SERVICE_ID',      // Replace with your EmailJS Service ID
                    templateId: 'YOUR_TEMPLATE_ID',  // Replace with your EmailJS Template ID
                    publicKey: 'YOUR_PUBLIC_KEY'      // Replace with your EmailJS Public Key
                };
                
                // Check if EmailJS is loaded and credentials are set
                if (typeof emailjs !== 'undefined' && 
                    emailjsConfig.serviceId !== 'YOUR_SERVICE_ID' && 
                    emailjsConfig.templateId !== 'YOUR_TEMPLATE_ID' &&
                    emailjsConfig.publicKey !== 'YOUR_PUBLIC_KEY') {
                    
                    // Initialize EmailJS
                    emailjs.init(emailjsConfig.publicKey);
                    
                    // Send email
                    await emailjs.send(
                        emailjsConfig.serviceId,
                        emailjsConfig.templateId,
                        {
                            from_name: data.name,
                            from_phone: data.phone || 'Not provided',
                            message: data.message,
                            to_email: 'infocontrator@gmail.com',
                            reply_to: data.phone || 'infocontrator@gmail.com'
                        }
                    );
                    
                    console.log('Email sent successfully!');
                } else {
                    // Fallback: Log to console if EmailJS not configured
                    console.log('EmailJS not configured. Form data:', data);
                    console.log('To receive emails, set up EmailJS (see CONTACT_FORM_SETUP.md)');
                    // Still show success to user, but log that setup is needed
                }
                
                // Option 2: Using Formspree (Alternative - also free)
                // Sign up at https://formspree.io/ and replace YOUR_FORM_ID with your form ID
                /*
                const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                if (!response.ok) throw new Error('Failed to send');
                */
                
                // Option 3: Using your own backend API
                /*
                const response = await fetch('YOUR_API_ENDPOINT', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                if (!response.ok) throw new Error('Failed to send');
                */
                
                // For now, log the data (you'll receive it in console)
                console.log('Form Data:', data);
                console.log('To receive emails, set up EmailJS or Formspree (see instructions in script.js)');
                
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                
            } catch (error) {
                console.error('Error sending form:', error);
                alert('Sorry, there was an error sending your message. Please try again or contact us directly at infocontrator@gmail.com');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Parallax effect (only on desktop, disabled on mobile for performance)
let parallaxEnabled = window.innerWidth > 768;
const updateParallax = throttle(() => {
    if (!parallaxEnabled) return;
    
    requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
        }
    });
}, 16);

window.addEventListener('scroll', updateParallax, { passive: true });

// Disable parallax on mobile resize
window.addEventListener('resize', debounce(() => {
    parallaxEnabled = window.innerWidth > 768;
    if (!parallaxEnabled) {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = 'translate3d(0, 0, 0)';
        }
    }
}, 250));

