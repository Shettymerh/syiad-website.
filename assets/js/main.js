/**
 * SOCIETY FOR YOUTHS INTEGRITY AND AFRICAN DEVELOPMENT (SYIAD)
 * Official Website JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  highlightActiveNav();
  initContactForm();
  initBackToTop();
});

/**
 * Mobile Navigation Toggle & Accessibility
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    toggleBtn.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.classList.toggle('nav-open', !isExpanded);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.classList.remove('nav-open');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.classList.remove('nav-open');
      toggleBtn.focus();
    }
  });

  // Close when a nav link is clicked
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.classList.remove('nav-open');
    });
  });
}

/**
 * Highlight Active Page in Navbar
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * Contact Form Handler (Client-side validation & transparent mailto helper)
 */
function initContactForm() {
  const contactForm = document.getElementById('syiadContactForm');
  const alertBox = document.getElementById('formAlert');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('emailAddress');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const subject = subjectInput ? subjectInput.value.trim() : 'Inquiry to SYIAD';
    const message = messageInput ? messageInput.value.trim() : '';

    // Create mailto link for direct submission via client email client
    const mailtoBody = encodeURIComponent(
      `Full Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via SYIAD Website Contact Form`
    );
    const mailtoSubject = encodeURIComponent(`[SYIAD Contact] ${subject}`);
    const mailtoUrl = `mailto:syiadafrica@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    if (alertBox) {
      alertBox.className = 'form-alert success';
      alertBox.innerHTML = `
        <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
          <svg style="width:24px;height:24px;flex-shrink:0;fill:#059669;margin-top:2px;" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <div>
            <strong style="color: #065F46; font-size: 1rem; display: block; margin-bottom: 0.35rem;">
              Form Inputs Validated!
            </strong>
            <p style="margin-bottom: 0.75rem; color: #047857; font-size: 0.9rem;">
              <strong>Notice:</strong> This website currently operates as a frontend portal and does not connect to an automated background mail server. To send your official inquiry directly to the <strong>Society for Youths Integrity and African Development</strong>, click below to open your preferred email client or email us manually at <a href="mailto:syiadafrica@gmail.com" style="text-decoration:underline; font-weight:700;">syiadafrica@gmail.com</a>.
            </p>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
              <a href="${mailtoUrl}" class="btn btn-sm btn-primary" style="background:#059669; border-color:#059669;">
                Open Email Client with this Message
              </a>
              <button type="button" id="dismissAlertBtn" class="btn btn-sm btn-outline" style="border-color:#059669; color:#065F46;">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      `;

      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      const dismissBtn = document.getElementById('dismissAlertBtn');
      if (dismissBtn) {
        dismissBtn.addEventListener('click', () => {
          alertBox.className = 'form-alert';
          alertBox.style.display = 'none';
        });
      }
    }

    contactForm.reset();
  });
}

/**
 * Back to top button
 */
function initBackToTop() {
  const backBtn = document.getElementById('backToTopBtn');
  if (!backBtn) return;

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
