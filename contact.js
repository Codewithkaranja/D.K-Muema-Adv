// =========================
// MOBILE MENU TOGGLE
// =========================
const mobileMenuBtn = document.querySelector(".mobile-menu");
const navMenu = document.querySelector("nav ul");

// Toggle mobile menu
if (mobileMenuBtn && navMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    // Toggle hamburger icon (optional: add open class for animation)
    mobileMenuBtn.classList.toggle("open");
  });

  // Close menu when clicking on a link
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      mobileMenuBtn.classList.remove("open");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      navMenu.classList.remove("active");
      mobileMenuBtn.classList.remove("open");
    }
  });
}

// =========================
// STICKY HEADER ON SCROLL
// =========================
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.1)";
    header.style.height = "80px";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.08)";
    header.style.height = "100px";
  }
});

// =========================
// CONTACT FORM SUBMISSION
// =========================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName")?.value;
    const phone = document.getElementById("phone")?.value;

    if (firstName && phone) {
      alert(
        `Thank you ${firstName}! We have received your inquiry and will contact you at ${phone} within 24 hours.`
      );
      contactForm.reset();
    }
  });
}

// =========================
// FAQ ACCORDION
// =========================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  if (question) {
    question.addEventListener("click", () => {
      // Close other items
      faqItems.forEach((other) => {
        if (other !== item) other.classList.remove("active");
      });
      
      // Toggle current item
      item.classList.toggle("active");
    });
  }
});

// =========================
// SMOOTH SCROLLING
// =========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    
    // Skip empty or just "#" links
    if (href === "#" || href === "") return;
    
    // Don't prevent default for non-# links
    if (!href.startsWith("#")) return;
    
    e.preventDefault();
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
      
      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        mobileMenuBtn?.classList.remove("open");
      }
    }
  });
});

// =========================
// METHOD CARD HOVER EFFECT (already in CSS, but keeping for backup)
// =========================
document.querySelectorAll(".method-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
    card.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.1)";
  });
  
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "0 8px 20px var(--shadow-md)";
  });
});

// =========================
// PAGE LOAD ANIMATIONS
// =========================
window.addEventListener("load", () => {
  // Add loaded class to body for fade-in effect
  document.body.classList.add("loaded");
  
  // Animate in page header elements
  const pageHeader = document.querySelector(".page-header h1");
  if (pageHeader) {
    setTimeout(() => {
      pageHeader.style.animation = "fadeInUp 0.8s ease-out";
    }, 300);
  }
});

// =========================
// WHATSAPP BUTTON CLICK
// =========================
const whatsappBtn = document.querySelector(".whatsapp-float");
if (whatsappBtn) {
  whatsappBtn.addEventListener("click", (e) => {
    // Prevent default if it's a link
    if (whatsappBtn.tagName === "A") {
      e.preventDefault();
    }
    
    const phoneNumber = "+254XXXXXXXXX"; // Replace with your number
    const message = "Hello! I'm interested in your services.";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, "_blank");
  });
}

// =========================
// STICKY QUOTE BUTTON
// =========================
const stickyQuote = document.querySelector(".sticky-quote");
if (stickyQuote) {
  stickyQuote.addEventListener("click", () => {
    // Scroll to contact form
    const contactSection = document.querySelector(".contact-main");
    if (contactSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = contactSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
}

// =========================
// WINDOW RESIZE HANDLER
// =========================
window.addEventListener("resize", () => {
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768 && navMenu) {
    navMenu.classList.remove("active");
    mobileMenuBtn?.classList.remove("open");
  }
});

// =========================
// ESCAPE KEY TO CLOSE MENU
// =========================
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    mobileMenuBtn?.classList.remove("open");
  }
});