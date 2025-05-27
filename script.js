const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('fa-xmark'); // Change icon on click
    navbar.classList.toggle('active');
});

// Toggle dropdown on mobile
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(drop => {
    drop.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault(); // prevent link jump
            drop.classList.toggle('active');
        }
    });
});


// =============================================================

            // carousal slide

  document.addEventListener('DOMContentLoaded', function() {
    const carouselSlide = document.querySelector('.carousel-slide');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    const progressBar = document.querySelector('.progress-bar');
    
    let counter = 0;
    let autoSlideInterval;
    const slideIntervalTime = 5000; // 5 seconds
    let isTransitioning = false;
    
    // Initialize carousel
    function initCarousel() {
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                if (!isTransitioning) goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
        
        // Set first slide as active
        slides[0].classList.add('active');
        
        // Start auto sliding
        startAutoSlide();
    }
    
    // Set up the auto-sliding
    function startAutoSlide() {
        resetProgressBar();
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, slideIntervalTime);
    }
    
    // Reset progress bar animation
    function resetProgressBar() {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0';
        void progressBar.offsetWidth; // Trigger reflow
        progressBar.style.transition = `width ${slideIntervalTime}ms linear`;
        progressBar.style.width = '100%';
    }
    
    // Stop auto-sliding when user interacts
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
        progressBar.style.transition = 'none';
        progressBar.style.width = '0';
    }
    
    // Go to next slide
    function nextSlide() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        counter = (counter + 1) % slides.length;
        updateCarousel();
    }
    
    // Go to previous slide
    function prevSlide() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        counter = (counter - 1 + slides.length) % slides.length;
        updateCarousel();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (isTransitioning || index === counter) return;
        
        isTransitioning = true;
        counter = index;
        updateCarousel();
    }
    
    // Update carousel position and active elements
    function updateCarousel() {
        // Update slide position
        carouselSlide.style.transform = `translateX(${-100 * counter}%)`;
        
        // Update active slide
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === counter);
        });
        
        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === counter);
        });
        
        // Reset progress bar for new slide
        resetProgressBar();
        
        // Restart auto sliding
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Handle transition end
    carouselSlide.addEventListener('transitionend', () => {
        isTransitioning = false;
    });
    
    // Button event listeners
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
    });
    
    // Pause on hover
    carouselSlide.addEventListener('mouseenter', stopAutoSlide);
    carouselSlide.addEventListener('mouseleave', startAutoSlide);
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselSlide.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, {passive: true});
    
    carouselSlide.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    }, {passive: true});
    
    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + threshold) {
            prevSlide();
        }
    }
    
    // Initialize the carousel
    initCarousel();
});

// ================================================================
      //  slides

const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 30,

  // Pagination bullets
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Responsive breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  }
});