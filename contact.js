// contact.js (clean + production-ready)
// Includes: Mobile menu, sticky header, FormSubmit AJAX + Toast + WhatsApp link, FAQ accordion, smooth scroll, UI polish

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // ELEMENTS
  // =========================
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const navMenu = document.querySelector("nav ul");
  const header = document.querySelector("header");

  // Toast elements (make sure toast HTML exists)
  const toast = document.getElementById("toast");
  const toastClose = document.getElementById("toastClose");
  const toastWhatsApp = document.getElementById("toastWhatsApp");

  // Form
  const form = document.getElementById("contactForm");

  // =========================
  // MOBILE MENU TOGGLE
  // =========================
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("active");
      mobileMenuBtn.classList.toggle("open");
    });

    // Close menu when clicking a link (only for internal links)
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
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.98)";
        header.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.1)";
        header.style.height = "80px";
      } else {
        header.style.background = "rgba(255, 255, 255, 0.98)";
        header.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.08)";
        header.style.height = "100px";
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // =========================
  // TOAST HELPERS
  // =========================
  const showToast = (title, text, waLink) => {
    if (!toast) return;

    const tTitle = toast.querySelector(".toast-title");
    const tText = toast.querySelector(".toast-text");

    if (tTitle) tTitle.textContent = title || "Done";
    if (tText) tText.textContent = text || "";

    if (toastWhatsApp) {
      if (waLink) {
        toastWhatsApp.href = waLink;
        toastWhatsApp.style.display = "inline-flex";
      } else {
        toastWhatsApp.style.display = "none";
      }
    }

    toast.classList.add("show");
  };

  const hideToast = () => {
    toast?.classList.remove("show");
  };

  toastClose?.addEventListener("click", hideToast);

  // =========================
  // FORM SUBMISSION (FormSubmit AJAX)
  // =========================
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Honeypot check
      const honey = form.querySelector('input[name="_honey"]');
      if (honey && honey.value.trim() !== "") return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : "";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      try {
        const formData = new FormData(form);

        // Send to FormSubmit
        const res = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (!res.ok) throw new Error("Failed to submit");

        // Build WhatsApp link (prefilled)
        const firstName = (formData.get("first_name") || "").toString().trim();
        const service = (formData.get("service_needed") || "").toString().trim();
        const phone = (formData.get("phone") || "").toString().trim();

        const msg =
          `Hello D.K. Muema & Advocates, my enquiry has been submitted via your website.` +
          (firstName ? ` My name is ${firstName}.` : "") +
          (service ? ` Service: ${service}.` : "") +
          (phone ? ` Phone: ${phone}.` : "") +
          ` Kindly confirm receipt.`;

        const firmWhatsApp = "254721314100"; // digits only
        const waLink = `https://wa.me/${firmWhatsApp}?text=${encodeURIComponent(msg)}`;

        form.reset();
        showToast("Message sent", "Thank you — we’ll respond shortly.", waLink);
      } catch (err) {
        showToast(
          "Couldn’t send",
          "Please try again or contact us via WhatsApp.",
          "https://wa.me/254721314100"
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    });
  }

  // =========================
  // FAQ ACCORDION
  // =========================
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;

    question.addEventListener("click", () => {
      faqItems.forEach((other) => {
        if (other !== item) other.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });

  // =========================
  // SMOOTH SCROLLING
  // =========================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#" || !href.startsWith("#")) return;

      const targetElement = document.querySelector(href);
      if (!targetElement) return;

      e.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        mobileMenuBtn?.classList.remove("open");
      }
    });
  });

  // =========================
  // PAGE LOAD ANIMATIONS (safe)
  // =========================
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  // =========================
  // ESC KEY: close menu + toast
  // =========================
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    // Close toast
    hideToast();

    // Close menu
    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      mobileMenuBtn?.classList.remove("open");
    }
  });

  // =========================
  // WINDOW RESIZE: close menu on desktop
  // =========================
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navMenu) {
      navMenu.classList.remove("active");
      mobileMenuBtn?.classList.remove("open");
    }
  });
});
