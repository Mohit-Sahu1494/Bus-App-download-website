/**
 * CAMPUS BUS DHSGSU — JAVASCRIPT CONTROLLER
 * Lightweight, Mobile-First, Accessible
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          const icon = mobileToggle.querySelector('i');
          if (icon) icon.className = 'fa-solid fa-bars';
        }
      }
    });
  }

  // 2. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close other FAQ items for a clean single-open accordion
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            const otherBtn = other.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        item.classList.toggle('open', !isOpen);
        questionBtn.setAttribute('aria-expanded', !isOpen);
      });
    }
  });

  // 3. Download Trigger & Feedback Toast
  const downloadButtons = document.querySelectorAll(
    '#heroDownloadBtn, #directApkBtn, #mirrorDownloadBtn, .mobile-sticky-btn, .mobile-nav-download'
  );
  const downloadToast = document.getElementById('downloadToast');
  const toastClose = document.getElementById('toastClose');
  let toastTimer = null;

  function showDownloadToast() {
    if (!downloadToast) return;
    downloadToast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      downloadToast.classList.remove('show');
    }, 5000);
  }

  downloadButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showDownloadToast();
    });
  });

  if (toastClose) {
    toastClose.addEventListener('click', () => {
      downloadToast.classList.remove('show');
      clearTimeout(toastTimer);
    });
  }

  // 4. Share Link Copy to Clipboard
  const copyBtn = document.getElementById('copyBtn');
  const shareUrlInput = document.getElementById('shareUrlInput');
  const copyBtnText = document.getElementById('copyBtnText');

  if (copyBtn && shareUrlInput) {
    // Populate current URL if loaded in web environment
    if (window.location.protocol.startsWith('http')) {
      shareUrlInput.value = window.location.href.split('#')[0];
    }

    copyBtn.addEventListener('click', async () => {
      const textToCopy = shareUrlInput.value;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          shareUrlInput.select();
          document.execCommand('copy');
        }

        const originalText = copyBtnText ? copyBtnText.textContent : 'Copy Link';
        if (copyBtnText) copyBtnText.textContent = 'Copied! ✓';
        copyBtn.style.background = '#10b981';

        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = originalText;
          copyBtn.style.background = '';
        }, 2200);
      } catch (err) {
        shareUrlInput.select();
        document.execCommand('copy');
      }
    });
  }

  // 5. Mobile Sticky Bottom Bar Visibility on Scroll
  const mobileStickyBar = document.getElementById('mobileStickyBar');
  const heroSection = document.getElementById('home');

  function handleScroll() {
    // Navbar elevation
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 30) {
        navbar.style.boxShadow = '0 8px 24px -4px rgba(15, 23, 42, 0.12)';
      } else {
        navbar.style.boxShadow = '';
      }
    }

    // Mobile sticky download bar
    if (mobileStickyBar && heroSection) {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (heroBottom < 100 && window.innerWidth <= 768) {
        mobileStickyBar.classList.add('visible');
      } else {
        mobileStickyBar.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });
  handleScroll();

  // 6. Smooth Scroll with Navbar Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const navOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
