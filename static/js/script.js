document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Add class to animate elements when they come into view
    const animateElements = document.querySelectorAll('.hero-content, .hero-image, .feature-card, .step, .testimonial');
    animateElements.forEach(element => {
        element.classList.add('animate-fadeIn');
    });
    
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle between hamburger and close icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Animate nav items
            navItems.forEach((item, index) => {
                if (navLinks.classList.contains('active')) {
                    item.style.transitionDelay = `${0.1 + index * 0.1}s`;
                } else {
                    item.style.transitionDelay = '0s';
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Scroll to the element
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for header height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonialSlider && testimonials.length > 0 && dots.length > 0) {
        // Initialize testimonial sliding
        let currentSlide = 0;
        
        // Update the slider position
        function updateSliderPosition() {
            if (window.innerWidth <= 768) {
                const slideWidth = testimonials[0].offsetWidth + 30; // width + gap
                testimonialSlider.scrollTo({
                    left: slideWidth * currentSlide,
                    behavior: 'smooth'
                });
            }
        }
        
        // Update the active dot
        function updateActiveDot() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Set up dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSliderPosition();
                updateActiveDot();
            });
        });
        
        // Touch/Drag functionality for mobile
        let isDragging = false;
        let startPosition;
        let currentTranslate;
        
        testimonialSlider.addEventListener('touchstart', touchStart);
        testimonialSlider.addEventListener('touchend', touchEnd);
        testimonialSlider.addEventListener('touchmove', touchMove);
        
        testimonialSlider.addEventListener('mousedown', touchStart);
        testimonialSlider.addEventListener('mouseup', touchEnd);
        testimonialSlider.addEventListener('mouseleave', touchEnd);
        testimonialSlider.addEventListener('mousemove', touchMove);
        
        function touchStart(event) {
            isDragging = true;
            startPosition = getPositionX(event);
            testimonialSlider.classList.add('grabbing');
        }
        
        function touchEnd() {
            isDragging = false;
            testimonialSlider.classList.remove('grabbing');
            
            // Determine if we should move to next/prev slide
            if (Math.abs(currentTranslate) > 100) {
                if (currentTranslate < 0 && currentSlide < testimonials.length - 1) {
                    currentSlide++;
                } else if (currentTranslate > 0 && currentSlide > 0) {
                    currentSlide--;
                }
            }
            
            updateSliderPosition();
            updateActiveDot();
        }
        
        function touchMove(event) {
            if (isDragging) {
                const currentPosition = getPositionX(event);
                currentTranslate = currentPosition - startPosition;
            }
        }
        
        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        }
        
        // Auto scroll testimonials every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            updateSliderPosition();
            updateActiveDot();
        }, 5000);
    }
    
    // Add animation to elements when they enter the viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .step, .testimonial, .about-content, .cta').forEach(element => {
        observer.observe(element);
    });
    
    // Add pulse animation to download buttons
    const downloadButtons = document.querySelectorAll('.download-button');
    downloadButtons.forEach(button => {
        button.classList.add('animate-pulse');
    });
    
    // Current year for footer copyright
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
    
    // Email notification form handling
    const notifyForm = document.getElementById('notify-form');
    const notificationMessage = document.getElementById('notification-message');
    
    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('notify-email');
            const email = emailInput.value.trim();
            
            if (email) {
                // Send the email to the backend
                fetch('/notify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        notificationMessage.textContent = data.message;
                        notificationMessage.style.backgroundColor = "rgba(46, 204, 113, 0.15)";
                        notificationMessage.style.color = "#2ecc71";
                        notificationMessage.style.border = "1px solid #2ecc71";
                    } else {
                        notificationMessage.textContent = data.message;
                        notificationMessage.style.backgroundColor = "rgba(231, 76, 60, 0.15)";
                        notificationMessage.style.color = "#e74c3c";
                        notificationMessage.style.border = "1px solid #e74c3c";
                    }
                    
                    notificationMessage.style.display = "block";
                    emailInput.value = '';
                    
                    // Hide the message after 5 seconds
                    setTimeout(function() {
                        notificationMessage.style.display = "none";
                    }, 5000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    notificationMessage.textContent = "Thank you! We'll notify you when InsectiScan is ready.";
                    notificationMessage.style.backgroundColor = "rgba(46, 204, 113, 0.15)";
                    notificationMessage.style.color = "#2ecc71";
                    notificationMessage.style.border = "1px solid #2ecc71";
                    notificationMessage.style.display = "block";
                    emailInput.value = '';
                    
                    // Hide the message after 5 seconds
                    setTimeout(function() {
                        notificationMessage.style.display = "none";
                    }, 5000);
                });
            }
        });
    }
});
