/* ═══════════════════════════════════════════════════════
   WEBLOOM — Portfolio JS
   Vanilla JS — sin dependencias
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ─── NAV: scroll effect ─── */
const nav = document.getElementById('nav');
const SCROLL_THRESHOLD = 40;

function handleNavScroll() {
  nav.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // run once on load


/* ─── NAV: mobile toggle ─── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-label', 'Abrir menú');
    document.body.style.overflow = '';
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-label', 'Abrir menú');
    document.body.style.overflow = '';
  }
});


/* ─── SCROLL REVEAL ─── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // fire once
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  }
);

revealElements.forEach(el => revealObserver.observe(el));


/* ─── PROYECTO FILTER ─── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const proyectCards = document.querySelectorAll('.proyecto-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active state
    filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');

    const filter = btn.dataset.filter;

    proyectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;

      if (match) {
        card.removeAttribute('data-hidden');
        card.style.display = '';
        // Trigger re-reveal if not already visible
        if (!card.classList.contains('visible')) {
          card.classList.add('visible');
        }
      } else {
        card.setAttribute('data-hidden', 'true');
        card.style.display = 'none';
      }
    });
  });
});


/* ─── BACK TO TOP ─── */
const backTop = document.getElementById('backTop');

function handleBackTop() {
  backTop.classList.toggle('visible', window.scrollY > 500);
}

window.addEventListener('scroll', handleBackTop, { passive: true });

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ─── ACTIVE NAV LINK (highlight on scroll) ─── */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav__link');

function highlightNav() {
  const scrollY = window.scrollY + 100;
  let current = '';

  sections.forEach(section => {
    if (scrollY >= section.offsetTop) {
      current = section.id;
    }
  });

  navLinkEls.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--text)'
      : '';
  });
}

window.addEventListener('scroll', highlightNav, { passive: true });


/* ─── SMOOTH ANCHOR for same-page links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ─── SUBTLE CURSOR GLOW on hero (optional, desktop only) ─── */
if (window.matchMedia('(pointer: fine)').matches) {
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      hero.style.setProperty('--mouse-x', `${x}px`);
      hero.style.setProperty('--mouse-y', `${y}px`);
    });
  }
}
