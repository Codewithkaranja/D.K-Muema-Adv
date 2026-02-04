// Mobile Menu Toggle
      document
        .querySelector(".mobile-menu")
        .addEventListener("click", function () {
          document.querySelector("nav ul").classList.toggle("active");
        });

      // Smooth Scrolling for Anchor Links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href");
          if (targetId === "#") return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth",
            });

            // Close mobile menu if open
            document.querySelector("nav ul").classList.remove("active");
          }
        });
      });

      // Header background on scroll
      window.addEventListener("scroll", function () {
        const header = document.querySelector("header");
        if (window.scrollY > 100) {
          header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        } else {
          header.style.backgroundColor = "var(--white)";
        }
      });

      // Reveal on scroll effect
const elements = document.querySelectorAll('.about-text, .about-image');

function revealElements() {
  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealElements);
revealElements();
