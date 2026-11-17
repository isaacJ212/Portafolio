/**
 * ============================================================================
 * HIGH-PERFORMANCE JAVASCRIPT ENGINE
 * Instant UX: 0ms Input Latency, Multi-Theme System, Robust Project Carousel
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Set Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Initialize Saved Theme or Default
  initThemeEngine();

  // 4. Initialize Header Contextual Scroll & Mobile Menu
  initHeader();

  // 5. Initialize Smooth Anchor Navigation
  initAnchorNav();
});

/* ==========================================================================
   1. MULTI-THEME ENGINE (4 Paletas Seleccionables en Vivo)
   ========================================================================== */
const themeLabels = {
  cyber: 'Cian Cyber',
  emerald: 'Verde Terminal',
  indigo: 'Índigo Cloud',
  monochrome: 'Monocromo'
};

function initThemeEngine() {
  const savedTheme = localStorage.getItem('portfolio_theme') || 'cyber';
  setTheme(savedTheme, false);

  const themeBtn = document.getElementById('themePickerBtn');
  const themeMenu = document.getElementById('themeMenu');

  if (themeBtn && themeMenu) {
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = themeMenu.hasAttribute('hidden');
      if (isHidden) {
        themeMenu.removeAttribute('hidden');
      } else {
        themeMenu.setAttribute('hidden', '');
      }
    });

    document.addEventListener('click', () => {
      if (!themeMenu.hasAttribute('hidden')) {
        themeMenu.setAttribute('hidden', '');
      }
    });

    themeMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}

function setTheme(themeName, showNotification = true) {
  if (!['cyber', 'emerald', 'indigo', 'monochrome'].includes(themeName)) {
    themeName = 'cyber';
  }

  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('portfolio_theme', themeName);

  // Update button label
  const labelEl = document.getElementById('currentThemeLabel');
  if (labelEl) {
    labelEl.textContent = themeLabels[themeName] || 'Cian Cyber';
  }

  // Update active state in menu
  document.querySelectorAll('.theme-opt').forEach((btn) => {
    btn.classList.remove('active');
  });
  const activeBtn = document.querySelector(`.theme-opt[onclick*="${themeName}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  // Close menu
  const themeMenu = document.getElementById('themeMenu');
  if (themeMenu) themeMenu.setAttribute('hidden', '');

  if (showNotification) {
    showToast(`Paleta cambiada a: ${themeLabels[themeName]}`, 'info');
  }
}

/* ==========================================================================
   2. HEADER & NATIVE ANCHOR NAVIGATION (0ms Latencia)
   ========================================================================== */
function initHeader() {
  const header = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Background blur on scroll
    if (currentScrollY > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    // Smart contextual auto-hide
    if (currentScrollY > 200 && currentScrollY > lastScrollY && !navMenu.classList.contains('mobile-open')) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
    highlightActiveSection();
  }, { passive: true });

  // Mobile drawer toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('mobile-open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      const icon = mobileToggle.querySelector('[data-lucide]');
      if (icon) {
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });
  }
}

function initAnchorNav() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();

        // Close mobile drawer if opened
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('mobile-open')) {
          navMenu.classList.remove('mobile-open');
          const toggle = document.getElementById('mobileToggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }

        const navHeight = 75;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function highlightActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      if (navLink) navLink.classList.add('active');
    } else {
      if (navLink) navLink.classList.remove('active');
    }
  });
}

/* ==========================================================================
   3. PROYECTOS DESTACADOS: SHOWCASE & CARRUSEL ROBUSTO (Sin Bugs)
   ========================================================================== */
let project1CurrentIndex = 0;
const totalP1Slides = 3;

function switchProject1View(slideIndex) {
  if (slideIndex < 0) slideIndex = 0;
  if (slideIndex >= totalP1Slides) slideIndex = totalP1Slides - 1;

  project1CurrentIndex = slideIndex;

  // Move carousel track smoothly without flex compression
  const track = document.getElementById('carouselTrack1');
  if (track) {
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
  }

  // Update tabs
  for (let i = 0; i < totalP1Slides; i++) {
    const tab = document.getElementById(`p1Tab${i}`);
    const dot = document.getElementById(`p1Dot${i}`);
    if (tab) {
      if (i === slideIndex) tab.classList.add('active');
      else tab.classList.remove('active');
    }
    if (dot) {
      if (i === slideIndex) dot.classList.add('active');
      else dot.classList.remove('active');
    }
  }

  // Update counter badge
  const counter = document.getElementById('p1SlideCounter');
  if (counter) {
    counter.textContent = `Vista ${slideIndex + 1} de ${totalP1Slides}`;
  }
}

function stepProject1Carousel(direction) {
  const nextIndex = (project1CurrentIndex + direction + totalP1Slides) % totalP1Slides;
  switchProject1View(nextIndex);
}

// Proyecto 2 View Switcher (Telemetría vs Código)
function switchProject2View(viewIndex) {
  const tab0 = document.getElementById('p2Tab0');
  const tab1 = document.getElementById('p2Tab1');
  const slide0 = document.getElementById('p2Slide0');
  const slide1 = document.getElementById('p2Slide1');

  if (viewIndex === 0) {
    if (tab0) tab0.classList.add('active');
    if (tab1) tab1.classList.remove('active');
    if (slide0) slide0.style.display = 'block';
    if (slide1) slide1.style.display = 'none';
  } else {
    if (tab1) tab1.classList.add('active');
    if (tab0) tab0.classList.remove('active');
    if (slide1) slide1.style.display = 'block';
    if (slide0) slide0.style.display = 'none';
  }
}

/* ==========================================================================
   4. SOBRE MÍ: DUAL-MODE VISUAL SWITCHER (Avatar Técnico vs Foto)
   ========================================================================== */
function switchAboutMode(mode) {
  const btnTech = document.getElementById('btnAboutTech');
  const btnPhoto = document.getElementById('btnAboutPhoto');
  const badgeTech = document.getElementById('aboutTechBadge');
  const badgePhoto = document.getElementById('aboutPhotoBadge');

  if (mode === 'tech') {
    if (btnTech) btnTech.classList.add('active');
    if (btnPhoto) btnPhoto.classList.remove('active');
    if (badgeTech) badgeTech.style.display = 'block';
    if (badgePhoto) badgePhoto.style.display = 'none';
  } else {
    if (btnPhoto) btnPhoto.classList.add('active');
    if (btnTech) btnTech.classList.remove('active');
    if (badgePhoto) badgePhoto.style.display = 'block';
    if (badgeTech) badgeTech.style.display = 'none';
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/* ==========================================================================
   5. VIDEO DEMO WALKTHROUGH SIMULATION
   ========================================================================== */
let isSimPlaying = false;
let simProgress = 33;
let simInterval = null;

const walkthroughSteps = [
  { at: 0, text: 'Paso 1: Inyección concurrente de eventos y verificación de idempotencia.' },
  { at: 35, text: 'Paso 2: FastAPI despacha transacciones en lotes a cola Redis asíncrona.' },
  { at: 70, text: 'Paso 3: Procedimientos SQL Server indexados procesan 60k registros en < 30s.' },
  { at: 95, text: 'Paso 4: Auditoría criptográfica validada con cero discrepancias financieras.' }
];

function toggleSimulatedPlay() {
  isSimPlaying = !isSimPlaying;
  const ctrlIcon = document.getElementById('ctrlPlayIcon');
  const watermarkIcon = document.getElementById('videoPlayIcon');

  if (isSimPlaying) {
    if (ctrlIcon) ctrlIcon.setAttribute('data-lucide', 'pause');
    if (watermarkIcon) watermarkIcon.setAttribute('data-lucide', 'pause');

    simInterval = setInterval(() => {
      simProgress += 1.5;
      if (simProgress > 100) simProgress = 0;
      updateVideoProgressUI();
    }, 200);
  } else {
    if (ctrlIcon) ctrlIcon.setAttribute('data-lucide', 'play');
    if (watermarkIcon) watermarkIcon.setAttribute('data-lucide', 'play');
    clearInterval(simInterval);
  }

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function updateVideoProgressUI() {
  const bar = document.getElementById('videoTimelinePlayed');
  const timeDisplay = document.getElementById('videoTimeDisplay');
  const descEl = document.getElementById('videoStepDesc');

  if (bar) bar.style.width = `${simProgress}%`;

  const totalSecs = 30;
  const currentSec = Math.floor((simProgress / 100) * totalSecs);
  if (timeDisplay) {
    timeDisplay.textContent = `00:${String(currentSec).padStart(2, '0')} / 00:30`;
  }

  // Update step text
  if (descEl) {
    for (let i = walkthroughSteps.length - 1; i >= 0; i--) {
      if (simProgress >= walkthroughSteps[i].at) {
        descEl.textContent = walkthroughSteps[i].text;
        break;
      }
    }
  }
}

function seekSimulatedVideo(e) {
  const timeline = e.currentTarget;
  const rect = timeline.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  simProgress = Math.min(100, Math.max(0, (clickX / rect.width) * 100));
  updateVideoProgressUI();
}

/* ==========================================================================
   6. MODALS SYSTEM (Video Demo, Certificados, CV)
   ========================================================================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.hidden = false;
  requestAnimationFrame(() => {
    modal.classList.add('modal-active');
  });

  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.remove('modal-active');
  setTimeout(() => {
    modal.hidden = true;
    document.body.style.overflow = '';
  }, 200);

  // Stop video playback simulation if closing video modal
  if (modalId === 'videoModal' && isSimPlaying) {
    toggleSimulatedPlay();
  }
}

function openVideoDemoModal(projectName) {
  const titleEl = document.getElementById('videoModalTitle');
  if (titleEl) {
    titleEl.textContent = `Demo en Video: ${projectName || 'FinPulse Core'}`;
  }
  openModal('videoModal');
}

function openCertModal(title, year, achievement, org) {
  const titleEl = document.getElementById('certModalTitle');
  const reasonEl = document.getElementById('certReason');
  const orgEl = document.getElementById('certOrg');
  const yearEl = document.getElementById('certYearBadge');

  if (titleEl) titleEl.textContent = `Certificado: ${title}`;
  if (reasonEl) reasonEl.textContent = `Por haber obtenido: ${achievement}.`;
  if (orgEl) orgEl.textContent = org || 'Comité Evaluador de Tecnología';
  if (yearEl) yearEl.textContent = year || '2024';

  openModal('certModal');
}

function openCvModal() {
  openModal('cvModal');
}

// Backdrop click and Escape key listeners
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop')) {
    const modalId = e.target.getAttribute('id');
    if (modalId) closeModal(modalId);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.modal-active').forEach((modal) => {
      closeModal(modal.getAttribute('id'));
    });
  }
});

function printCertificate() {
  window.print();
}

function simulateCvDownload() {
  showToast('📄 Descarga de Curriculum Vitae (PDF) generada.', 'success');
  closeModal('cvModal');
}

/* ==========================================================================
   7. CLIPBOARD & FORM HANDLERS
   ========================================================================== */
function copyEmailToClipboard() {
  const emailText = document.getElementById('emailAddress')?.textContent?.trim() || 'tu.correo@ejemplo.com';

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(emailText).then(() => {
      onCopySuccess();
    }).catch(() => {
      fallbackCopy(emailText);
    });
  } else {
    fallbackCopy(emailText);
  }
}

function fallbackCopy(text) {
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  onCopySuccess();
}

function onCopySuccess() {
  const btnText = document.getElementById('copyBtnText');
  const copyIcon = document.getElementById('copyIcon');

  if (btnText) btnText.textContent = '¡Copiado!';
  if (copyIcon) copyIcon.setAttribute('data-lucide', 'check');
  if (typeof lucide !== 'undefined') lucide.createIcons();

  showToast('¡Correo electrónico copiado al portapapeles!', 'success');

  setTimeout(() => {
    if (btnText) btnText.textContent = 'Copiar correo';
    if (copyIcon) copyIcon.setAttribute('data-lucide', 'copy');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }, 2500);
}

function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('btnSubmitForm');
  const originalHtml = btn.innerHTML;

  btn.disabled = true;
  btn.innerHTML = `<span class="mono-code">ENVIANDO...</span>`;

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = originalHtml;
    if (typeof lucide !== 'undefined') lucide.createIcons();

    e.target.reset();
    showToast('¡Mensaje enviado con éxito! Te contactaré a la brevedad.', 'success');
  }, 600);
}

/* ==========================================================================
   8. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const icon = type === 'success' ? 'check-circle-2' : 'info';
  const iconColor = type === 'success' ? 'text-emerald' : 'text-accent';

  toast.innerHTML = `
    <i data-lucide="${icon}" class="icon-sm ${iconColor}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  if (typeof lucide !== 'undefined') lucide.createIcons();

  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => {
      toast.remove();
    }, 200);
  }, 3000);
}

// Global functions exposed to window
window.setTheme = setTheme;
window.switchProject1View = switchProject1View;
window.stepProject1Carousel = stepProject1Carousel;
window.switchProject2View = switchProject2View;
window.switchAboutMode = switchAboutMode;
window.toggleSimulatedPlay = toggleSimulatedPlay;
window.seekSimulatedVideo = seekSimulatedVideo;
window.openVideoDemoModal = openVideoDemoModal;
window.openCertModal = openCertModal;
window.openCvModal = openCvModal;
window.closeModal = closeModal;
window.printCertificate = printCertificate;
window.simulateCvDownload = simulateCvDownload;
window.copyEmailToClipboard = copyEmailToClipboard;
window.handleFormSubmit = handleFormSubmit;
