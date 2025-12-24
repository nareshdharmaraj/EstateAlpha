// Main JavaScript for EstateAlpha - Enhanced Version

// ==================== THEME TOGGLE FUNCTIONALITY ====================
function initThemeToggle() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  // Animate theme transition
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}

// ==================== RTL/LTR TOGGLE FUNCTIONALITY ====================
// Function to toggle RTL
function toggleRTL() {
  const currentDir = document.documentElement.getAttribute('dir');
  const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';

  console.log('Toggling RTL from', currentDir, 'to', newDir);

  document.documentElement.setAttribute('dir', newDir);
  localStorage.setItem('rtl', newDir === 'rtl');

  // Optional: Dispatch event for other scripts to listen to RTL changes
  window.dispatchEvent(new CustomEvent('rtlchange', { detail: { direction: newDir } }));
}

// Function to initialize RTL toggle buttons
function initRTLToggles() {
  // RTL Toggle for mobile and desktop
  const rtlToggleMobile = document.getElementById('rtlToggleMobile');
  const rtlToggle = document.getElementById('rtlToggle');

  // Debug logging
  console.log('RTL Toggle Elements Found:', {
    desktop: !!rtlToggle,
    mobile: !!rtlToggleMobile,
    desktopElement: rtlToggle,
    mobileElement: rtlToggleMobile
  });

  if (rtlToggleMobile) {
    // Remove any existing event listeners to prevent duplicates
    rtlToggleMobile.removeEventListener('click', handleRTLToggles);
    rtlToggleMobile.addEventListener('click', handleRTLToggles);
    console.log('Mobile RTL Toggle Event Listener Attached');
  }

  if (rtlToggle) {
    // Remove any existing event listeners to prevent duplicates
    rtlToggle.removeEventListener('click', handleRTLToggles);
    rtlToggle.addEventListener('click', handleRTLToggles);
    console.log('Desktop RTL Toggle Event Listener Attached');
  }

  // Check for saved RTL preference
  const savedRTL = localStorage.getItem('rtl') === 'true';
  console.log('Saved RTL Preference:', savedRTL);
  if (savedRTL) {
    document.documentElement.setAttribute('dir', 'rtl');
    console.log('RTL Mode Applied from Storage');
  }
}

// Enhanced RTL toggle function with better error handling
function toggleRTL() {
  try {
    const currentDir = document.documentElement.getAttribute('dir');
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';

    console.log('Toggling RTL from', currentDir, 'to', newDir);

    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('rtl', newDir === 'rtl');

    // Dispatch event for other scripts to listen to RTL changes
    window.dispatchEvent(new CustomEvent('rtlchange', { detail: { direction: newDir } }));

    // Update any UI elements that need to change with RTL
    updateRTLUI(newDir);
  } catch (error) {
    console.error('Error toggling RTL:', error);
  }
}

// Function to update UI elements based on RTL direction
function updateRTLUI(direction) {
  // Update any specific UI elements that need RTL adjustments
  console.log('UI updated for', direction, 'direction');

  // You can add specific UI updates here if needed
  // For example, adjusting carousel directions, menu alignments, etc.
}

// Handler function for RTL toggle clicks
function handleRTLToggles(event) {
  console.log('RTL Toggle Clicked:', event.target.id);
  toggleRTL();
}

// DOM Ready Function
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Content Loaded - Initializing EstateAlpha');

  // Initialize theme toggle
  initThemeToggle();

  // Initialize RTL toggles
  initRTLToggles();

  // Initialize animations on scroll
  initScrollAnimations();

  // Navbar scroll effect
  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // Mobile menu toggle - Fixed with proper event handling
  function initMobileMenu() {
    const button = document.querySelector('.mobile-menu-button');
    const menu = document.getElementById('mobileMenu');

    console.log('Initializing mobile menu...', { button: !!button, menu: !!menu });

    if (!button || !menu) {
      console.log('Mobile menu elements not found (this is normal if not on a page with navbar)');
      return;
    }

    let isTogglingMenu = false;

    // Remove old listeners to be safe (though this function runs once per load usually)
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);

    // Re-select after replacement
    const cleanButton = document.querySelector('.mobile-menu-button');

    // Button click handler
    cleanButton.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      isTogglingMenu = true;
      const isActive = menu.classList.contains('active');

      if (isActive) {
        menu.classList.remove('active');
        console.log('Menu closed by button');
      } else {
        menu.classList.add('active');
        console.log('Menu opened by button');
      }

      setTimeout(function () {
        isTogglingMenu = false;
      }, 100);
    });

    // Close menu when clicking links
    const links = menu.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('active');
        console.log('Menu closed by link click');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (isTogglingMenu) return;

      if (menu.classList.contains('active')) {
        if (!menu.contains(e.target) && !cleanButton.contains(e.target)) {
          menu.classList.remove('active');
          console.log('Menu closed by outside click');
        }
      }
    });

    // Prevent menu clicks from closing
    menu.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    console.log('Mobile menu initialized successfully');
  }

  // Initialize immediately
  initMobileMenu();

  // Property carousel functionality
  const carouselItems = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;

  function showCarouselItem(index) {
    carouselItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  function nextCarouselItem() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showCarouselItem(currentIndex);
  }

  // Auto-rotate carousel every 5 seconds
  if (carouselItems.length > 0) {
    setInterval(nextCarouselItem, 5000);
  }

  // Testimonial carousel
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  let testimonialIndex = 0;

  function showTestimonial(index) {
    testimonialItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  function nextTestimonial() {
    testimonialIndex = (testimonialIndex + 1) % testimonialItems.length;
    showTestimonial(testimonialIndex);
  }

  if (testimonialItems.length > 0) {
    setInterval(nextTestimonial, 7000);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Password visibility toggle
  const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#password');

  if (togglePassword && password) {
    togglePassword.addEventListener('click', function () {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      this.querySelector('i').classList.toggle('fa-eye');
      this.querySelector('i').classList.toggle('fa-eye-slash');
    });
  }

  // FAQ Accordion
  const faqButtons = document.querySelectorAll('.faq-accordion .accordion-button');

  console.log('FAQ Buttons found:', faqButtons.length);

  if (faqButtons.length > 0) {
    faqButtons.forEach((button, index) => {
      console.log('Adding event listener to FAQ button', index);
      button.addEventListener('click', function () {
        try {
          console.log('FAQ button clicked', index);
          const collapse = this.nextElementSibling;
          if (!collapse) {
            console.error('No collapse element found for accordion button', index);
            return;
          }

          const isOpen = collapse.classList.contains('show');
          console.log('Accordion', index, 'is open:', isOpen);

          // Close all accordions
          document.querySelectorAll('.faq-accordion .accordion-collapse').forEach(el => {
            el.classList.remove('show');
          });

          document.querySelectorAll('.faq-accordion .accordion-button').forEach(btn => {
            btn.classList.add('collapsed');
            const icon = btn.querySelector('i');
            if (icon) {
              icon.classList.remove('fa-chevron-up');
              icon.classList.add('fa-chevron-down');
            }
          });

          // Open clicked accordion if it wasn't open
          if (!isOpen) {
            collapse.classList.add('show');
            this.classList.remove('collapsed');
            const icon = this.querySelector('i');
            if (icon) {
              icon.classList.remove('fa-chevron-down');
              icon.classList.add('fa-chevron-up');
            }
            console.log('Accordion', index, 'opened');
          } else {
            console.log('Accordion', index, 'closed');
          }

          // Force reflow to ensure content is visible
          collapse.style.display = 'block';
          const content = collapse.querySelector('.p-6');
          if (content) {
            content.style.visibility = 'visible';
            content.style.opacity = '1';
          }
        } catch (error) {
          console.error('Error in FAQ accordion', index, ':', error);
        }
      });
    });
  } else {
    console.log('No FAQ buttons found');
  }

  // Animated counters
  const counterElements = document.querySelectorAll('.counter');

  counterElements.forEach(element => {
    const target = parseInt(element.getAttribute('data-target'));
    if (!isNaN(target)) {
      const increment = target / 100;
      let count = 0;

      const updateCounter = () => {
        if (count < target) {
          count += increment;
          element.innerText = Math.ceil(count) + "+";
          setTimeout(updateCounter, 20);
        } else {
          element.innerText = target + "+";
        }
      };

      // Start counting when element is in viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(element);
    }
  });

  // Dashboard sidebar toggle
  function initSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle && sidebar) {
      // Remove any existing event listeners to prevent duplicates
      sidebarToggle.removeEventListener('click', handleSidebarToggle);
      sidebarToggle.addEventListener('click', handleSidebarToggle);

      // Close sidebar when clicking outside on tablet and mobile
      document.addEventListener('click', function (event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = sidebarToggle.contains(event.target);

        // Check if we're on tablet or mobile view (less than 1024px)
        if (!isClickInsideSidebar && !isClickOnToggle && window.innerWidth < 1024 && sidebar.classList.contains('active')) {
          sidebar.classList.remove('active');

          // Remove body scrolling prevention
          if (window.innerWidth < 1024) {
            document.body.classList.remove('sidebar-open');
          }
        }
      });

      // Close sidebar when window is resized to desktop view
      window.addEventListener('resize', function () {
        if (window.innerWidth >= 1024 && sidebar.classList.contains('active')) {
          sidebar.classList.remove('active');

          // Remove body scrolling prevention
          document.body.classList.remove('sidebar-open');
        }
      });

      // Listen for RTL changes to adjust sidebar behavior
      window.addEventListener('rtlchange', function (event) {
        console.log('RTL changed to:', event.detail.direction);
        // Reset sidebar position when RTL changes
        if (sidebar.classList.contains('active')) {
          sidebar.classList.remove('active');
          document.body.classList.remove('sidebar-open');
        }
      });
    }
  }

  // Handler function for sidebar toggle
  function handleSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('active');

      // Prevent body scrolling when sidebar is open on mobile/tablet
      if (window.innerWidth < 1024) {
        document.body.classList.toggle('sidebar-open');
      }
    }
  }

  // Initialize sidebar toggle
  initSidebarToggle();

  // Function to initialize tooltips
  function initTooltips() {
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }

  // Initialize tooltips when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTooltips);
  } else {
    initTooltips();
  }

  // Also initialize RTL toggles when the page is fully loaded
  window.addEventListener('load', function () {
    console.log('Window Loaded - Reinitializing RTL Toggles');
    initRTLToggles();
  });
});

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));
}

// ==================== SMOOTH PAGE TRANSITIONS ====================
function initPageTransitions() {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
}

// ==================== INTERACTIVE CARD EFFECTS ====================
function initCardEffects() {
  const cards = document.querySelectorAll('.property-card, .card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// ==================== PARALLAX EFFECT ====================
function initParallax() {
  window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(window.pageYOffset * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// ==================== CHART INITIALIZATION ====================
function initCharts() {
  // Check if Chart.js is loaded
  if (typeof Chart !== 'undefined') {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
      const existingChart = Chart.getChart(revenueCtx);
      if (existingChart) existingChart.destroy();

      new Chart(revenueCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Revenue',
            data: [12000, 19000, 15000, 25000, 22000, 30000],
            borderColor: '#F59E0B',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true }
          }
        }
      });
    }

    // Properties Chart
    const propertiesCtx = document.getElementById('propertiesChart');
    if (propertiesCtx) {
      const existingChart = Chart.getChart(propertiesCtx);
      if (existingChart) existingChart.destroy();

      new Chart(propertiesCtx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Properties Sold',
            data: [12, 19, 15, 25, 22, 30],
            backgroundColor: '#1E40AF'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true }
          }
        }
      });
    }

    // User Activity Chart
    const activityCtx = document.getElementById('activityChart');
    if (activityCtx) {
      const existingChart = Chart.getChart(activityCtx);
      if (existingChart) existingChart.destroy();

      new Chart(activityCtx, {
        type: 'doughnut',
        data: {
          labels: ['Views', 'Inquiries', 'Bookings'],
          datasets: [{
            data: [300, 150, 100],
            backgroundColor: ['#1E40AF', '#F59E0B', '#10B981']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    }
  }
}

// ==================== FAQ ACCORDION FUNCTIONALITY ====================
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', function () {
        // Close all other accordions
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle current accordion
        item.classList.toggle('active');
      });
    }
  });
}

// Newsletter subscription handler
function handleNewsletterSubmit(event) {
  event.preventDefault();
  const email = event.target.querySelector('input[type="email"]').value;
  const submitBtn = event.target.querySelector('button');
  const originalText = submitBtn.innerHTML;

  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
  submitBtn.disabled = true;

  // Simulate API call (replace with actual API endpoint)
  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
    submitBtn.classList.add('bg-green-600');
    event.target.reset();

    // Show success message
    alert('Thank you for subscribing! You will receive updates at ' + email);

    // Reset button after 3 seconds
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.classList.remove('bg-green-600');
    }, 3000);
  }, 1500);
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function () {
  initPageTransitions();
  initCardEffects();
  initParallax();
  initCharts();
  initFAQAccordion();
});
