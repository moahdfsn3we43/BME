window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Language toggle button handler
    const langToggleBtn = document.getElementById("langToggle");
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", function () {
            currentLang = currentLang === "en" ? "ar" : "en";
            const lang = translations[currentLang];

            document.documentElement.lang = currentLang;

            const heading = document.getElementById("masthead-heading");
            if (heading) heading.textContent = lang.mastheadHeading;

            const subheading = document.getElementById("masthead-subheading");
            if (subheading) subheading.textContent = lang.mastheadSubheading;

            const tellMeMore = document.getElementById("tell-me-more");
            if (tellMeMore) tellMeMore.textContent = lang.tellMeMore;

            this.textContent = lang.langToggle;

            document.body.classList.toggle("arabic", currentLang === "ar");

            applyLanguage();
        });
    }

    applyLanguage();

    // Blur active element on modal close to fix accessibility warning
    document.querySelectorAll('[id^="portfolioModal"]').forEach(modal => {
        modal.addEventListener('hide.bs.modal', () => {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        });
    });

    // Bind setup for modal when shown
    document.querySelectorAll('[id^="portfolioModal"]').forEach(modal => {
        modal.addEventListener('show.bs.modal', () => {
            setTimeout(() => setupRequestProductLinks(modal), 100);
        });
    });

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
});

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

let currentLang = "en";

function applyLanguage() {
    const lang = document.documentElement.lang || 'en';
    document.querySelectorAll('[data-en]').forEach(el => {
        const newText = el.getAttribute(`data-${lang}`);
        if (newText !== null) {
            el.textContent = newText;
        }
    });
    document.querySelectorAll('[data-en-placeholder]').forEach(el => {
        const newPlaceholder = el.getAttribute(`data-${lang}-placeholder`);
        if (newPlaceholder !== null) {
            el.placeholder = newPlaceholder;
        }
    });
}

function setMainImage(imageId, src) {
    const mainImage = document.getElementById(imageId);
    if (mainImage) {
        mainImage.src = src;
    }
}

function encodeForURL(text) {
    return encodeURIComponent(text);
}

function toggleLanguage() {
    const nav = document.getElementById('mainNav');
    const currentLang = nav.getAttribute('lang');
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    nav.setAttribute('lang', newLang);
    document.querySelector('.lang-toggle').textContent = newLang === 'en' ? 'العربية' : 'English';
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${newLang}`);
    });
}

function setupRequestProductLinks(modal) {
    if (!modal) return;
    const productTitleElement = modal.querySelector('h4.text-uppercase');
    if (!productTitleElement) return;
    const productName = productTitleElement.textContent.trim();
    const brandStrong = modal.querySelector('p strong[data-en="Brand:"]');
    let brandName = '';
    if (brandStrong && brandStrong.parentElement) {
        brandName = brandStrong.parentElement.textContent.replace(brandStrong.textContent, '').trim();
    }
    const modelStrong = modal.querySelector('p strong[data-en="Model:"]');
    let modelName = '';
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


// كود الصو
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) slide.classList.add('active');
    });
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }

  function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // تشغيل تلقائي
  setInterval(nextSlide, 50000); // كل 5 ثواني

  const lenis = new Lenis({
    duration: 1.4,      // مدة الحركة
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // دالة الزخم
    smooth: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
