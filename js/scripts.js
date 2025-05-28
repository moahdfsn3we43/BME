/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

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

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

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

});
    const translations = {
        en: {
            mastheadHeading: "It's Nice To Meet You",
            mastheadSubheading: "Welcome To Our Studio!",
            tellMeMore: "Tell Me More",
            langToggle: "العربية",
            dir: "ltr",
        },
        ar: {
            mastheadHeading: "سُعداء بلقائك",
            mastheadSubheading: "مرحبًا بك في استوديو شركتنا!",
            tellMeMore: "اعرف المزيد",
            langToggle: "English",
            dir: "rtl",
        }
    };

    let currentLang = "en";

    document.getElementById("langToggle").addEventListener("click", function () {
        currentLang = currentLang === "en" ? "ar" : "en";
        const lang = translations[currentLang];

        document.documentElement.lang = currentLang;
        document.body.dir = lang.dir;
        document.getElementById("masthead-heading").textContent = lang.mastheadHeading;
        document.getElementById("masthead-subheading").textContent = lang.mastheadSubheading;
        document.getElementById("tell-me-more").textContent = lang.tellMeMore;
        this.textContent = lang.langToggle;

        // تغيير الخط تلقائياً حسب اللغة
        document.body.classList.toggle("arabic", currentLang === "ar");
    });

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

//<!-- JavaScript for updating main image -->
    function setMainImage(imageId, src) {
        document.getElementById(imageId).src = src;
    }

    // Function to apply language
    function applyLanguage() {
        const lang = document.documentElement.lang || 'en';
        document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`) || el.textContent;
        });
    }

    // Run on page load
    document.addEventListener("DOMContentLoaded", applyLanguage);

