// Navbar collapse on mobile
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    let toggle = document.getElementById('nav-toggle');
    if (toggle) toggle.checked = false;
  });
});



// Hero Slider
let slideIndex = 0;
const slides = document.querySelectorAll('.hero-slider .slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
function showSlide(index) {
  slides.forEach((s, i) => s.classList.toggle('active', i === index));
}
function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}
function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}
if (slides.length) {
  showSlide(slideIndex);
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
  }
  setInterval(nextSlide, 5000);
}





document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navToggleLabel = document.querySelector('.nav-toggle-label');

  // Close menu if clicking outside the menu or hamburger icon
  document.addEventListener('mousedown', function(event) {
    if (
      navToggle.checked &&
      !navLinks.contains(event.target) &&
      !navToggleLabel.contains(event.target)
    ) {
      navToggle.checked = false;
    }
  });

  // OPTIONAL: Close menu if mouse leaves menu for 600ms
  let hoverTimeout;
  navLinks.addEventListener('mouseleave', function() {
    if (navToggle.checked) {
      hoverTimeout = setTimeout(() => {
        navToggle.checked = false;
      }, 600);
    }
  });
  navLinks.addEventListener('mouseenter', function() {
    clearTimeout(hoverTimeout);
  });
});








// Animated Stats
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  document.querySelectorAll('.stat-number').forEach(stat => {
    let target = +stat.getAttribute('data-count');
    let count = 0;
    let step = Math.ceil(target / 60);
    let update = () => {
      count += step;
      if (count > target) count = target;
      stat.textContent = count;
      if (count < target) requestAnimationFrame(update);
    };
    update();
  });
});

// About Tabs
let tabLinks = document.querySelectorAll('.tab-link');
let tabContents = document.querySelectorAll('.tab-content');
if (tabLinks.length && tabContents.length) {
  tabLinks.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      tabLinks.forEach(b => b.classList.remove('active'));
      tabContents.forEach(tc => tc.style.display = 'none');
      btn.classList.add('active');
      tabContents[idx].style.display = 'block';
    });
  });
  // Show first tab by default
  tabLinks[0].classList.add('active');
  tabContents[0].style.display = 'block';
}

// Accordions
document.querySelectorAll('.accordion .accordion-header').forEach(header => {
  header.addEventListener('click', function() {
    let parent = this.parentElement;
    parent.classList.toggle('open');
  });
});

// Gallery Lightbox
const galleryThumbs = document.querySelectorAll('.gallery-thumb');
const galleryData = Array.from(galleryThumbs).map((img, idx) => ({
  url: img.dataset.full,
  type: img.dataset.type,
  caption: img.alt
}));
galleryThumbs.forEach((img, idx) => {
  img.addEventListener('click', () => openLightbox(idx));
});
function openLightbox(startIdx) {
  if (!galleryData.length) return;
  let idx = startIdx;
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  function render() {
    overlay.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close">&times;</button>
        ${galleryData[idx].type === 'video'
          ? `<video src="${galleryData[idx].url}" controls style="max-width:100%;max-height:70vh"></video>`
          : `<img src="${galleryData[idx].url}" alt="" style="max-width:100%;max-height:70vh">`}
        <div class="lightbox-caption">${galleryData[idx].caption || ''}</div>
        <button class="lightbox-nav prev" aria-label="Previous">&#8592;</button>
        <button class="lightbox-nav next" aria-label="Next">&#8594;</button>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('.lightbox-close').onclick = close;
    overlay.querySelector('.lightbox-nav.prev').onclick = () => { idx = (idx-1+galleryData.length)%galleryData.length; rerender(); };
    overlay.querySelector('.lightbox-nav.next').onclick = () => { idx = (idx+1)%galleryData.length; rerender(); };
    overlay.onclick = (e) => { if (e.target === overlay) close(); };
  }
  function rerender() {
    document.body.removeChild(overlay);
    render();
  }
  function close() {
    document.body.removeChild(overlay);
  }
  render();
}

// Contact Form (simple validation)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let msg = document.getElementById('contact-msg');
    msg.textContent = 'Thank you for contacting us! We will get back to you soon.';
    msg.style.color = 'green';
    contactForm.reset();
  });
}















