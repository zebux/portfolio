/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

/* -----------------------------------------
  Certifications Filter Functionality
 ---------------------------------------- */

const filterButtons = document.querySelectorAll('.certif__filter-badge');
const certCards = document.querySelectorAll('.certif__card');

// Count certifications
function updateCounts() {
  const totalCount = certCards.length;
  const countElement = document.getElementById('count-all');
  if (countElement) {
    countElement.textContent = totalCount;
  }
}

// Filter cards
function filterCertifications(category) {
  certCards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
      card.style.animation = 'fadeInUp 0.6s ease-out forwards';
    } else {
      card.style.display = 'none';
    }
  });
  
  // Update active filter
  filterButtons.forEach(btn => {
    if (btn.dataset.filter === category) {
      btn.classList.add('certif__filter-badge--active');
    } else {
      btn.classList.remove('certif__filter-badge--active');
    }
  });
}

// Add click event to filter buttons
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterCertifications(filter);
  });
});

// Initialize counts
updateCounts();
