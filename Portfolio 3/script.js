const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');
const year = document.querySelector('#year');
const header = document.querySelector('.site-header');
const backToTop = document.querySelector('#back-to-top');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navAnchors.forEach((anchor) => {
  anchor.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const updateNavigation = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
  const current = [...sections].reverse().find((section) => window.scrollY >= section.offsetTop - 170);
  navAnchors.forEach((anchor) => anchor.classList.toggle('active', current && anchor.getAttribute('href') === `#${current.id}`));
};
window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

const revealTargets = document.querySelectorAll('.section, .project-card, .skill-card, .timeline-item, .cert-card, .achievement-card, .contact-intro-block, .contact-cta');
document.querySelectorAll('.contact-intro-block, .contact-cta').forEach((target) => {
  target.style.animation = 'none';
});
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}

document.querySelectorAll('.media-placeholder img').forEach((image) => {
  image.addEventListener('error', () => image.classList.add('is-missing'));
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const subject = `Portfolio contact from ${formData.get('name')}`;
  const body = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`;
  window.location.href = `mailto:alex@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formStatus.textContent = 'Your email app should open with this message ready to send.';
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
const updateBackToTop = () => {
  const isVisible = window.scrollY > 520;
  backToTop.classList.toggle('is-visible', isVisible);
  backToTop.setAttribute('aria-hidden', String(!isVisible));
};
window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();
year.textContent = new Date().getFullYear();