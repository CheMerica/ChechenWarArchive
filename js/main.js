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

// ── Contact Form Validation ──────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const firstName = document.getElementById('firstName');
  const lastName  = document.getElementById('lastName');
  const city      = document.getElementById('city');
  const zip       = document.getElementById('zip');
  const email     = document.getElementById('email');
  const subject   = document.getElementById('subject');
  const message   = document.getElementById('message');

  // Capitalize first letter of a string
  function capFirst(str) {
    str = str.trim();
    return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
  }

  // Apply capitalize-first on blur for name/city fields
  [firstName, lastName, city].forEach(input => {
    input.addEventListener('blur', () => {
      input.value = capFirst(input.value);
    });
  });

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  function isValidZip(val) {
    return /^\d{5}(-\d{4})?$/.test(val.trim());
  }

  function showError(input, msg) {
    clearError(input);
    const err = document.createElement('p');
    err.className = 'form-error';
    err.textContent = msg;
    input.closest('.form-group').appendChild(err);
    input.classList.add('input-error');
  }

  function clearError(input) {
    const group = input.closest('.form-group');
    const existing = group.querySelector('.form-error');
    if (existing) existing.remove();
    input.classList.remove('input-error');
  }

  // Live validation on blur
  email.addEventListener('blur', () => {
    if (email.value && !isValidEmail(email.value)) {
      showError(email, 'Please enter a valid email address.');
    } else {
      clearError(email);
    }
  });

  zip.addEventListener('blur', () => {
    if (zip.value && !isValidZip(zip.value)) {
      showError(zip, 'Enter a valid zip code — 5 digits or 5+4 (e.g. 12345 or 12345-6789).');
    } else {
      clearError(zip);
    }
  });

  // Submit validation
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    // Capitalize before validating
    firstName.value = capFirst(firstName.value);
    lastName.value  = capFirst(lastName.value);
    city.value      = capFirst(city.value);

    if (!firstName.value.trim()) {
      showError(firstName, 'First name is required.'); valid = false;
    } else { clearError(firstName); }

    if (!lastName.value.trim()) {
      showError(lastName, 'Last name is required.'); valid = false;
    } else { clearError(lastName); }

    if (!city.value.trim()) {
      showError(city, 'City is required.'); valid = false;
    } else { clearError(city); }

    if (!isValidZip(zip.value)) {
      showError(zip, 'Enter a valid zip code — 5 digits or 5+4 (e.g. 12345 or 12345-6789).'); valid = false;
    } else { clearError(zip); }

    if (!isValidEmail(email.value)) {
      showError(email, 'Please enter a valid email address.'); valid = false;
    } else { clearError(email); }

    if (!subject.value.trim()) {
      showError(subject, 'Subject is required.'); valid = false;
    } else { clearError(subject); }

    if (message.value.trim().length < 20) {
      showError(message, 'Message must be at least 20 characters.'); valid = false;
    } else { clearError(message); }

    if (valid) {
      contactForm.insertAdjacentHTML('afterend',
        '<p class="form-success">Message submitted successfully. Thank you.</p>');
      contactForm.reset();
    }
  });
}
