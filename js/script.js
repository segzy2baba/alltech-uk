(function ($) {
  "use strict";

  // ===========================================
  // STEP 4: ENHANCED PORTFOLIO TAB ANIMATIONS
  // ===========================================

  const tabs = document.querySelectorAll("[data-tab-target]");
  const tabContents = document.querySelectorAll("[data-tab-content]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = document.querySelector(tab.dataset.tabTarget);

      // Check if GSAP is available for smooth transitions
      if (typeof gsap !== "undefined") {
        // GSAP Enhanced Tab Transitions

        // First, fade out all current content
        const currentActive = document.querySelector(
          "[data-tab-content].active"
        );
        if (currentActive && currentActive !== target) {
          gsap.to(currentActive, {
            opacity: 0,
            y: 20,
            duration: 0.2,
            ease: "power2.out",
            onComplete: () => {
              // Remove active class after fade out
              tabContents.forEach((tabContent) => {
                tabContent.classList.remove("active");
              });
              tabs.forEach((tab) => {
                tab.classList.remove("active");
              });

              // Add active class to new content
              tab.classList.add("active");
              target.classList.add("active");

              // Fade in new content with stagger
              gsap.fromTo(
                target,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
              );

              // Stagger animation for portfolio items
              const portfolioItems = target.querySelectorAll(".product-item");
              gsap.from(portfolioItems, {
                opacity: 0,
                y: 30,
                scale: 0.9,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.1,
              });
            },
          });
        } else {
          // No current active content, just show new content
          tabContents.forEach((tabContent) => {
            tabContent.classList.remove("active");
          });
          tabs.forEach((tab) => {
            tab.classList.remove("active");
          });
          tab.classList.add("active");
          target.classList.add("active");

          // Animate new content
          gsap.fromTo(
            target,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );

          const portfolioItems = target.querySelectorAll(".product-item");
          gsap.from(portfolioItems, {
            opacity: 0,
            y: 30,
            scale: 0.9,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.1,
          });
        }

        // Animate tab button
        gsap.fromTo(
          tab,
          { scale: 0.95 },
          { scale: 1, duration: 0.2, ease: "power2.out" }
        );
      } else {
        // Fallback to original functionality if GSAP not available
        tabContents.forEach((tabContent) => {
          tabContent.classList.remove("active");
        });
        tabs.forEach((tab) => {
          tab.classList.remove("active");
        });
        tab.classList.add("active");
        target.classList.add("active");
      }
    });
  });

  // Responsive Navigation with Button

  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".menu-list");

  hamburger.addEventListener("click", mobileMenu);

  function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("responsive");
  }

  const navLink = document.querySelectorAll(".nav-link");

  navLink.forEach((n) => n.addEventListener("click", closeMenu));

  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("responsive");
  }

  var initScrollNav = function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      $("#header").addClass("fixed-top");
    } else {
      $("#header").removeClass("fixed-top");
    }
  };

  $(window).scroll(function () {
    initScrollNav();
  });

  $(document).ready(function () {
    initScrollNav();

    Chocolat(document.querySelectorAll(".image-link"), {
      imageSize: "contain",
      loop: true,
    });

    $("#header-wrap").on("click", ".search-toggle", function (e) {
      var selector = $(this).data("selector");

      $(selector).toggleClass("show").find(".search-input").focus();
      $(this).toggleClass("active");

      e.preventDefault();
    });

    // close when click off of container
    $(document).on("click touchstart", function (e) {
      if (
        !$(e.target).is(
          ".search-toggle, .search-toggle *, #header-wrap, #header-wrap *"
        )
      ) {
        $(".search-toggle").removeClass("active");
        $("#header-wrap").removeClass("show");
      }
    });

    $(".main-slider").slick({
      autoplay: false,
      autoplaySpeed: 4000,
      fade: true,
      dots: true,
      prevArrow: $(".prev"),
      nextArrow: $(".next"),
    });

    $(".product-grid").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000,
      dots: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 999,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 660,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });

    AOS.init({
      duration: 1200,
      once: true,
    });

    jQuery(".stellarnav").stellarNav({
      theme: "plain",
      closingDelay: 250,
      // mobileMode: false,
    });
  }); // End of a document
})(jQuery);
