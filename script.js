const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'light') {
  body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  localStorage.setItem('portfolio-theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

const reveals = document.querySelectorAll('.reveal');
function revealVisibleElements() {
  reveals.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 70) item.classList.add('show');
  });
}
window.addEventListener('load', revealVisibleElements);
window.addEventListener('scroll', revealVisibleElements);

const navLinks = document.querySelectorAll('.nav-link');
const pageSections = document.querySelectorAll('.page-section');
const quickNavs = document.querySelectorAll('.quick-nav');

function switchPage(pageId) {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });

  pageSections.forEach((section) => {
    const isActive = section.id === pageId;
    section.classList.toggle('active-page', isActive);
    if (isActive) {
      section.querySelectorAll('.reveal').forEach((el, index) => {
        el.classList.remove('show');
        setTimeout(() => el.classList.add('show'), 50 * (index + 1));
      });
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => switchPage(link.dataset.page));
});
quickNavs.forEach((button) => {
  button.addEventListener('click', () => switchPage(button.dataset.page));
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-thumb');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    projectCards.forEach((card) => {
      const match = filter === 'all' || filter === card.dataset.filter;
      card.classList.toggle('hide', !match);
    });
  });
});

const modal = document.getElementById('projectModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalPeriod = document.getElementById('modalPeriod');
const modalDescription = document.getElementById('modalDescription');
const modalDetails = document.getElementById('modalDetails');
const modalTags = document.getElementById('modalTags');
const modalActions = document.getElementById('modalActions');

function renderModalLink(link) {
  modalActions.innerHTML = '';
  if (!link) return;

  const anchor = document.createElement('a');
  anchor.href = link;
  anchor.target = '_blank';
  anchor.rel = 'noreferrer';
  anchor.className = 'modal-open-link';
  anchor.textContent = 'Open Project Link';
  modalActions.appendChild(anchor);
}

function openProjectModal(card) {
  modalTitle.textContent = card.dataset.title;
  modalCategory.textContent = card.dataset.category;
  modalPeriod.textContent = card.dataset.period;
  modalDescription.textContent = card.dataset.description;
  modalDetails.textContent = card.dataset.details;

  modalTags.innerHTML = '';
  (card.dataset.tags || '').split(',').filter(Boolean).forEach((tag) => {
    const chip = document.createElement('span');
    chip.textContent = tag.trim();
    modalTags.appendChild(chip);
  });

  renderModalLink(card.dataset.link || '');

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

projectCards.forEach((card) => {
  const overlayButton = card.querySelector('.project-overlay-btn');

  overlayButton.addEventListener('click', (event) => {
    event.stopPropagation();
    openProjectModal(card);
  });

  card.addEventListener('click', () => {
    if (card.dataset.link) {
      window.open(card.dataset.link, '_blank');
    } else {
      openProjectModal(card);
    }
  });

  if (card.dataset.link) {
    card.setAttribute('title', 'Klik card untuk buka link, klik View untuk lihat detail');
  }
});

function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});
