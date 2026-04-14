/**
 * BOAZ Study Keycloak Theme - Form Handler
 * Gère l'interactivité du formulaire de connexion
 */

(function () {
  'use strict';

  // ============================================================
  // Password toggle
  // ============================================================

  window.togglePassword = function () {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('kc-password-toggle');

    if (!passwordInput || !toggleBtn) return;

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-label', 'Masquer le mot de passe');
    } else {
      passwordInput.type = 'password';
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-label', 'Afficher le mot de passe');
    }
  };

  // ============================================================
  // Form validation
  // ============================================================

  function setupFormValidation() {
    const form = document.getElementById('kc-form-login');
    if (!form) return;

    const inputs = form.querySelectorAll('[required]');

    form.addEventListener('submit', function (e) {
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });

      if (!isValid) {
        e.preventDefault();
      }
    });

    inputs.forEach((input) => {
      input.addEventListener('input', function () {
        if (this.value.trim()) {
          this.classList.remove('error');
        }
      });

      input.addEventListener('blur', function () {
        if (!this.value.trim()) {
          this.classList.add('error');
        }
      });
    });
  }

  // ============================================================
  // Keyboard shortcuts
  // ============================================================

  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function (e) {
      // Tab management for accessibility
      if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (
          activeElement &&
          (activeElement.tagName === 'INPUT' || activeElement.id === 'kc-password-toggle')
        ) {
          const form = document.getElementById('kc-form-login');
          if (form && activeElement.tagName === 'INPUT') {
            // Check if Enter should submit
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn && form.checkValidity()) {
              form.submit();
            }
          }
        }
      }
    });
  }

  // ============================================================
  // Accessibility enhancements
  // ============================================================

  function setupAccessibility() {
    const form = document.getElementById('kc-form-login');
    if (!form) return;

    // Focus management
    const firstInput = form.querySelector('input[type="text"], input[type="email"], input[type="password"]');
    if (firstInput && !firstInput.value) {
      setTimeout(() => {
        firstInput.focus();
      }, 100);
    }

    // Announce errors to screen readers
    const alerts = document.querySelectorAll('.alert-error');
    if (alerts.length > 0) {
      alerts.forEach((alert) => {
        alert.setAttribute('role', 'alert');
        alert.setAttribute('aria-live', 'polite');
      });
    }
  }

  // ============================================================
  // Loader handling
  // ============================================================

  function setupLoadingState() {
    const form = document.getElementById('kc-form-login');
    if (!form) return;

    form.addEventListener('submit', function () {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        // Restore button if an error occurs (after 3 seconds)
        setTimeout(() => {
          if (document.activeElement !== form) {
            // Form was likely submitted, don't restore
            return;
          }
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
        }, 3000);
      }
    });
  }

  // ============================================================
  // Initialize
  // ============================================================

  document.addEventListener('DOMContentLoaded', function () {
    setupFormValidation();
    setupKeyboardShortcuts();
    setupAccessibility();
    setupLoadingState();
  });

  // Fallback initialization if DOMContentLoaded already fired
  if (document.readyState !== 'loading') {
    setupFormValidation();
    setupKeyboardShortcuts();
    setupAccessibility();
    setupLoadingState();
  }
})();
