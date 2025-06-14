document.addEventListener('DOMContentLoaded', function() {
    // Shared variables
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const langToggle = document.getElementById('langToggle');
    let currentLang = document.documentElement.lang || "en"; // Initialize from HTML lang attribute

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

    // Initialize slider variables
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    // Typing effect variables
    const typedText = document.getElementById('typed-text');
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

    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Slider functions
    function initSlider() {
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        startSlideShow();   
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 8000);
    }

    function pauseSlideShow() {
        clearInterval(slideInterval);
    }

    // Typing effect function
    function typeWriter() {
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
    }

    // Language functions
    function applyLanguage() {
        const lang = document.documentElement.lang || 'en';
        document.querySelectorAll('[data-en]').forEach(el => {
            const newText = el.getAttribute(`data-${lang}`);
            if (newText !== null) el.textContent = newText;
        });
        document.querySelectorAll('[data-en-placeholder]').forEach(el => {
            const newPlaceholder = el.getAttribute(`data-${lang}-placeholder`);
            if (newPlaceholder !== null) el.placeholder = newPlaceholder;
        });
        
        // Update toggle button text based on current language
        if (langToggle) {
            langToggle.textContent = translations[lang].langToggle;
        }
    }

    function toggleLanguage() {
        currentLang = currentLang === "en" ? "ar" : "en";
        const lang = translations[currentLang];

        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";

        const heading = document.getElementById("masthead-heading");
        if (heading) heading.textContent = lang.mastheadHeading;

        const subheading = document.getElementById("masthead-subheading");
        if (subheading) subheading.textContent = lang.mastheadSubheading;

        const tellMeMore = document.getElementById("tell-me-more");
        if (tellMeMore) tellMeMore.textContent = lang.tellMeMore;

        if (langToggle) langToggle.textContent = lang.langToggle;

        applyLanguage();
    }

    // Mobile menu functions
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    }

    function closeMobileMenu() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }

    // Event listeners
    window.addEventListener('scroll', handleNavbarScroll);

    if (nextBtn) nextBtn.addEventListener('click', function() {
        pauseSlideShow();
        nextSlide();
        startSlideShow();
    });

    if (prevBtn) prevBtn.addEventListener('click', function() {
        pauseSlideShow();
        prevSlide();
        startSlideShow();
    });

    if (dots) dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            pauseSlideShow();
            goToSlide(index);
            startSlideShow();
        });
    });

    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }

    if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);

    if (navLinks) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // Modal handlers
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

    // Button state handler
    const button = document.querySelector('.button');
    if (button) {
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
    }

    // Initialize
    handleNavbarScroll();
    if (slides.length > 0) initSlider();
    if (typedText) setTimeout(typeWriter, 2000);
    applyLanguage(); // Apply language on initial load
});

// Utility functions
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

function encodeForURL(text) {
    return encodeURIComponent(text);
}

document.addEventListener('DOMContentLoaded', function () {
    // 1. توزيع الصور المصغرة تلقائيًا حسب عددها
    function adjustAllThumbnails() {
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
    }

    // 2. تعيين الصورة الرئيسية عند الضغط على المصغرات
    function setupThumbnailClicks() {
      document.querySelectorAll('.thumbnail-image').forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          const modal = this.closest('.modal-body');
          const mainImage = modal.querySelector('.main-image');
          const zoomedImage = modal.querySelector('.zoomed-image');
          const newSrc = this.src;

          if (mainImage) mainImage.src = newSrc;
          if (zoomedImage) zoomedImage.src = newSrc;
        });
      });
    }

    // 3. منطق التكبير عند تمرير الماوس
    function zoomImage(event, mainImage, zoomBox, zoomedImage) {
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
    }

    function resetZoom(zoomBox, zoomedImage) {
      if (window.innerWidth < 992) return;
      zoomBox.classList.remove('zooming');
      zoomedImage.style.display = 'none';
    }

    adjustAllThumbnails();
    setupThumbnailClicks();

    window.addEventListener('resize', adjustAllThumbnails);

    window.zoomImage = zoomImage;
    window.resetZoom = resetZoom;
});

window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loading-screen');
  
  // إزالة العنصر مباشرة بدون تأخير أو تأثيرات
  loadingScreen.remove();
});
