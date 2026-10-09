/**
 * Reliable Land Survey Consultancy
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       1. NAVBAR SCROLL LOGIC
    ========================================== */
    const topBar = document.querySelector('.top-bar-exact');
    const navBar = document.querySelector('.nav-exact');

    function handleScroll() {
        if (window.scrollY > 50) {
            if (topBar) topBar.classList.add('scrolled');
            if (navBar) navBar.classList.add('scrolled');
        } else {
            if (topBar) topBar.classList.remove('scrolled');
            if (navBar) navBar.classList.remove('scrolled');
        }
    }

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', handleScroll, {passive: true
    /* ==========================================
       12. DIRECT EMAIL FORM SUBMISSION TO tanviii6104@gmail.com
    ========================================== */
    function setupFormSubmit(formId, statusId, btnId, successMsg) {
        var form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var btn = document.getElementById(btnId) || form.querySelector('button[type="submit"]');
            var statusBox = document.getElementById(statusId);
            var originalText = btn ? btn.innerHTML : 'Submit';

            if (btn) {
                btn.disabled = true;
                btn.style.opacity = '0.75';
                btn.style.cursor = 'not-allowed';
                btn.innerHTML = 'Submitting...';
            }

            if (statusBox) {
                statusBox.style.display = 'none';
            }

            var formData = new FormData(form);

            fetch('https://formsubmit.co/ajax/tanviii6104@gmail.com', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(function(res) {
                return res.json();
            })
            .then(function(data) {
                if (statusBox) {
                    statusBox.style.display = 'block';
                    statusBox.style.background = '#ecfdf5';
                    statusBox.style.border = '1.5px solid #10b981';
                    statusBox.style.color = '#065f46';
                    statusBox.innerHTML = '<div style="display:flex;align-items:flex-start;gap:12px;">' +
                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;margin-top:2px;"><polyline points="20 6 9 17 4 12"/></svg>' +
                        '<div><strong style="font-size:15px;color:#064e3b;">Submitted Successfully!</strong><br>' +
                        successMsg + '</div></div>';
                    statusBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                form.reset();
            })
            .catch(function(err) {
                console.warn('AJAX fallback to native POST:', err);
                form.submit();
            })
            .finally(function() {
                if (btn) {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                    btn.innerHTML = originalText;
                }
            });
        });
    }

    setupFormSubmit('contactForm', 'contactFormStatus', 'contactSubmitBtn', 'Your project specifications have been submitted directly to our engineering desk (<strong>tanviii6104@gmail.com</strong>). We will review the scope and contact you within 24 hours.');
    setupFormSubmit('reviewForm', 'reviewFormStatus', 'reviewSubmitBtn', 'Thank you for your valuable feedback. Your review has been submitted to <strong>tanviii6104@gmail.com</strong>.');

});

    // Initial check in case page loads scrolled down
    handleScroll();

    // Hamburger Toggle
    const hamburgerBtn = document.querySelector('.hamburger-exact');
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    const navExact = document.querySelector('.nav-exact');

    function closeMobileMenu() {
        if (hamburgerBtn) hamburgerBtn.classList.remove('active');
        if (mobileNavMenu) mobileNavMenu.classList.remove('active');
        if (navExact) navExact.classList.remove('active');
    }

    if (hamburgerBtn && mobileNavMenu) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileNavMenu.classList.contains('active');
            if (!isOpen) {
                hamburgerBtn.classList.add('active');
                mobileNavMenu.classList.add('active');
                if (navExact) navExact.classList.add('active');
            } else {
                closeMobileMenu();
            }
        });

        // Close on clicking outside menu or clicking dark backdrop
        if (navExact) {
            navExact.addEventListener('click', (e) => {
                if (navExact.classList.contains('active')) {
                    if (mobileNavMenu && !mobileNavMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                        closeMobileMenu();
                    }
                }
            });
        }
    }

    // Close Mobile Menu on Link Click (excluding dropdown toggle on mobile)
    document.querySelectorAll('.nav-exact .nav-links a:not(.nav-dropdown-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Mobile Dropdown Toggle
    document.querySelectorAll('.nav-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                e.stopPropagation();
                const parent = toggle.closest('.nav-dropdown');
                if (parent) {
                    parent.classList.toggle('open');
                }
            }
        });
    });

    /* ==========================================
       2. SCROLL ANIMATIONS (Intersection Observer)
    ========================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                // Prevent jitter by only removing animation when scrolling back up (element goes below viewport)
                if (entry.boundingClientRect.top > 0) {
                    entry.target.classList.remove('animate');
                }
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right, .zoom-in, .service-card, .process-step, .deliverable-pill, .why-feature-card, .cap-block, .contact-box-left, .contact-box-right');
    animateElements.forEach(el => scrollObserver.observe(el));

    /* ==========================================
       3. ANIMATED COUNTERS
    ========================================== */
    const counterElements = document.querySelectorAll('.counter-number');
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasCounted) {
            hasCounted = true;
            counterElements.forEach(counter => {
                const targetText = counter.getAttribute('data-target');
                // Extract number part
                const targetNum = parseInt(targetText.replace(/\D/g, ''));
                const suffix = targetText.replace(/[0-9]/g, '');
                
                let startTimestamp = null;
                const duration = 2000; // 2 seconds

                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    
                    // Ease out cubic
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    
                    const currentNum = Math.floor(easeProgress * targetNum);
                    counter.innerText = currentNum + suffix;
                    
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        counter.innerText = targetText;
                    }
                };
                
                window.requestAnimationFrame(step);
            });
        }
    }, { threshold: 0.5 });

    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        counterObserver.observe(counterSection);
    }

    /* ==========================================
       4. PROCESS TIMELINE ANIMATION
    ========================================== */
    const processSection = document.querySelector('.process-section');
    const processTimeline = document.querySelector('.process-timeline');
    const processLineFill = document.querySelector('.process-line-fill');
    
    if (processSection && processTimeline && processLineFill) {
        // Ensure transition is very quick or disabled for scroll-linked animation
        processLineFill.style.transition = 'width 0.1s ease-out';
        
        window.addEventListener('scroll', () => {
            // Get coordinates
            const rect = processTimeline.getBoundingClientRect();
            
            // Calculate how much of the element is visible
            // We want it to start filling when the top of timeline hits middle of screen (or a bit lower)
            // And finish filling when the bottom of timeline is above the middle
            
            const windowHeight = window.innerHeight;
            
            // The point in the viewport where animation starts (e.g., 75% down the screen)
            const triggerPoint = windowHeight * 0.75; 
            
            // Scroll progress percentage
            let progress = 0;
            
            if (rect.top < triggerPoint) {
                const distance = 400; // arbitrary pixel distance for the line to fully draw
                let scrolledPastTrigger = triggerPoint - rect.top;
                progress = (scrolledPastTrigger / distance) * 100;
                
                if (progress < 0) progress = 0;
                if (progress > 100) progress = 100;
            }
            
            if (window.innerWidth <= 768) {
                processLineFill.style.width = '4px';
                processLineFill.style.height = progress + '%';
            } else {
                processLineFill.style.height = '4px';
                processLineFill.style.width = progress + '%';
            }
        });
    }

    /* ==========================================
       5. TECHNOLOGY INTERACTIVE SECTION
    ========================================== */
    const techItems = document.querySelectorAll('.tech-item');
    const techPreviewImg = document.querySelector('.tech-preview-img');
    const techPreviewTitle = document.querySelector('.tech-preview-title');
    const techPreviewDesc = document.querySelector('.tech-preview-desc');

    if (techItems.length > 0) {
        techItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                // Remove active class from all
                techItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to hovered
                this.classList.add('active');
                
                // Update Preview Pane
                const targetImg = this.getAttribute('data-img');
                const targetTitle = this.querySelector('.tech-item-name').innerText;
                const targetDesc = this.getAttribute('data-desc');
                
                // Simple fade effect
                techPreviewImg.style.opacity = '0';
                setTimeout(() => {
                    techPreviewImg.src = targetImg;
                    techPreviewTitle.innerText = targetTitle;
                    techPreviewDesc.innerText = targetDesc;
                    techPreviewImg.style.opacity = '1';
                }, 200);
            });
        });
    }

    /* ==========================================
       6. TESTIMONIAL CAROUSEL
    ========================================== */
    const track = document.querySelector('.testimonial-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        const cards = Array.from(track.children);
        
        // Calculate cards to show based on screen size
        const getCardsToShow = () => {
            if (window.innerWidth <= 767) return 1;
            if (window.innerWidth <= 1023) return 2;
            return 3;
        };

        const updateCarousel = () => {
            const cardsToShow = getCardsToShow();
            const maxIndex = Math.max(0, cards.length - cardsToShow);
            
            // Ensure index is in bounds
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;
            
            const cardWidth = cards[0].getBoundingClientRect().width;
            const gap = 30; // gap from CSS
            const offset = currentIndex * (cardWidth + gap);
            
            track.style.transform = `translateX(-${offset}px)`;
            
            // Update button states
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
            
            nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
            nextBtn.style.cursor = currentIndex === maxIndex ? 'not-allowed' : 'pointer';
        };

        nextBtn.addEventListener('click', () => {
            const maxIndex = Math.max(0, cards.length - getCardsToShow());
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        // Handle Resize
        window.addEventListener('resize', () => {
            updateCarousel();
        });
        
        // Init
        updateCarousel();
    }

    /* ==========================================
       7. ENQUIRY FORM VALIDATION
    ========================================== */
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('phone');
            const alertBox = document.getElementById('formAlert');
            
            // Basic Validation
            if (!nameInput.value.trim() || !phoneInput.value.trim()) {
                alertBox.className = 'form-alert error';
                alertBox.innerText = 'Please fill in all required fields (Name and Phone).';
                alertBox.style.display = 'block';
                return;
            }
            
            // Show Success Message (Demo Front-end)
            alertBox.className = 'form-alert success';
            alertBox.innerText = 'Thank you. Your enquiry has been submitted.';
            alertBox.style.display = 'block';
            
            // TODO: Connect enquiry form to backend API
            // Example:
            // fetch('/api/enquiry', { method: 'POST', body: new FormData(this) }) ...
            
            // Reset form after 3 seconds
            setTimeout(() => {
                enquiryForm.reset();
                alertBox.style.display = 'none';
            }, 4000);
        });
    }

    /* ==========================================
       8. SMOOTH SCROLLING FOR IN-PAGE LINKS
    ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Offset for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================
       9. TESTIMONIAL CAROUSEL
    ========================================== */
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialNextBtn = document.querySelector('.carousel-btn.next');
    const testimonialPrevBtn = document.querySelector('.carousel-btn.prev');
    
    if (testimonialTrack && testimonialCards.length > 0 && testimonialNextBtn && testimonialPrevBtn) {
        let currentIndex = 0;
        let cardWidth = testimonialCards[0].offsetWidth + 30; // + gap
        let visibleCards = Math.max(1, Math.floor(testimonialTrack.parentElement.offsetWidth / cardWidth));
        let maxIndex = Math.max(0, testimonialCards.length - visibleCards);
        
        let autoPlayInterval;
        const autoPlayDelay = 4000;

        function updateCarousel() {
            cardWidth = testimonialCards[0].offsetWidth + 30;
            visibleCards = Math.max(1, Math.floor(testimonialTrack.parentElement.offsetWidth / cardWidth));
            maxIndex = Math.max(0, testimonialCards.length - visibleCards);
            
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;
            
            testimonialTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            
            testimonialPrevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            testimonialNextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
        }
        
        function moveNext() {
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }
        
        function movePrev() {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex;
            }
            updateCarousel();
        }
        
        testimonialNextBtn.addEventListener('click', () => { moveNext(); resetAutoPlay(); });
        testimonialPrevBtn.addEventListener('click', () => { movePrev(); resetAutoPlay(); });
        window.addEventListener('resize', updateCarousel);
        
        function startAutoPlay() { autoPlayInterval = setInterval(moveNext, autoPlayDelay); }
        function resetAutoPlay() { clearInterval(autoPlayInterval); startAutoPlay(); }
        
        testimonialTrack.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        testimonialTrack.addEventListener('mouseleave', startAutoPlay);
        
        // Touch swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        testimonialTrack.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(autoPlayInterval);
        }, {passive: true});
        
        testimonialTrack.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) moveNext();
            if (touchEndX > touchStartX + 50) movePrev();
            startAutoPlay();
        }, {passive: true});
        
        updateCarousel();
        startAutoPlay();
    }

    /* ==========================================
       10. SEAMLESS BACKGROUND VIDEO LOOP
    ========================================== */
    const primaryVideo = document.querySelector('.video-primary');
    const secondaryVideo = document.querySelector('.video-secondary');

    if (primaryVideo && secondaryVideo) {
        let activeVideo = primaryVideo;
        let nextVideo = secondaryVideo;
        
        // Use setInterval for more precise timing than timeupdate
        setInterval(() => {
            // Wait for video to have a valid duration
            if (isNaN(activeVideo.duration)) return;
            
            // 0.4 seconds before end, crossfade to next video
            if (activeVideo.duration - activeVideo.currentTime <= 0.45) {
                nextVideo.currentTime = 0;
                nextVideo.play();
                
                nextVideo.style.opacity = '1';
                activeVideo.style.opacity = '0';
                
                const temp = activeVideo;
                activeVideo = nextVideo;
                nextVideo = temp;
            }
        }, 50); // Check every 50ms
    }
    /* ==========================================
       9. SCROLL TO TOP BUTTON
    ========================================== */
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.setProperty('display', 'flex', 'important');
            } else {
                scrollTopBtn.style.setProperty('display', 'none', 'important');
            }
        });
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================
       10. FAQ HOVER / TOUCH INTERACTION
    ========================================== */
    document.querySelectorAll('.faq-card').forEach(card => {
        // Touch support for mobile devices
        card.addEventListener('touchstart', () => {
            document.querySelectorAll('.faq-card').forEach(c => {
                if (c !== card) c.classList.remove('is-active');
            });
            card.classList.toggle('is-active');
        }, { passive: true });
    });

    /* ==========================================
       11. FOOTER CALLING LINKS
    ========================================== */
    document.querySelectorAll('.footer-phone-link, .footer a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const tel = this.getAttribute('href');
            if (tel) {
                window.location.href = tel;
            }
        });
    });

    /* Custom cursor removed per user request */

});

