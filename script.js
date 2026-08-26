/* ============================================================
   SURAJ LAMA MOMO — Demo concept by Mirai
   Vanilla JS: nav scroll state, mobile menu, smooth scroll,
   scroll-reveal, menu filtering, back-to-top.
============================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky nav appearance on scroll ---------- */
  const nav = document.getElementById('nav');
  const toTopBtn = document.getElementById('toTop');

  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    nav.classList.toggle('is-scrolled', scrolled);
    toTopBtn.classList.toggle('is-visible', window.scrollY > 600);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile hamburger menu ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  const closeMenu = () => {
    navToggle.classList.remove('is-open');
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu when a link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('is-open') &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)) {
      closeMenu();
    }
  });

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Small stagger for elements revealed together
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ---------- Menu category filtering ---------- */
  const filterButtons = document.querySelectorAll('.menu__filter');
  const menuItems = document.querySelectorAll('.menu__item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterButtons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      menuItems.forEach(item => {
        const show = filter === 'all' || item.dataset.cat === filter;
        item.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------- Back to top ---------- */
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

});
