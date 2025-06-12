document.addEventListener('DOMContentLoaded', function() {
    // Shared variables
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const langToggle = document.getElementById('langToggle');
    let currentLang = document.documentElement.lang || "en";

    // Translations object
    const translations = {
        en: {
            mastheadHeading: "It's Nice To Meet You",
            mastheadSubheading: "Welcome To Our Studio!",
            tellMeMore: "Tell Me More",
            langToggle: "العربية"
        },
        ar: {
            mastheadHeading: "سُعداء بلقائك",
            mastheadSubheading: "مرحبًا بك في استوديو شركتنا!",
            tellMeMore: "اعرف المزيد",
            langToggle: "English"
        }
    };

    // Initialize slider variables if elements exist
    let slideInterval;
    const initSlider = () => {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        let currentSlide = 0;

        if (slides.length === 0) return;

        const goToSlide = (n) => {
            slides[currentSlide].classList.remove('active');
            if (dots.length > 0) dots[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            if (dots.length > 0) dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => goToSlide(currentSlide + 1);
        const prevSlide = () => goToSlide(currentSlide - 1);

        const startSlideShow = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 8000);
        };

        const pauseSlideShow = () => clearInterval(slideInterval);

        // Initialize first slide
        slides[currentSlide].classList.add('active');
        if (dots.length > 0) dots[currentSlide].classList.add('active');
        startSlideShow();

        // Add event listeners if elements exist
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                pauseSlideShow();
                nextSlide();
                startSlideShow();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                pauseSlideShow();
                prevSlide();
                startSlideShow();
            });
        }

        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    pauseSlideShow();
                    goToSlide(index);
                    startSlideShow();
                });
            });
        }
    };

    // Typing effect
    const initTypingEffect = () => {
        const typedText = document.getElementById('typed-text');
        if (!typedText) return;

        const phrases = [
            "أجهزة طبية بجودة عالمية",
            "حلول متكاملة للمستشفيات",
            "أدوية معتمدة من وزارة الصحة",
            "تجهيزات طبية متكاملة"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const typeWriter = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typedText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1500;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }

            setTimeout(typeWriter, typingSpeed);
        };

        setTimeout(typeWriter, 2000);
    };

    // Navbar scroll effect
    const handleNavbarScroll = () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    };

    // Language functions
    const applyLanguage = () => {
        const lang = document.documentElement.lang || 'en';
        document.querySelectorAll('[data-en]').forEach(el => {
            const newText = el.getAttribute(`data-${lang}`);
            if (newText !== null) el.textContent = newText;
        });
        document.querySelectorAll('[data-en-placeholder]').forEach(el => {
            const newPlaceholder = el.getAttribute(`data-${lang}-placeholder`);
            if (newPlaceholder !== null) el.placeholder = newPlaceholder;
        });
    };

    const toggleLanguage = () => {
        currentLang = currentLang === "en" ? "ar" : "en";
        const lang = translations[currentLang];

        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";

        // Update specific elements if they exist
        const updateElement = (id, content) => {
            const el = document.getElementById(id);
            if (el) el.textContent = content;
        };

        updateElement("masthead-heading", lang.mastheadHeading);
        updateElement("masthead-subheading", lang.mastheadSubheading);
        updateElement("tell-me-more", lang.tellMeMore);
        if (langToggle) langToggle.textContent = lang.langToggle;

        applyLanguage();
    };

    // Mobile menu functions
    const toggleMobileMenu = () => {
        if (navLinks) navLinks.classList.toggle('active');
        if (hamburger) hamburger.classList.toggle('active');
    };

    const closeMobileMenu = () => {
        if (navLinks) navLinks.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    };

    // Thumbnail functions
    const adjustAllThumbnails = () => {
        const containers = document.querySelectorAll('.portfolio-modal .d-flex.justify-content-center.gap-2.flex-wrap.mt-3');

        containers.forEach(container => {
            const thumbnails = container.querySelectorAll('.thumbnail-image');
            const count = thumbnails.length;
            if (count === 0) return;

            const widthPercent = Math.min(80 / count, 25);

            thumbnails.forEach(thumb => {
                thumb.style.flex = `0 0 ${widthPercent}%`;
                thumb.style.maxWidth = `${widthPercent}%`;
                thumb.style.marginRight = '0';
            });

            container.style.flexWrap = 'nowrap';
            container.style.overflowX = 'auto';
        });
    };

    const setupThumbnailClicks = () => {
        document.querySelectorAll('.thumbnail-image').forEach(thumb => {
            thumb.addEventListener('click', function() {
                const modal = this.closest('.modal-body');
                const mainImage = modal?.querySelector('.main-image');
                const zoomedImage = modal?.querySelector('.zoomed-image');
                const newSrc = this.src;

                if (mainImage) mainImage.src = newSrc;
                if (zoomedImage) zoomedImage.src = newSrc;
            });
        });
    };

    // Zoom functions
    const setupZoomEffects = () => {
        document.querySelectorAll('.zoom-container').forEach(container => {
            const mainImage = container.querySelector('.main-image');
            const zoomBox = container.querySelector('.zoom-box');
            const zoomedImage = container.querySelector('.zoomed-image');

            if (!mainImage || !zoomBox || !zoomedImage) return;

            const zoomImage = (event) => {
                if (window.innerWidth < 992) return;

                zoomBox.classList.add('zooming');
                zoomedImage.style.display = 'block';
                zoomedImage.src = mainImage.src;

                const rect = mainImage.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const scale = 2;
                zoomedImage.style.width = mainImage.offsetWidth * scale + 'px';
                zoomedImage.style.height = mainImage.offsetHeight * scale + 'px';

                let left = -(x * scale - zoomBox.offsetWidth / 2);
                let top = -(y * scale - zoomBox.offsetHeight / 2);

                left = Math.min(0, Math.max(left, zoomBox.offsetWidth - zoomedImage.offsetWidth));
                top = Math.min(0, Math.max(top, zoomBox.offsetHeight - zoomedImage.offsetHeight));

                zoomedImage.style.left = left + 'px';
                zoomedImage.style.top = top + 'px';
            };

            const resetZoom = () => {
                if (window.innerWidth < 992) return;
                zoomBox.classList.remove('zooming');
                zoomedImage.style.display = 'none';
            };

            mainImage.addEventListener('mousemove', zoomImage);
            mainImage.addEventListener('mouseout', resetZoom);
        });
    };

    // Button state handler
    const setupButtonState = () => {
        const button = document.querySelector('.button');
        if (!button) return;

        button.addEventListener('click', () => {
            const defaultState = button.querySelector('.state--default');
            const sentState = button.querySelector('.state--sent');
            if (defaultState && sentState) {
                defaultState.style.opacity = '0';
                defaultState.style.pointerEvents = 'none';
                sentState.style.opacity = '1';
                sentState.style.pointerEvents = 'auto';
            }
        });
    };

    // Modal handlers
    const setupModalHandlers = () => {
        document.querySelectorAll('[id^="portfolioModal"]').forEach(modal => {
            modal.addEventListener('hide.bs.modal', () => {
                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }
            });

            modal.addEventListener('show.bs.modal', () => {
                setTimeout(() => setupRequestProductLinks(modal), 100);
            });
        });
    };

    // Event listeners
    window.addEventListener('scroll', handleNavbarScroll);
    if (langToggle) langToggle.addEventListener('click', toggleLanguage);
    if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);

    if (navLinks) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // Initialize all components
    handleNavbarScroll();
    initSlider();
    initTypingEffect();
    applyLanguage();
    adjustAllThumbnails();
    setupThumbnailClicks();
    setupZoomEffects();
    setupButtonState();
    setupModalHandlers();
    window.addEventListener('resize', adjustAllThumbnails);
});

// Utility function for product links
function setupRequestProductLinks(modal) {
    if (!modal) return;
    const productTitleElement = modal.querySelector('h4.text-uppercase');
    if (!productTitleElement) return;
    
    const productName = productTitleElement.textContent.trim();
    let brandName = '';
    let modelName = '';
    
    const brandStrong = modal.querySelector('p strong[data-en="Brand:"]');
    if (brandStrong && brandStrong.parentElement) {
        brandName = brandStrong.parentElement.textContent.replace(brandStrong.textContent, '').trim();
    }
    
    const modelStrong = modal.querySelector('p strong[data-en="Model:"]');
    if (modelStrong && modelStrong.parentElement) {
        modelName = modelStrong.parentElement.textContent.replace(modelStrong.textContent, '').trim();
    }
    
    let message = productName;
    if (brandName) message += `\nالعلامة التجارية: ${brandName}`;
    if (modelName) message += `\nالموديل: ${modelName}`;
    
    const contactPageUrl = 'contact.html';
    const urlWithMessage = `${contactPageUrl}?message=${encodeURIComponent(message)}`;
    
    modal.querySelectorAll('.requestProductBtn, .requestProductBtnMobile').forEach(btn => {
        btn.setAttribute('href', urlWithMessage);
    });
}
