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

            // تغيير الخط تلقائياً حسب اللغة
            document.body.classList.toggle("arabic", currentLang === "ar");

            // تغيير النصوص في كل العناصر التي تحتوي على data-en و data-ar
            applyLanguage();
        });
    }

    // تعيين اللغة عند تحميل الصفحة
    applyLanguage();

    // ربط أزرار طلب المنتج لكل مودال
    document.querySelectorAll('.portfolio-modal .btn.btn-primary').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            // إيجاد المودال الأب
            const modal = this.closest('.modal-content');
            if (!modal) return;

            // جلب اسم المشروع والوصف من النصوص داخل المودال
            const productName = modal.querySelector('h2')?.textContent.trim() || '';
            const productDesc = modal.querySelector('p.item-intro')?.textContent.trim() || '';

            // تكوين رسالة الطلب
            const message = `طلب المنتج: ${productName}\nالوصف: ${productDesc}`;

            // تشفير الرابط مع الرسالة
            const contactPageURL = `contact.html?message=${encodeForURL(message)}`;

            // تحويل المستخدم لصفحة التواصل
            window.location.href = contactPageURL;
        });
    });

});

// ترجمة النصوص
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

// دالة لتبديل نصوص العناصر حسب اللغة المختارة
function applyLanguage() {
    const lang = document.documentElement.lang || 'en';

    // تغيير النصوص
    document.querySelectorAll('[data-en]').forEach(el => {
        const newText = el.getAttribute(`data-${lang}`);
        if (newText !== null) {
            el.textContent = newText;
        }
    });

    // تغيير placeholder في الحقول
    document.querySelectorAll('[data-en-placeholder]').forEach(el => {
        const newPlaceholder = el.getAttribute(`data-${lang}-placeholder`);
        if (newPlaceholder !== null) {
            el.placeholder = newPlaceholder;
        }
    });
}


// دالة تغيير الصورة الرئيسية لأي منتج
function setMainImage(imageId, src) {
    const mainImage = document.getElementById(imageId);
    if (mainImage) {
        mainImage.src = src;
    }
}

// دالة تشفير النص للروابط
function encodeForURL(text) {
    return encodeURIComponent(text);
}

// دالة تغيير الاتجاه للصفحة والشريط العلوي
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
