/* ============================================
   Instagram Login Optimization - Main JS
   ============================================ */

'use strict';

// ============================================
// Intersection Observer - Fade In Animations
// ============================================
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-in').forEach(el => {
  fadeObserver.observe(el);
});

// ============================================
// Navbar scroll behavior
// ============================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 80) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
}, { passive: true });

// ============================================
// Smooth scroll for anchor links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// Form interactions
// ============================================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = loginForm.querySelector('.btn-full');
    btn.textContent = 'Connexion en cours...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Se connecter';
      btn.disabled = false;
    }, 1500);
  });
}

// ============================================
// Button click tracking (analytics-ready)
// ============================================
document.querySelectorAll('[data-cta]').forEach(btn => {
  btn.addEventListener('click', () => {
    const label = btn.dataset.cta;
    // Ready for analytics integration (GTM, GA4, etc.)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'cta_click', { event_label: label });
    }
  });
});

// ============================================
// Password toggle visibility
// ============================================
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

if (passwordInput && togglePassword) {
  togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    const icon = togglePassword.querySelector('svg');
    if (type === 'text') {
      icon.innerHTML = `
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      `;
    } else {
      icon.innerHTML = `
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      `;
    }
  });
}
