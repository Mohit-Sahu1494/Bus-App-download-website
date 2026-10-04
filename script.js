/**
 * APEXAPP — JAVASCRIPT CONTROLLER
 * Smooth interactions, download triggers, accordion, tabs, and step guide enhancements.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 2. Installation Platform Tabs (Android / Windows / iOS)
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetPlatform = button.getAttribute('data-tab');

      // Update button active state
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Update pane visibility
      tabPanes.forEach(pane => {
        if (pane.id === `tab-${targetPlatform}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // 3. Smooth Step Navigator Jumper (Offset for fixed/sticky navbar)
  const stepPills = document.querySelectorAll('.step-pill');
  stepPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const targetId = pill.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const yOffset = -90; // Offset to clear sticky navbar
          const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });

          // Temporarily highlight the card
          targetElement.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
          targetElement.style.borderColor = '#4f46e5';
          targetElement.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.15)';
          setTimeout(() => {
            targetElement.style.borderColor = '';
            targetElement.style.boxShadow = '';
          }, 1500);
        }
      }
    });
  });

  // 4. Interactive Simulation Feedback
  const simPulseBtns = document.querySelectorAll('.sim-btn.pulse-btn');
  simPulseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Sahi Choice!';
      btn.style.background = '#10b981';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
      }, 1800);
    });
  });

  // 5. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close other open FAQ items for a clean accordion effect
      faqItems.forEach(otherItem => otherItem.classList.remove('open'));

      // Toggle current item
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // 6. Download Trigger & Feedback Toast
  const directApkBtn = document.getElementById('directApkBtn');
  const mirrorDownloadBtn = document.getElementById('mirrorDownloadBtn');
  const heroDownloadBtn = document.getElementById('heroDownloadBtn');
  const downloadToast = document.getElementById('downloadToast');
  const toastClose = document.getElementById('toastClose');

  function showDownloadToast() {
    if (!downloadToast) return;
    downloadToast.classList.add('show');

    // Auto-hide toast after 5.5 seconds
    setTimeout(() => {
      downloadToast.classList.remove('show');
    }, 5500);
  }

  if (toastClose) {
    toastClose.addEventListener('click', () => {
      downloadToast.classList.remove('show');
    });
  }

  [directApkBtn, mirrorDownloadBtn, heroDownloadBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        showDownloadToast();
      });
    }
  });

  // 7. Copy Link to Clipboard
  const copyBtn = document.getElementById('copyBtn');
  const shareUrlInput = document.getElementById('shareUrlInput');
  const copyBtnText = document.getElementById('copyBtnText');

  if (copyBtn && shareUrlInput) {
    // Populate current window URL if available
    if (window.location.href && window.location.href.startsWith('http')) {
      shareUrlInput.value = window.location.href;
    }

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(shareUrlInput.value);
        const originalText = copyBtnText.innerText;
        copyBtnText.innerText = 'Copied! ✓';
        copyBtn.style.background = '#10b981';

        setTimeout(() => {
          copyBtnText.innerText = originalText;
          copyBtn.style.background = '';
        }, 2500);
      } catch (err) {
        // Fallback for older browsers
        shareUrlInput.select();
        document.execCommand('copy');
        copyBtnText.innerText = 'Copied! ✓';
        setTimeout(() => {
          copyBtnText.innerText = 'Copy Link';
        }, 2000);
      }
    });
  }

  // 8. Navbar Scroll Blur Elevation
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 10px 30px -5px rgba(15, 23, 42, 0.12)';
      navbar.style.borderColor = 'rgba(79, 70, 229, 0.2)';
    } else {
      navbar.style.boxShadow = '';
      navbar.style.borderColor = '';
    }
  });
});
