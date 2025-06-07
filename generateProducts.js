const productContainer = document.getElementById("productContainer");
const modalsContainer = document.getElementById("modalsContainer");

// إدخال الشعارات يدويًا حسب الفهرس الذي تريده
const logos = [
  { index: 0, src: "assets/img/portfolio/cha_profile.png", width: 500 },
  { index: 3, src: "assets/img/portfolio/channels4_profile.png", width: 500 },
  { index: 5, src: "assets/img/portfolio/dawei.png", width: 500 },
  { index: 6, src: "assets/img/portfolio/biolabio.png", width: 500 },
  { index: 7, src: "assets/img/portfolio/kellymed.png", width: 500 },
  { index: 25, src: "assets/img/portfolio/sternmed.png", width: 500 },
  // أضف المزيد حسب الحاجة
];

products.forEach((product, index) => {
  // إدخال شعار مخصص إن وُجد لهذا الفهرس
  const logo = logos.find(l => l.index === index);
  if (logo) {
    const logoSection = document.createElement("div");
    logoSection.className = "col-12 d-flex justify-content-center mb-4";

    logoSection.innerHTML = `
      <section class="page-section d-flex align-items-center justify-content-center" style="height: 10vh; width: 100%;">
        <div class="container text-center">
          <img src="${logo.src}" alt="Company Logo" class="img-fluid" style="width: ${logo.width}px; height: auto;">
        </div>
      </section>
    `;
    productContainer.appendChild(logoSection);
  }

  // إنشاء بطاقة المنتج
  const col = document.createElement("div");
  col.className = "col-lg-4 col-sm-6 mb-4";

  col.innerHTML = `
    <div class="shadow-3d">
      <div class="portfolio-item">
        <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal${product.id}">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
          </div>
          <img class="img-fluid" src="${product.img_main}" alt="${product.title_en}" />
        </a>
        <div class="portfolio-caption">
          <div class="portfolio-caption-heading" data-en="${product.title_en}" data-ar="${product.title_ar}">
            ${product.title_ar}
          </div>
          <div class="portfolio-caption-subheading text-muted" data-en="${product.brand} ${product.model}" data-ar="${product.brand} ${product.model}">
            ${product.brand} ${product.model}
          </div>
        </div>
      </div>
    </div>
  `;

  productContainer.appendChild(col);

  // إنشاء المودال الخاص بالمنتج
  const modal = document.createElement("div");
  modal.className = "portfolio-modal modal fade";
  modal.id = `portfolioModal${product.id}`;
  modal.tabIndex = -1;
  modal.setAttribute("aria-labelledby", `portfolioModal${product.id}Label`);
  modal.setAttribute("aria-hidden", "true");

  const thumbnailsHTML = product.thumbnails.map(src => `
    <img src="${src}" class="img-thumbnail thumbnail-image" style="width:90px; cursor:pointer;">
  `).join('');

  modal.innerHTML = `
    <div class="modal-dialog modal-xl">
      <div class="modal-content p-4 position-relative" style="max-width: 1200px; width: auto; height: auto; overflow-y: auto; margin: auto; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); border-radius: 10px;">
        <button type="button" class="position-absolute top-0 end-0 m-3 z-3 btn-close-custom" data-bs-dismiss="modal" aria-label="Close" style="background:none; border:none; padding:0; cursor:pointer;">
          <img src="assets/img/close-icon.svg" alt="Close" style="width:24px; height:24px;" />
        </button>
        <div class="container h-100">
          <div class="row justify-content-center h-100">
            <div class="col-lg-10 h-100">
              <div class="modal-body h-100">
                <div class="row align-items-start mb-4 g-4 h-100">
                  <div class="col-md-6 d-flex align-items-center justify-content-center">
                    <img
                      class="img-fluid border main-image"
                      src="${product.img_main}"
                      alt="Main project image"
                      onclick="window.open(this.src, '_blank')"
                      onmousemove="zoomImage(event, this, this.closest('.modal-body').querySelector('.zoom-box'), this.closest('.modal-body').querySelector('.zoomed-image'))"
                      onmouseleave="resetZoom(this.closest('.modal-body').querySelector('.zoom-box'), this.closest('.modal-body').querySelector('.zoomed-image'))"
                      style="cursor: zoom-in; max-height: 100%; width: auto; object-fit: contain;" />
                  </div>
                  <div class="col-md-6 text-start product-info">
                    <h4 class="text-uppercase fw-bold mb-3 text-center" data-en="${product.title_en}" data-ar="${product.title_ar}">
                      ${product.title_en}
                    </h4>
                    <p class="text-muted mb-1 text-center">
                      <strong data-en="Brand:" data-ar="العلامة التجارية:" class="text-dark">Brand:</strong>
                      <span data-en="${product.brand}" data-ar="${product.brand}">${product.brand}</span>
                    </p>
                    <p class="mb-2 text-center">
                      <strong data-en="Model:" data-ar="الموديل:" class="text-dark">Model:</strong>
                      <span>${product.model}</span>
                    </p>
                    <div class="zoom-box">
                      <span data-en="Move mouse over the image to zoom" data-ar="حرك الماوس على الصورة للتكبير">Move mouse over the image to zoom</span>
                      <img class="zoomed-image" src="" alt="Zoomed view" />
                    </div>
                    <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
                      ${thumbnailsHTML}
                    </div>
                    <div class="d-flex justify-content-center flex-wrap gap-2 mt-3">
                      <a class="btn btn-primary btn-lg text-uppercase requestProductBtn" href="#">
                        <span data-en="Request Product" data-ar="طلب المنتج">Request Product</span>
                      </a>
                      <a class="btn btn-outline-secondary btn-lg text-uppercase" href="${product.catalog}" download>
                        <span data-en="Catalog file" data-ar="كتالوج الجهاز">Download Specs</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  modalsContainer.appendChild(modal);
});
