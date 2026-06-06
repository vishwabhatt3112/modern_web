import { creativeServiceNames } from './creative-services-data.js';
import { initCreativeServiceModals } from './creative-services-modal.js';

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. PAGE PRELOADER
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 600); // Gentle delay for a premium experience
        });
    }

    /* ==========================================================================
       2. STICKY NAV HEADER & MOBILE NAVIGATION
       ========================================================================== */
    const header = document.getElementById('main-header');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Hamburger Toggle
    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('open');
            navMenu.classList.toggle('active');
        });
    }

    // Close Mobile Menu when Link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileNavToggle.classList.remove('open');
            }
        });
    });

    // Active Link Tracking based on Scroll Position
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });


    /* ==========================================================================
       3. TAGLINE TYPEWRITER ANIMATION
       ========================================================================== */
    const taglineElement = document.getElementById('hero-tagline-text');
    if (taglineElement) {
        const text = taglineElement.textContent;
        taglineElement.textContent = '';
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < text.length) {
                taglineElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50); // Speed of typewriter effect
            }
        }
        
        // Start typing after preloader finishes
        setTimeout(typeWriter, 1200);
    }


    /* ==========================================================================
       4. SCROLL REVEAL & STATS COUNTER TICKER
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const statCounts = document.querySelectorAll('.stat-count');
    let countersStarted = false;

    // Counter counting-up animation logic
    const startCounters = () => {
        statCounts.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            let count = 0;
            const duration = 2000; // 2 seconds animation
            const increment = target / (duration / 16); // ~60fps refresh rate
            
            const updateCount = () => {
                count += increment;
                if (count < target) {
                    if (target >= 1000) {
                        // Format large numbers (e.g. 150K+)
                        if (target >= 100000) {
                            counter.textContent = Math.floor(count / 1000) + 'K+';
                        } else {
                            counter.textContent = Math.floor(count) + '+';
                        }
                    } else {
                        counter.textContent = Math.floor(count);
                    }
                    requestAnimationFrame(updateCount);
                } else {
                    // Final formatting correction
                    if (target >= 100000) {
                        counter.textContent = (target / 1000) + 'K+';
                    } else if (target >= 100) {
                        counter.textContent = target + '+';
                    } else {
                        counter.textContent = target + '+';
                    }
                }
            };
            updateCount();
        });
    };

    // Intersection Observer for Scroll Reveal and Statistics Counter
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it is the about section, trigger statistics count-up
                if (entry.target.id === 'about' && !countersStarted) {
                    countersStarted = true;
                    setTimeout(startCounters, 300);
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* ==========================================================================
       5. PORTFOLIO GALLERY MASONRY FILTER SYSTEM
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.getElementById('portfolio-grid');
    
    if (portfolioGrid) {
        const portfolioItems = portfolioGrid.querySelectorAll('.portfolio-item');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle active filter button class
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.style.display = 'block';
                        // Add fade-in transition
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        // Short delay before setting display:none to allow fade transition
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 400);
                    }
                });
            });
        });
    }


    /* ==========================================================================
       6. CUSTOM LIGHTBOX SLIDESHOW
       ========================================================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCat = document.getElementById('lightbox-cat');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let activeImages = [];
    let currentImageIndex = 0;

    // Refresh active portfolio items list based on currently visible ones
    const getVisiblePortfolioImages = () => {
        if (!portfolioGrid) return [];
        const visibleItems = Array.from(portfolioGrid.querySelectorAll('.portfolio-item')).filter(
            item => item.style.display !== 'none'
        );
        return visibleItems.map(item => ({
            src: item.querySelector('img').getAttribute('src'),
            title: item.querySelector('.portfolio-title').textContent,
            cat: item.querySelector('.portfolio-cat').textContent
        }));
    };

    const updateLightboxImage = () => {
        if (activeImages.length === 0) return;
        const currentData = activeImages[currentImageIndex];
        lightboxImg.setAttribute('src', currentData.src);
        lightboxTitle.textContent = currentData.title;
        lightboxCat.textContent = currentData.cat;
    };

    // Open Lightbox
    if (portfolioGrid) {
        portfolioGrid.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', () => {
                activeImages = getVisiblePortfolioImages();
                const itemImgSrc = item.querySelector('img').getAttribute('src');
                currentImageIndex = activeImages.findIndex(img => img.src === itemImgSrc);
                
                updateLightboxImage();
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Block background scroll
            });
        });
    }

    // Close Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable scrolling back
    };

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Slide navigation
    const showNextImage = () => {
        if (activeImages.length === 0) return;
        currentImageIndex = (currentImageIndex + 1) % activeImages.length;
        updateLightboxImage();
    };

    const showPrevImage = () => {
        if (activeImages.length === 0) return;
        currentImageIndex = (currentImageIndex - 1 + activeImages.length) % activeImages.length;
        updateLightboxImage();
    };

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showNextImage();
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrevImage();
        });
    }

    // Keyboard support for Lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        }
    });


    /* ==========================================================================
       7. TESTIMONIALS SLIDER
       ========================================================================== */
    const reviewsSlider = document.getElementById('reviews-slider');
    const dotsContainer = document.getElementById('slider-dots');
    
    if (reviewsSlider && dotsContainer) {
        const reviewCards = reviewsSlider.querySelectorAll('.review-card');
        const slideCount = reviewCards.length;
        let activeSlideIndex = 0;
        let slideInterval;

        // Build navigation dots
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        }

        const dots = dotsContainer.querySelectorAll('.dot');

        const goToSlide = (index) => {
            activeSlideIndex = index;
            reviewsSlider.style.transform = `translateX(-${activeSlideIndex * 100}%)`;
            
            // Update dots
            dots.forEach((dot, idx) => {
                if (idx === activeSlideIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        const nextSlide = () => {
            goToSlide((activeSlideIndex + 1) % slideCount);
        };

        // Start Auto-sliding
        const startAutoSlide = () => {
            slideInterval = setInterval(nextSlide, 5000); // 5 seconds interval
        };

        const resetAutoSlide = () => {
            clearInterval(slideInterval);
            startAutoSlide();
        };

        startAutoSlide();

        // Pause auto-sliding on hover
        reviewsSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        reviewsSlider.addEventListener('mouseleave', startAutoSlide);

        // Responsive adjustment on resize
        window.addEventListener('resize', () => {
            goToSlide(activeSlideIndex);
        });
    }


    /* ==========================================================================
       8. BOOKING FORM & WHATSAPP INTEGRATION
       ========================================================================== */
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract values
            const name = document.getElementById('form-name').value.trim();
            const phone = document.getElementById('form-phone').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const service = document.getElementById('form-service').value;
            const date = document.getElementById('form-date').value;
            const message = document.getElementById('form-message').value.trim();

            // WhatsApp formatting (luxurious style)
            const waNumber = '15550192834'; // Studio business number
            
            const messageHeader = `✨ *NEW BOOKING REQUEST - MODERN PHOTO STUDIO* ✨\n\n`;
            const clientDetails = `👤 *Client Name:* ${name}\n📞 *Phone:* ${phone}\n✉️ *Email:* ${email}\n\n`;
            const serviceDetails = `📸 *Service Requested:* ${service}\n🗓️ *Preferred Date:* ${date}\n\n`;
            const notesDetails = `✍️ *Vision & Requirements:*\n"${message}"`;
            
            const fullMessage = encodeURIComponent(messageHeader + clientDetails + serviceDetails + notesDetails);
            const waLink = `https://wa.me/${waNumber}?text=${fullMessage}`;

            // Trigger visual button response
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'REDIRECTING TO WHATSAPP...';
            submitBtn.style.background = '#25d366';
            submitBtn.style.color = '#ffffff';

            setTimeout(() => {
                // Open WhatsApp Web/App
                window.open(waLink, '_blank');
                
                // Reset form values
                bookingForm.reset();
                submitBtn.textContent = 'BOOKING SUBMITTED! THANK YOU';
                
                setTimeout(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                }, 3000);
            }, 1000);
        });
    }


    /* ==========================================================================
       9. BACK TO TOP BUTTON
       ========================================================================== */
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    /* ==========================================================================
       10. SERVICE CARD NAVIGATION
       ========================================================================== */
    const serviceSlugs = {
        'Wedding Photography': 'wedding-photography',
        'Pre-Wedding Photography': 'pre-wedding-photography',
        'Engagement Photography': 'engagement-photography',
        'Birthday Photography': 'birthday-photography',
        'Baby Shoot': 'baby-shoot',
        'Maternity Shoot': 'maternity-shoot',
        'Fashion Photography': 'fashion-photography',
        'Event Photography': 'event-photography',
        'Studio Portrait Photography': 'studio-portrait-photography',
        'Corporate Headshots': 'corporate-headshots',
        'Passport Size Photos': 'passport-size-photos',
        'Visa Photos': 'visa-photos',
        'Aadhaar Card Photos': 'aadhaar-card-photos',
        'PAN Card Photos': 'pan-card-photos',
        'ID Card Photos': 'id-card-photos',
        'Instant Photo Printing': 'instant-photo-printing'
    };

    const creativeGrid = document.querySelector('.creative-grid');
    initCreativeServiceModals(creativeGrid, creativeServiceNames);

    document.querySelectorAll('.service-card').forEach(card => {
        if (creativeGrid?.contains(card)) return;

        const serviceName = card.querySelector('.service-name')?.textContent.trim();
        const slug = serviceName ? serviceSlugs[serviceName] : null;
        if (!slug) return;

        card.style.cursor = 'pointer';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        const openServicePage = () => {
            window.location.href = `services/${slug}.html`;
        };

        card.addEventListener('click', openServicePage);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openServicePage();
            }
        });
    });

});
