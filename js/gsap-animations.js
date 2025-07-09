// GSAP Client Carousel Animation
// Modern auto-scrolling client showcase with GSAP ScrollTrigger

document.addEventListener("DOMContentLoaded", function () {
  // Check if GSAP is available
  if (typeof gsap === "undefined") {
    console.warn("GSAP not loaded, using fallback animations");
    return;
  }

  // Add class to indicate GSAP is loaded
  document.body.classList.add("gsap-loaded");

  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // ===========================================
  // STEP 1: TEXT REVEAL ANIMATIONS
  // ===========================================

  // Section titles with split text reveal
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.from(title, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: title,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // Service descriptions with stagger
  gsap.from(".section-header .title span", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".section-header",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // ===========================================
  // EXISTING CLIENT CAROUSEL CODE
  // ===========================================

  // Client Carousel Animation
  const clientCarousel = document.querySelector(".client-carousel");
  const clientSlides = document.querySelectorAll(".client-slide");

  if (clientCarousel && clientSlides.length > 0) {
    // Calculate dimensions for 4 logos display
    const slideWidth = 200; // Fixed width per slide
    const totalSlides = clientSlides.length;
    const originalSlides = totalSlides / 2; // Half are duplicates for seamless loop
    const visibleSlides = 4; // Show 4 at a time

    // Set carousel width to accommodate all slides
    gsap.set(clientCarousel, {
      width: `${slideWidth * totalSlides}px`,
    });

    // Set initial positions for all slides
    gsap.set(clientSlides, {
      width: `${slideWidth}px`,
      opacity: 1,
      y: 0,
    });

    // Calculate the distance to move for seamless loop
    const loopDistance = slideWidth * originalSlides;

    // Main scrolling animation - moves from right to left
    const scrollAnimation = gsap.to(clientCarousel, {
      x: `-${loopDistance}px`,
      duration: 25, // Adjust speed as needed (lower = faster)
      ease: "none",
      repeat: -1,
      modifiers: {
        x: function (x) {
          // Create seamless infinite loop
          const moveDistance = parseFloat(x);
          return `${moveDistance % loopDistance}px`;
        },
      },
    });

    // Pause animation on hover
    clientCarousel.addEventListener("mouseenter", () => {
      scrollAnimation.pause();
    });

    clientCarousel.addEventListener("mouseleave", () => {
      scrollAnimation.play();
    });

    // Individual logo hover effects
    clientSlides.forEach((slide, index) => {
      const logo = slide.querySelector(".client-logo");
      const img = slide.querySelector("img");

      if (logo && img) {
        // Enhanced hover effects
        logo.addEventListener("mouseenter", () => {
          gsap.to(logo, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(img, {
            filter: "grayscale(0%)",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        logo.addEventListener("mouseleave", () => {
          gsap.to(logo, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(img, {
            filter: "grayscale(100%)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    });

    // ScrollTrigger animation for section entrance
    gsap.from(".client-carousel-wrapper", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#client-holder",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Stagger animation for individual client logos
    gsap.from(".client-slide", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#client-holder",
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse",
      },
    });

    // Section title animation
    gsap.from("#client-holder .section-header", {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#client-holder",
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
    });
  }

  // Responsive adjustments
  const updateCarousel = () => {
    if (window.innerWidth <= 768) {
      // Mobile optimizations
      ScrollTrigger.refresh();
    }
  };

  window.addEventListener("resize", updateCarousel);

  // Initialize on load
  updateCarousel();
});

// Additional GSAP animations for other sections
document.addEventListener("DOMContentLoaded", function () {
  // Check if GSAP is available for other animations
  if (typeof gsap === "undefined") {
    return;
  }

  // ===========================================
  // STEP 2: SERVICE CARD HOVER EFFECTS
  // ===========================================

  // Enhanced service card hover animations
  document.querySelectorAll(".product-item").forEach((card) => {
    const image = card.querySelector("img");
    const button = card.querySelector(".add-to-cart");
    const figcaption = card.querySelector("figcaption");

    // Create timeline for hover effects
    const hoverTL = gsap.timeline({ paused: true });

    hoverTL
      .to(card, {
        y: -10,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(
        image,
        {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      )
      .to(
        button,
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      )
      .to(
        figcaption,
        {
          y: -5,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      );

    // Hover event listeners
    card.addEventListener("mouseenter", () => {
      hoverTL.play();
    });

    card.addEventListener("mouseleave", () => {
      hoverTL.reverse();
    });
  });

  // Service cards stagger entrance animation
  gsap.from(".product-item", {
    opacity: 0,
    y: 60,
    scale: 0.9,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#featured-books",
      start: "top 75%",
      end: "bottom 25%",
      toggleActions: "play none none reverse",
    },
  });

  // ===========================================
  // STEP 3: AWARDS SECTION ANIMATION
  // ===========================================

  // Awards section with trophy bounce effect
  gsap.from(".award-item", {
    opacity: 0,
    x: -60,
    duration: 0.8,
    stagger: 0.3,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".awards-content",
      start: "top 75%",
      end: "bottom 25%",
      toggleActions: "play none none reverse",
    },
  });

  // Trophy icons bounce effect (if you have trophy emojis)
  gsap.from(".award-item h4", {
    scale: 0,
    rotation: 360,
    duration: 1,
    stagger: 0.2,
    ease: "elastic.out(1, 0.3)",
    scrollTrigger: {
      trigger: ".awards-content",
      start: "top 70%",
      delay: 0.3,
      toggleActions: "play none none reverse",
    },
  });

  // Award descriptions fade in
  // gsap.from('.award-item p', {
  //     opacity: 0,
  //     y: 20,
  //     duration: 0.6,
  //     stagger: 0.2,
  //     ease: "power2.out",
  //     scrollTrigger: {
  //         trigger: '.awards-content',
  //         start: 'top 70%',
  //         delay: 0.5,
  //         toggleActions: 'play none none reverse'
  //     }
  // });

  // Subscribe section title reveal
  gsap.from("#subscribe .section-title", {
    opacity: 0,
    scale: 0.8,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#subscribe",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // ===========================================
  // STEP 5: STATISTICS COUNTER ANIMATION
  // ===========================================

  // Counter animation function
  function animateCounter(element, endValue, duration = 2) {
    const startValue = 0;
    const obj = { value: startValue };

    gsap.to(obj, {
      value: endValue,
      duration: duration,
      ease: "power2.out",
      onUpdate: function () {
        element.textContent = Math.floor(obj.value);
      },
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }

  // Animate all statistics counters
  document.querySelectorAll(".stat-counter").forEach((counter) => {
    const endValue = parseInt(counter.dataset.count);
    animateCounter(counter, endValue);
  });

  // Company achievements animation
  gsap.from(".achievement-item", {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".achievements-section",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  // Achievement numbers with bounce
  gsap.from(".achievement-number", {
    scale: 0,
    duration: 1,
    stagger: 0.3,
    ease: "elastic.out(1, 0.5)",
    scrollTrigger: {
      trigger: ".achievements-section",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
  });

  // ===========================================
  // STEP 6: SMOOTH SCROLLING NAVIGATION
  // ===========================================

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: {
            y: target,
            offsetY: 80, // Account for fixed header
          },
          ease: "power2.inOut",
        });
      }
    });
  });

  // Header scroll animation
  const header = document.querySelector("#header");
  if (header) {
    ScrollTrigger.create({
      trigger: "body",
      start: "top -100px",
      end: "bottom bottom",
      onEnter: () => {
        gsap.to(header, {
          backgroundColor: "rgba(243, 242, 236, 0.95)",
          backdropFilter: "blur(10px)",
          duration: 0.3,
        });
      },
      onLeaveBack: () => {
        gsap.to(header, {
          backgroundColor: "rgba(243, 242, 236, 1)",
          backdropFilter: "blur(0px)",
          duration: 0.3,
        });
      },
    });
  }

  // Active section highlighting in navigation
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.menu-list a[href^="#"]');

  ScrollTrigger.batch(sections, {
    onEnter: (elements) => {
      elements.forEach((section) => {
        const id = section.getAttribute("id");
        const activeLink = document.querySelector(
          `.menu-list a[href="#${id}"]`
        );

        // Remove active class from all links
        navLinks.forEach((link) => link.classList.remove("active"));

        // Add active class to current link
        if (activeLink) {
          activeLink.classList.add("active");
        }
      });
    },
    start: "top 60%",
    end: "bottom 60%",
  });

  // ===========================================
  // HERO SECTION ANIMATIONS
  // ===========================================

  // Hero section animations
  gsap.from(".banner-title", {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power2.out",
    delay: 0.2,
  });

  gsap.from(".banner-content p", {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power2.out",
    delay: 0.4,
  });

  gsap.from(".btn-wrap", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.6,
  });

  // Blog cards animation
  gsap.from("#latest-blog .column", {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#latest-blog",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });

  // ===========================================
  // STEP 7: ENHANCED BLOG CARD ANIMATIONS
  // ===========================================

  // Blog card individual hover effects
  document.querySelectorAll("#latest-blog .column").forEach((card) => {
    const image = card.querySelector("img");
    const title = card.querySelector("h3");
    const socialLinks = card.querySelector(".social-links");

    // Create hover timeline
    const blogHoverTL = gsap.timeline({ paused: true });

    blogHoverTL
      .to(card, {
        y: -8,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(
        image,
        {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      )
      .to(
        title,
        {
          color: "#C5A992",
          duration: 0.3,
          ease: "power2.out",
        },
        0
      )
      .to(
        socialLinks,
        {
          opacity: 1,
          y: -5,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      );

    card.addEventListener("mouseenter", () => {
      blogHoverTL.play();
    });

    card.addEventListener("mouseleave", () => {
      blogHoverTL.reverse();
    });
  });

  // Blog section title with typewriter effect
  gsap.from("#latest-blog .section-title", {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#latest-blog",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });

  // Blog meta information stagger
  gsap.from("#latest-blog .meta-date", {
    opacity: 0,
    x: -20,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#latest-blog",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  // ===========================================
  // FINAL TOUCHES & PERFORMANCE OPTIMIZATIONS
  // ===========================================

  // Parallax effect for background patterns
  gsap.utils
    .toArray(".pattern-overlay, .leaf-pattern-overlay")
    .forEach((element) => {
      gsap.to(element, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

  // Download app section animation
  gsap.from("#download-app .app-info", {
    opacity: 0,
    x: 50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#download-app",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.from("#download-app figure", {
    opacity: 0,
    x: -50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#download-app",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // Loading animation for images
  // gsap.utils.toArray('img').forEach(img => {
  //     gsap.from(img, {
  //         scale: 0.8,
  //         opacity: 0,
  //         duration: 0.6,
  //         ease: "power2.out",
  //         scrollTrigger: {
  //             trigger: img,
  //             start: 'top 90%',
  //             toggleActions: 'play none none reverse'
  //         }
  //     });
  // });

  // Enhanced button animations
  document.querySelectorAll(".btn, .btn-accent-arrow").forEach((button) => {
    const icon = button.querySelector("i");

    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
      });

      if (icon) {
        gsap.to(icon, {
          x: 5,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });

      if (icon) {
        gsap.to(icon, {
          x: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    });
  });

  // Refresh ScrollTrigger on window resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  });

  // Footer animation
  gsap.from("#footer .footer-item, #footer .footer-menu", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#footer",
      start: "top 90%",
      end: "bottom 10%",
      toggleActions: "play none none reverse",
    },
  });
});
