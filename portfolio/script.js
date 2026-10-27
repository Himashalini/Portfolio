const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');
const year = document.querySelector('#year');
const homeLink = document.querySelector('.nav-links a[href="#home"]');
const backToTop = document.querySelector('#back-to-top');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

navAnchors.forEach((anchor) => {
  anchor.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('main section[id]');
  const currentSection = [...sections].reverse().find((section) => window.scrollY >= section.offsetTop - 140);
  navAnchors.forEach((anchor) => anchor.classList.remove('active'));
  if (currentSection) {
    const activeLink = document.querySelector(`.nav-links a[href="#${currentSection.id}"]`);
    if (activeLink) activeLink.classList.add('active');
  } else {
    homeLink.classList.add('active');
  }
  backToTop.classList.toggle('is-visible', window.scrollY > 420);
});

const revealTargets = document.querySelectorAll('.scroll-reveal, .skill-card.reveal, .project-card.project-reveal, .timeline-item.reveal, .cert-item.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const subject = `Portfolio contact from ${formData.get('name')}`;
  const body = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`;
  window.location.href = `mailto:alex@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  if (formStatus) formStatus.textContent = 'Your email app should open with this message ready to send.';
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

year.textContent = new Date().getFullYear();
