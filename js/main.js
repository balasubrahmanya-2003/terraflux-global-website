// Main JavaScript for Terraflux site
// - IntersectionObserver for fade-in-up reveals (animates once)
// - Parallax hero background
// - Menu toggle for small screens
// - Sliding gallery controls (translateX)

(function(){
  'use strict';

  // Utility: respects reduced motion
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if(menuToggle && mainNav){
    menuToggle.addEventListener('click', ()=>{
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.style.display = expanded ? '' : 'block';
    });
  }

  // Intersection Observer for reveal elements
  if('IntersectionObserver' in window && !reduceMotion){
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries, o)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('is-visible');
          o.unobserve(e.target);
        }
      });
    },{threshold:0.12});
    reveals.forEach(r=>obs.observe(r));
  } else {
    // Fallback: show all
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'));
  }

  // Parallax hero background (slow) using requestAnimationFrame
  const parallaxEl = document.querySelector('[data-parallax]');
  if(parallaxEl && !reduceMotion){
    let lastScroll = window.scrollY;
    let ticking = false;
    const maxShift = 80; // px
    function update(){
      const scrolled = window.scrollY;
      const shift = Math.min(maxShift, scrolled * 0.15);
      parallaxEl.style.transform = `translateY(${shift}px)`;
      ticking = false;
    }
    window.addEventListener('scroll', ()=>{
      if(!ticking){
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },{passive:true});
  }

  // Sliding gallery control
  function initGallery(trackId){
    const track = document.getElementById(trackId);
    if(!track) return;
    const prev = document.querySelector(`.gallery-prev[data-target="${trackId}"]`);
    const next = document.querySelector(`.gallery-next[data-target="${trackId}"]`);
    const items = track.querySelectorAll('.gallery-item');
    let idx = 0;

    function update(){
      const offset = -idx * 100;
      track.style.transform = `translateX(${offset}%)`;
    }

    function prevSlide(){ idx = Math.max(0, idx-1); update(); }
    function nextSlide(){ idx = Math.min(items.length-1, idx+1); update(); }

    if(prev) prev.addEventListener('click', prevSlide);
    if(next) next.addEventListener('click', nextSlide);

    // Keyboard support
    track.addEventListener('keydown', (e)=>{
      if(e.key === 'ArrowLeft') prevSlide();
      if(e.key === 'ArrowRight') nextSlide();
    });
  }

  // Initialize all gallery tracks on DOM ready
  document.addEventListener('DOMContentLoaded', ()=>{
    initGallery('warehouse-track');
  });

})();
