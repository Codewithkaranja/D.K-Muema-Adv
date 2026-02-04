document.addEventListener("DOMContentLoaded", () => {
  /* ====== VARIABLES ====== */
  const mobileMenu = document.querySelector(".mobile-menu");
  const navMenu = document.querySelector("nav ul");
  const header = document.querySelector("header");
  const typewriterSpan = document.getElementById("typewriter");
  const statNumbers = document.querySelectorAll(".stat-number");
  const serviceCards = document.querySelectorAll(".service-card");
  const filterButtons = document.querySelectorAll(".filter-btn");

  const chatBody = document.getElementById("chat-body");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const closeChat = document.getElementById("close-chat");
  const whatsappBtn = document.getElementById("whatsapp-button");
  const whatsappChat = document.getElementById("whatsapp-chatbot");

  const whatsappNumber = "254716464683";

  /* ====== MOBILE MENU TOGGLE ====== */
  mobileMenu?.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    // Toggle mobile menu icon
    if (navMenu.classList.contains("active")) {
      mobileMenu.innerHTML = "✕"; // Close icon
    } else {
      mobileMenu.innerHTML = "☰"; // Hamburger icon
    }
  });

  /* ====== CLOSE MOBILE MENU WHEN CLICKING NAV LINKS ====== */
  document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      mobileMenu.innerHTML = "☰";
    });
  });

  /* ====== SMOOTH SCROLLING ====== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        window.scrollTo({ 
          top: target.offsetTop - 80, 
          behavior: "smooth" 
        });
      }
      navMenu.classList.remove("active");
      mobileMenu.innerHTML = "☰";
    });
  });

  /* ====== HEADER SCROLL EFFECT ====== */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.height = "70px";
      header.style.background = "linear-gradient(135deg, rgba(119, 4, 4, 0.95), rgba(84, 102, 21, 0.9))";
    } else {
      header.style.height = "100px";
      header.style.background = "linear-gradient(135deg, rgba(119, 4, 4, 0.9), rgba(84, 102, 21, 0.8))";
    }
  });

  /* ====== TYPEWRITER EFFECT ====== */
  if (typewriterSpan) {
    const texts = [
      "Trusted Legal Experts", "Strategic Counsel", "Strong Representation",
      "Protecting Your Business", "Your Rights, Secured", "Solutions That Deliver",
      "Confidence in Every Case", "Legal Excellence"
    ];
    let txtIndex = 0, charIndex = 0, isDeleting = false;

    const typeEffect = () => {
      const currentText = texts[txtIndex];
      
      if (!isDeleting) {
        // Typing
        typewriterSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(typeEffect, 1500); // Pause at end
          return;
        }
      } else {
        // Deleting
        typewriterSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          txtIndex = (txtIndex + 1) % texts.length;
        }
      }
      
      setTimeout(typeEffect, isDeleting ? 40 : 70);
    };
    
    // Start the effect after a brief delay
    setTimeout(typeEffect, 500);
  }

  /* ====== COUNT UP STATS ====== */
  const animateCountUp = el => {
    const target = +el.dataset.target;
    let current = 0;
    const increment = target / 100;
    const update = () => {
      current += increment;
      el.textContent = current < target ? Math.ceil(current) : target + "+";
      if (current < target) requestAnimationFrame(update);
    };
    update();
  };

  let statsStarted = false;
  const statsSection = document.querySelector(".stats");
  if (statsSection) {
    const statsObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !statsStarted) {
        statNumbers.forEach(animateCountUp);
        statsStarted = true;
      }
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
  }

  /* ====== LAZY LOAD SERVICE IMAGES ====== */
  serviceCards.forEach(card => {
    const img = card.querySelector("img");
    if (img) {
      img.loading = "lazy";
      img.classList.add("loading");
      img.addEventListener("load", () => img.classList.remove("loading"));
    }
  });

  /* ====== 3D TILT EFFECT ON CARDS ====== */
  serviceCards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `rotateY(${x * 0.05}deg) rotateX(${-y * 0.05}deg) scale(1.03)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
    });
  });

  /* ====== FILTER BUTTONS ====== */
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      
      // Get all service cards within swiper
      const allServiceCards = document.querySelectorAll('.service-card');
      allServiceCards.forEach(card => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "flex";
          card.style.opacity = "1";
        } else {
          card.style.display = "none";
          card.style.opacity = "0";
        }
      });
    });
  });

  /* ====== SWIPER INITIALIZATION ====== */
  
  // Hero Swiper
  const heroSwiperEl = document.querySelector('.hero-swiper');
  if (heroSwiperEl) {
    const heroSwiper = new Swiper('.hero-swiper', {
      loop: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      speed: 1000,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      // Disable navigation for mobile to prevent interference with menu
      navigation: window.innerWidth > 768 ? {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      } : false,
    });
    
    // Update navigation on window resize
    window.addEventListener('resize', () => {
      heroSwiper.params.navigation = window.innerWidth > 768 ? {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      } : false;
      heroSwiper.navigation.init();
      heroSwiper.navigation.update();
    });
  }

  // Services Swiper
  const servicesSwiperEl = document.querySelector('.services-swiper');
  if (servicesSwiperEl) {
    const servicesSwiper = new Swiper('.services-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        }
      },
      // Prevent touch interference on mobile menu
      touchEventsTarget: 'container',
      preventClicks: false,
      preventClicksPropagation: false,
    });
  }

  // Clients Swiper
  const clientsSwiperEl = document.querySelector('.clientsSwiper');
  if (clientsSwiperEl) {
    const clientsSwiper = new Swiper('.clientsSwiper', {
      slidesPerView: 2,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 6,
        }
      },
      // Prevent touch interference on mobile menu
      touchEventsTarget: 'container',
    });
  }

  // Trusted Clients Swiper
  const trustedClientsSwiperEl = document.querySelector('.trusted-clients .swiper');
  if (trustedClientsSwiperEl) {
    const trustedClientsSwiper = new Swiper('.trusted-clients .swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        }
      },
      // Prevent touch interference on mobile menu
      touchEventsTarget: 'container',
    });
  }

  /* ====== CHATBOT LOGIC ====== */
  const addMessage = (msg, sender = "user") => {
    if (!chatBody) return;
    const div = document.createElement("div");
    div.className = sender === "user" ? "user-message" : "bot-message";
    div.textContent = msg;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  // Show chatbot
  whatsappBtn?.addEventListener("click", () => {
    if (whatsappChat) {
      whatsappChat.style.display = "flex";
      addMessage("Hello! I'm here to help. What can I assist you with today?", "bot");
    }
  });

  // Close chatbot
  closeChat?.addEventListener("click", () => {
    if (whatsappChat) {
      whatsappChat.style.display = "none";
      chatBody.innerHTML = ''; // Clear chat history
    }
  });

  // Send message to WhatsApp
  sendBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    const text = userInput?.value.trim();
    if (!text || !userInput) return;
    
    addMessage(text, "user");
    userInput.value = "";
    
    // Simple bot responses
    const responses = [
      "Thank you for your message! Click below to continue on WhatsApp.",
      "I'll help you connect with our team on WhatsApp.",
      "One moment while I redirect you to WhatsApp for personalized assistance."
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    setTimeout(() => addMessage(randomResponse, "bot"), 500);
    setTimeout(() => {
      const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank");
    }, 1500);
  });

  // Send message on Enter key
  userInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendBtn?.click();
    }
  });

  /* ====== TOUCH DEVICE DETECTION FOR BETTER INTERACTION ====== */
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  };

  // Adjust tilt effect for touch devices
  if (isTouchDevice()) {
    serviceCards.forEach(card => {
      card.style.transformStyle = "flat"; // Disable 3D on touch devices
    });
  }

  /* ====== PAGE LOAD ANIMATIONS ====== */
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate service cards in sequence
    serviceCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, index * 100);
    });
  });
});