
// JavaScript موحّد للهيدر والفوتر + تحسينات للجوال
document.addEventListener('DOMContentLoaded', () => {
  /* ========== Mobile Nav Toggle ========== */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const header = document.querySelector('header');

  function openNav(){
    if(!navMenu) return;
    navMenu.classList.add('active');
    mobileToggle?.classList.add('active');
    document.body.classList.add('no-scroll');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded','true');
    // التركيز على أول رابط
    const firstLink = navMenu.querySelector('a');
    firstLink && firstLink.focus();
  }
  function closeNav(){
    if(!navMenu) return;
    navMenu.classList.remove('active');
    mobileToggle?.classList.remove('active');
    document.body.classList.remove('no-scroll');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded','false');
    mobileToggle && mobileToggle.focus();
  }

  if (mobileToggle && navMenu){
    mobileToggle.setAttribute('aria-label','فتح/إغلاق القائمة');
    mobileToggle.setAttribute('aria-controls','primary-navigation');
    navMenu.setAttribute('id','primary-navigation');

    mobileToggle.addEventListener('click', () => {
      navMenu.classList.contains('active') ? closeNav() : openNav();
    });

    // إغلاق عند النقر خارج القائمة (على الجوال)
    document.addEventListener('click', (e) => {
      if (!navMenu.classList.contains('active')) return;
      const within = navMenu.contains(e.target) || mobileToggle.contains(e.target);
      if (!within) closeNav();
    });

    // إغلاق Esc
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && navMenu.classList.contains('active')) closeNav();
    });

    // إغلاق عند تغيير المقاس للديسكتوب
    window.addEventListener('resize', ()=>{
      if (window.innerWidth >= 992 && navMenu.classList.contains('active')) {
        closeNav();
      }
    });
  }

  /* ========== Active Link Detection ========== */
  const currentPage = decodeURIComponent((window.location.pathname.split('/').pop() || 'index.html') || 'index.html');
  document.querySelectorAll('.nav-menu a').forEach(a => {
    a.classList.remove('active');
    const href = decodeURIComponent(a.getAttribute('href') || '');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ========== Header scroll behavior ========== */
  let lastScroll = 0;
  if (header){
    window.addEventListener('scroll', () => {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      if (y > lastScroll && y > 80){ header.style.transform = 'translateY(-100%)'; }
      else { header.style.transform = 'translateY(0)'; }
      lastScroll = y <= 0 ? 0 : y;

      if (y > 40){
        header.style.background = 'rgba(255,255,255,.98)';
        header.style.backdropFilter = 'blur(10px)';
      } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
      }
    });
  }

  /* ========== Smooth Internal Anchors ========== */
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener('click', (e)=>{
      const id = link.getAttribute('href');
      const el = document.querySelector(id);
      if (el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
        closeNav();
      }
    });
  });

  /* ========== Lazy Images (data-src) ========== */
  const lazyImgs = document.querySelectorAll('img[data-src]');
  const imgObs = new IntersectionObserver((entries, obs)=>{
    entries.forEach(ent=>{
      if (ent.isIntersecting){
        const img = ent.target;
        img.src = img.dataset.src;
        img.onload = ()=> img.classList.add('loaded');
        obs.unobserve(img);
      }
    });
  },{rootMargin:'200px 0px'});
  lazyImgs.forEach(i=> imgObs.observe(i));

  /* ========== Footer reveal on scroll ========== */
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting){
        entry.target.style.opacity='1';
        entry.target.style.transform='translateY(0)';
      }
    });
  },{threshold:.1, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.footer-section').forEach(sec=>{
    sec.style.opacity='0';sec.style.transform='translateY(24px)';
    sec.style.transition='opacity .5s ease, transform .5s ease';
    observer.observe(sec);
  });

  /* ========== Click ripple for social/keywords ========== */
  function addRipple(el){
    el.addEventListener('click', function(){
      const r = document.createElement('span');
      Object.assign(r.style,{
        position:'absolute',left:'50%',top:'50%',width:'18px',height:'18px',
        marginLeft:'-9px',marginTop:'-9px',borderRadius:'50%',
        background:'rgba(255,255,255,.5)',transform:'scale(0)',
        animation:'ripple .5s linear',pointerEvents:'none'
      });
      this.style.position='relative';
      this.appendChild(r); setTimeout(()=>r.remove(), 500);
    });
  }
  document.querySelectorAll('.top-social a, .footer-section a, .keyword-tag').forEach(addRipple);

  // Small parallax hint for footer background (non-critical)
  window.addEventListener('scroll', ()=>{
    const footer = document.querySelector('footer');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.2;
    if (footer) footer.style.backgroundPosition = `center ${rate}px`;
  });

  // Add keyframes if not exists
  const style = document.createElement('style');
  style.textContent = `@keyframes ripple{to{transform:scale(4);opacity:0}} .lazy{opacity:0;transition:opacity .3s}.lazy.loaded{opacity:1}`;
  document.head.appendChild(style);
});
