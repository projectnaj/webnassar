
// ملف JavaScript لتحميل الهيدر والفوتر والأنماط مرة واحدة
(function(){
  function loadCSSOnce(href){
    if ([...document.styleSheets].some(s => s.href && s.href.includes(href))) return;
    const link = document.createElement('link'); link.rel='stylesheet'; link.href=href; document.head.appendChild(link);
  }
  function loadScriptOnce(src){
    if ([...document.scripts].some(s => s.src && s.src.includes(src))) return;
    const s = document.createElement('script'); s.src=src; document.head.appendChild(s);
  }
  function injectPlaceholder(id){
    if (!document.getElementById(id)){
      const el = document.createElement('div'); el.id = id; document.body.prepend(el);
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    // تحميل ملفات الأنماط والسلوك
    loadCSSOnce('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
    loadCSSOnce('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap');
    loadCSSOnce('header-footer-styles.css');

    // تأكد من وجود أماكن الهيدر والفوتر
    injectPlaceholder('header-placeholder');
    if (!document.getElementById('footer-placeholder')){
      const footerPh = document.createElement('div'); footerPh.id = 'footer-placeholder'; document.body.appendChild(footerPh);
    }

    // تحميل الهيدر والفوتر
    loadComponent('header.html', 'header-placeholder', createFallbackHeader);
    loadComponent('footer.html', 'footer-placeholder', createFallbackFooter);

    // تحميل سكربت التفاعل
    loadScriptOnce('header-footer-scripts.js');
  });

  function loadComponent(url, placeholderId, fallbackFactory){
    fetch(url).then(r=>{
      if(!r.ok) throw new Error('HTTP '+r.status);
      return r.text();
    }).then(html=>{
      const ph = document.getElementById(placeholderId);
      if (ph) ph.innerHTML = html;
    }).catch(err=>{
      console.warn('Component load failed for', url, err);
      const ph = document.getElementById(placeholderId);
      if (ph && typeof fallbackFactory === 'function'){
        ph.innerHTML = fallbackFactory();
      }
    });
  }

  // === Fallbacks ===
  function createFallbackHeader(){
    return `
      <div class="top-bar">
        <div class="container">
          <div class="top-contact">
            <a href="tel:+966553011504"><i class="fas fa-phone"></i> 0553011504</a>
            <a href="mailto:info@sadaacoo.com"><i class="fas fa-envelope"></i> info@sadaacoo.com</a>
          </div>
          <div class="top-social">
            <a href="https://www.facebook.com/Glass.cleanin/" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="https://x.com/sadaacco" target="_blank" aria-label="X"><i class="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com/ios_cd/" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="https://wa.me/966553011504" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
          </div>
        </div>
      </div>
      <header>
        <div class="container header-container">
          <a class="logo" href="index.html" aria-label="العودة للصفحة الرئيسية">
            <img src="https://www.sadaacoo.com/wp-content/uploads/2024/08/%E2%80%8E%E2%81%A0%D8%A7%D9%84%D8%B4%D8%B9%D8%A7%D8%B1%E2%81%A0.png" alt="مؤسسة صدى الالوان للمقاولات">
          </a>
          <button class="mobile-toggle" aria-expanded="false" aria-label="فتح/إغلاق القائمة">
            <span></span><span></span><span></span>
          </button>
          <ul class="nav-menu" role="navigation" aria-label="التنقل الرئيسي">
            <li><a href="index.html">الرئيسية</a></li>
            <li><a href="من نحن.html">من نحن</a></li>
            <li><a href="خدماتنا.html">خدماتنا</a></li>
            <li><a href="خدمات الواجهات.html">خدمات الواجهات</a></li>
            <li><a href="الخدمات المنزلية.html">الخدمات المنزلية</a></li>
            <li><a href="المدونة.html">المدونة</a></li>
            <li><a href="الميزانية.html">الميزانية</a></li>
            <li><a href="الصيانة.html">الصيانة</a></li>
            <li><a href="اتصل بنا.html">اتصل بنا</a></li>
          </ul>
        </div>
      </header>
    `;
  }

  function createFallbackFooter(){
    const year = new Date().getFullYear();
    return `
      <div class="keywords-bar">
        <div class="container keywords-content">
          <div class="keywords-label"><i class="fas fa-tags"></i> خدماتنا</div>
          <div class="keywords-list">
            <a class="keyword-tag service" href="ازالة_الاستيكر.html"><i class="fas fa-eraser"></i> ازالة الاستيكر</a>
            <a class="keyword-tag service" href="خدمات الواجهات.html"><i class="fas fa-building"></i> تنظيف واجهات</a>
            <a class="keyword-tag service" href="الخدمات المنزلية.html"><i class="fas fa-home"></i> خدمات منزلية</a>
            <a class="keyword-tag service" href="الصيانة.html"><i class="fas fa-tools"></i> صيانة</a>
            <a class="keyword-tag location" href="شركة تنظيف واجهات زجاج بالرياض.html"><i class="fas fa-map-marker-alt"></i> الرياض</a>
            <a class="keyword-tag location" href="شركات تنظيف زجاج بجدة.html"><i class="fas fa-map-marker-alt"></i> جدة</a>
            <a class="keyword-tag location" href="شركة تنظيف واجهات زجاج بحائل.html"><i class="fas fa-map-marker-alt"></i> حائل</a>
            <a class="keyword-tag" href="اتصل بنا.html"><i class="fas fa-phone"></i> حجز خدمة</a>
          </div>
        </div>
      </div>
      <footer>
        <div class="container footer-content">
          <section class="footer-section">
            <h3>مؤسسة صدى الالوان للمقاولات</h3>
            <p>نقدم خدمات تنظيف وصيانة احترافية بمعايير عالية في جميع مدن المملكة.</p>
            <p>س.ت: — | الرقم الضريبي: —</p>
            <div class="top-social" style="margin-top:10px">
              <a href="https://www.facebook.com/Glass.cleanin/" target="_blank"><i class="fab fa-facebook-f"></i></a>
              <a href="https://x.com/sadaacco" target="_blank"><i class="fab fa-twitter"></i></a>
              <a href="https://www.instagram.com/ios_cd/" target="_blank"><i class="fab fa-instagram"></i></a>
              <a href="https://wa.me/966553011504" target="_blank"><i class="fab fa-whatsapp"></i></a>
            </div>
          </section>
          <section class="footer-section">
            <h3>روابط سريعة</h3>
            <ul>
              <li><a href="index.html">الرئيسية</a></li>
              <li><a href="من نحن.html">من نحن</a></li>
              <li><a href="خدماتنا.html">خدماتنا</a></li>
              <li><a href="المدونة.html">المدونة</a></li>
              <li><a href="اتصل بنا.html">اتصل بنا</a></li>
            </ul>
          </section>
          <section class="footer-section">
            <h3>خدمات</h3>
            <ul>
              <li><a href="خدمات الواجهات.html">تنظيف واجهات زجاجية</a></li>
              <li><a href="الخدمات المنزلية.html">تنظيف منازل ومسـابح</a></li>
              <li><a href="الصيانة.html">صيانة مباني</a></li>
              <li><a href="الميزانية.html">احسب التكلفة</a></li>
            </ul>
          </section>
          <section class="footer-section">
            <h3>تواصل معنا</h3>
            <p><i class="fas fa-phone"></i> <a href="tel:+966553011504">0553011504</a></p>
            <p><i class="fas fa-envelope"></i> <a href="mailto:info@sadaacoo.com">info@sadaacoo.com</a></p>
            <p><i class="fas fa-map-marker-alt"></i> المملكة العربية السعودية</p>
          </section>
        </div>
        <div class="footer-bottom">
          <div class="container">
            © <span id="y">` + year + `</span> مؤسسة صدى الالوان للمقاولات. جميع الحقوق محفوظة.
          </div>
        </div>
        <div class="floating-contact">
          <a class="contact-btn phone" href="tel:+966553011504" aria-label="اتصال"><i class="fas fa-phone"></i></a>
          <a class="contact-btn whatsapp" href="https://wa.me/966553011504" target="_blank" aria-label="واتساب"><i class="fab fa-whatsapp"></i></a>
        </div>
      </footer>
    `;
  }
})();
