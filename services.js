// ============================
// Variables
// ============================
const mobileMenu = document.querySelector(".mobile-menu");
const navMenu = document.querySelector("nav ul");
const faqQuestions = document.querySelectorAll(".faq-question");
const header = document.querySelector("header");

// ============================
// Mobile Menu Toggle
// ============================
mobileMenu.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  // Optional: toggle icon animation
  mobileMenu.classList.toggle("open");
});

// ============================
// Smooth Scrolling for Anchor Links
// ============================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    // Ignore empty anchors
    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    e.preventDefault();

    // Smooth scroll with offset for fixed header
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: "smooth",
    });

    // Close mobile menu if open
    navMenu.classList.remove("active");
    mobileMenu.classList.remove("open");
  });
});

// ============================
// FAQ Toggle with Accessibility
// ============================
faqQuestions.forEach((question) => {
  // Ensure aria-expanded is initialized
  question.setAttribute("aria-expanded", "false");

  question.addEventListener("click", () => {
    const faqItem = question.parentElement;
    const answer = faqItem.querySelector(".faq-answer");

    const isActive = faqItem.classList.toggle("active");
    answer.classList.toggle("active");

    // Update aria-expanded for screen readers
    question.setAttribute("aria-expanded", isActive);
  });
});

// ============================
// Header Background on Scroll (Throttled)
// ============================
let isScrolling = false;

window.addEventListener("scroll", () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      if (window.scrollY > 100) {
        header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.08)";
      } else {
        header.style.backgroundColor = "var(--white)";
        header.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.08)";
      }
      isScrolling = false;
    });
    isScrolling = true;
  }
});

// ============================
// Services Swiper Slider
// ============================
const servicesSwiper = new Swiper(".services-swiper", {
  slidesPerView: 3,
  spaceBetween: 40,
  loop: true, // enable infinite loop
  grabCursor: true,
  autoplay: {
    delay: 2000, // 2 seconds per slide
    disableOnInteraction: false, // continue autoplay even after user interacts
  },
  speed: 800, // smooth transition speed
  breakpoints: {
    0: { slidesPerView: 1, spaceBetween: 20 },
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 30 },
    1024: { slidesPerView: 3, spaceBetween: 40 },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
