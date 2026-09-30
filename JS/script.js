/* =========================================================
   EMMANUEL — PORTFOLIO SCRIPTS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     1. MOBILE HAMBURGER MENU
     ========================================================= */

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked (on mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }


  /* =========================================================
     2. CONTACT FORM VALIDATION
     ========================================================= */

  const form = document.getElementById('contactForm');

  if (form) {
    const nameField    = form.querySelector('#name');
    const emailField   = form.querySelector('#email');
    const subjectField = form.querySelector('#subject');
    const messageField = form.querySelector('#message');

    form.addEventListener('submit', (e) => {
      e.preventDefault(); // stop page reload

      let isValid = true;

      // Clear any previous error states
      [nameField, emailField, subjectField, messageField].forEach(field => {
        clearError(field);
      });

      // --- Name ---
      if (nameField.value.trim() === '') {
        showError(nameField, 'Please enter your name.');
        isValid = false;
      }

      // --- Email ---
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailField.value.trim() === '') {
        showError(emailField, 'Please enter your email.');
        isValid = false;
      } else if (!emailPattern.test(emailField.value.trim())) {
        showError(emailField, 'Please enter a valid email address.');
        isValid = false;
      }

      // --- Subject ---
      if (subjectField.value.trim() === '') {
        showError(subjectField, 'Please enter a subject.');
        isValid = false;
      }

      // --- Message ---
      if (messageField.value.trim() === '') {
        showError(messageField, 'Please write a message.');
        isValid = false;
      }

      // --- Success ---
      if (isValid) {
        showSuccessMessage(form, 'Thank you! Your message has been sent.');
        form.reset();
      }
    });
  }


  /* =========================================================
     3. HELPER FUNCTIONS
     ========================================================= */

  function showError(field, message) {
    field.classList.add('input-error');

    // Create an error message under the field if not already there
    let errorEl = field.parentElement.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('p');
      errorEl.classList.add('error-message');
      field.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  function clearError(field) {
    field.classList.remove('input-error');
    const errorEl = field.parentElement.querySelector('.error-message');
    if (errorEl) errorEl.remove();
  }

  function showSuccessMessage(formEl, message) {
    let successEl = formEl.parentElement.querySelector('.success-message');
    if (!successEl) {
      successEl = document.createElement('p');
      successEl.classList.add('success-message');
      formEl.parentElement.appendChild(successEl);
    }
    successEl.textContent = message;

    // Auto-hide after 4 seconds
    setTimeout(() => {
      successEl.remove();
    }, 4000);
  }

});

  /* =========================================================
     4. FADE-IN ON SCROLL
     ========================================================= */

  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target); // only animate once
        }
      });
    }, {
      threshold: 0.15  // trigger when 15% of the element is visible
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    // Fallback for very old browsers — just show everything
    fadeElements.forEach(el => el.classList.add('visible'));
  }


  /* =========================================================
     5. ANIMATE SKILL BARS
     ========================================================= */

  const skillLevels = document.querySelectorAll('.skill-level');

  if (skillLevels.length > 0) {
    // Save the target width from each inline style, then clear it
    skillLevels.forEach(level => {
      const targetWidth = level.style.width || '0%';
      level.dataset.targetWidth = targetWidth;
    });

    // After a small delay, animate to the target
    setTimeout(() => {
      skillLevels.forEach(level => {
        level.style.width = level.dataset.targetWidth;
      });
    }, 300);
  }


  /* =========================================================
     6. NAVBAR SHADOW ON SCROLL
     ========================================================= */

  const navbar = document.querySelector('.navbar');

  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once on load in case page is already scrolled
  }
  