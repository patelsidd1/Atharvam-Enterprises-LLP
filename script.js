/**
 * Accessible, Modular, Fade-In Carousel
 * - Images defined in HTML via <img class="carousel-image-full" ...>
 * - Supports arrows, dot navigation, autoplay, hover pause
 */
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ==== Constants ====
  const AUTO_PLAY_MS = 4000;
  const ACTIVE_CLASS = "active";

  // ==== Elements ====
  const slides = Array.from(document.querySelectorAll(".carousel-image-full"));
  const totalSlides = slides.length;
  const dotsContainer = document.querySelector(".carousel-dots");
  const leftArrow = document.querySelector(".carousel-arrow.left");
  const rightArrow = document.querySelector(".carousel-arrow.right");
  const carouselSlides = document.querySelector(".carousel-slides");

  // ==== State ====
  let current = 0;
  let autoPlayTimer = null;

  // ==== Core Methods ====

  /**
   * Display the slide at the given index.
   * @param {number} idx - Target slide index
   */
  function showSlide(idx) {
    // Remove current active
    slides[current].classList.remove(ACTIVE_CLASS);
    // Loop within valid bounds
    current = (idx + totalSlides) % totalSlides;
    slides[current].classList.add(ACTIVE_CLASS);
    updateDots();
    resetAutoplay();
  }

  /**
   * Move to the next slide in the carousel.
   */
  function nextSlide() {
    showSlide(current + 1);
  }

  /**
   * Move to the previous slide in the carousel.
   */
  function prevSlide() {
    showSlide(current - 1);
  }

  // ==== Dot Navigation ====

  /**
   * Initialize or update the dot indicators.
   */
  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `carousel-dot${i === current ? " active" : ""}`;
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => showSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  // ==== Autoplay Management ====

  /**
   * Restart the autoplay timer.
   */
  function resetAutoplay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(nextSlide, AUTO_PLAY_MS);
  }

  // ==== Event Bindings ====

  if (leftArrow) leftArrow.addEventListener("click", prevSlide);
  if (rightArrow) rightArrow.addEventListener("click", nextSlide);

  if (carouselSlides) {
    carouselSlides.addEventListener("mouseenter", () => clearInterval(autoPlayTimer));
    carouselSlides.addEventListener("mouseleave", resetAutoplay);
  }

  // ==== Initialize ====
  if (totalSlides > 0) {
    slides.forEach((slide, i) => slide.classList.toggle(ACTIVE_CLASS, i === 0)); // Show first
    updateDots();
    resetAutoplay();
  }
});
