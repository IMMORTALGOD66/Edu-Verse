// site.js - mobile menu, smooth scrolling, reveal-on-scroll
(function(){
  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.getElementById('nav-links');

  if(mobileBtn && mobileMenu){
    mobileBtn.addEventListener('click', () => {
      const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      mobileBtn.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('show');
    });

    // close menu when clicking a link inside it
    mobileMenu.addEventListener('click', (e) => {
      if(e.target.tagName === 'A'){
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
        mobileBtn.setAttribute('aria-expanded','false');
      }
    });
  }

  // Smooth scroll for internal anchors
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const href = a.getAttribute('href');
    if(href === '#' || href === '') return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      // update focus for keyboard users
      target.setAttribute('tabindex','-1');
      target.focus({preventScroll:true});
      window.setTimeout(()=> target.removeAttribute('tabindex'),1000);
    }
  });

  // Reveal-on-scroll using IntersectionObserver
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));

  // Small enhancement: add shadow to header when scrolling
  const header = document.querySelector('header');
  if(header){
    const observer = new IntersectionObserver(([e]) => header.classList.toggle('shadow-sm', !e.isIntersecting));
    // sentinel element at top
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.width = '1px';
    sentinel.style.height = '1px';
    document.body.prepend(sentinel);
    observer.observe(sentinel);
  }
})();

/* ------------------------------------------------------------------
   Slide navigation logic (appended from slides.js)
   Merged so there is only a single site JS file to include in the page.
------------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const navDotsContainer = document.getElementById('nav-dots');
  let currentSlide = 1;
  const totalSlides = slides.length;

  // Hide feature-list items initially so JS can animate them in. If JS fails, this class won't be added and lists stay visible.
  document.querySelectorAll('.feature-list').forEach(list => list.classList.add('js-hidden'));

  // Helper function to update the UI (slides, buttons, dots)
  function updateUI() {
    // 1. Update Slides
    slides.forEach(slide => {
      slide.classList.remove('active');
      // Hide feature lists on all slides
      slide.querySelectorAll('.feature-list').forEach(list => list.classList.add('js-hidden'));
      // Reset feature list item animations
      slide.querySelectorAll('.feature-list li').forEach(item => {
        item.style.animation = 'none';
      });
    });

    const activeSlide = document.querySelector(`[data-slide="${currentSlide}"]`);
    if (activeSlide) {
      activeSlide.classList.add('active');

      // Reveal and animate list items on the active slide
      activeSlide.querySelectorAll('.feature-list').forEach(list => list.classList.remove('js-hidden'));
      activeSlide.querySelectorAll('.feature-list li').forEach((item, index) => {
        item.style.animation = `fadeIn 0.8s cubic-bezier(0.39, 0.575, 0.565, 1) forwards ${index * 0.15 + 0.2}s`;
      });
    }
        
    // 2. Update Buttons
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;
        
    // 3. Update Dots
    document.querySelectorAll('.dot').forEach(dot => {
      const slideIndex = parseInt(dot.dataset.slide, 10);
      dot.classList.toggle('active', slideIndex === currentSlide);
    });
  }

  // Initialize Navigation Dots
  function initDots() {
    navDotsContainer.innerHTML = '';
    for (let i = 1; i <= totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.dataset.slide = i;
      dot.tabIndex = 0;
      dot.setAttribute('role', 'button');
      dot.setAttribute('aria-label', `Go to slide ${i}`);
      dot.addEventListener('click', () => {
        currentSlide = i;
        updateUI();
      });
      dot.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); dot.click(); } });
      navDotsContainer.appendChild(dot);
    }
  }

  // Navigation Handlers
  nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides) {
      currentSlide++;
      updateUI();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentSlide > 1) {
      currentSlide--;
      updateUI();
    }
  });

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextBtn.click();
    } else if (e.key === 'ArrowLeft') {
      prevBtn.click();
    }
  });

  // Initial load
  initDots();
  updateUI(); // Set the initial state
});
