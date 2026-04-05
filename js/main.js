const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
const overlay = document.querySelector('.nav-overlay');
toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  toggle.classList.toggle('open');
  overlay.classList.toggle('active');
});
overlay.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.classList.remove('open');
  overlay.classList.remove('active');
});
