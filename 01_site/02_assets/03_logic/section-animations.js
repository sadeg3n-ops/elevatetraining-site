(function () {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var scanQueued = false;
  var revealObserver;
  var currentObserver;
  var observedTargets = new WeakSet();
  var observedSections = new WeakSet();
  var sectionVariants = {
    home: {
      copy: "reveal-variant-soft",
      item: ["reveal-variant-pop", "reveal-variant-side-right"]
    },
    about: {
      section: "reveal-variant-rise",
      copy: "reveal-variant-side-left",
      item: ["reveal-variant-pop", "reveal-variant-tilt-right", "reveal-variant-tilt-left", "reveal-variant-pop"]
    },
    classes: {
      section: "reveal-variant-curtain",
      copy: "reveal-variant-side-right",
      item: ["reveal-variant-side-left", "reveal-variant-zoom", "reveal-variant-side-right"]
    },
    pricing: {
      section: "reveal-variant-rise",
      copy: "reveal-variant-side-left",
      item: ["reveal-variant-pop", "reveal-variant-pop", "reveal-variant-zoom"]
    },
    trainers: {
      section: "reveal-variant-curtain",
      copy: "reveal-variant-soft",
      item: ["reveal-variant-zoom", "reveal-variant-pop", "reveal-variant-zoom"]
    },
    testimonials: {
      section: "reveal-variant-soft",
      copy: "reveal-variant-side-left",
      item: ["reveal-variant-side-left", "reveal-variant-side-right"]
    },
    faq: {
      section: "reveal-variant-rise",
      copy: "reveal-variant-side-right",
      item: ["reveal-variant-side-left", "reveal-variant-side-right"]
    },
    contact: {
      section: "reveal-variant-soft",
      copy: "reveal-variant-side-left",
      item: ["reveal-variant-pop", "reveal-variant-side-right"]
    },
    default: {
      section: "reveal-variant-rise",
      copy: "reveal-variant-soft",
      item: ["reveal-variant-pop"]
    }
  };

  if (prefersReducedMotion) {
    return;
  }

  function getVariantConfig(section) {
    return sectionVariants[section.id] || sectionVariants.default;
  }

  function applyVariant(target, variant) {
    if (!target || !variant) {
      return;
    }

    target.classList.add(variant);
  }

  function getIndexedVariant(variants, index) {
    if (!variants) {
      return "";
    }

    if (Array.isArray(variants)) {
      return variants[index % variants.length];
    }

    return variants;
  }

  function registerTarget(target) {
    if (!target || observedTargets.has(target)) {
      return;
    }

    observedTargets.add(target);
    revealObserver.observe(target);
  }

  function registerSection(section) {
    if (!section || observedSections.has(section)) {
      return;
    }

    observedSections.add(section);
    currentObserver.observe(section);
  }

  function markRevealTargets(section) {
    var config = getVariantConfig(section);
    var heading;
    var lead;

    if (section.id !== "home") {
      section.classList.add("reveal-section");
      applyVariant(section, config.section);
      registerTarget(section);
    }

    heading = section.querySelector(".container > h2, .container .text-center > h2, .premium-faq-intro > h2");
    lead = section.querySelector(".container > p, .container .text-center > p, .premium-faq-intro > p");

    if (heading) {
      heading.classList.add("reveal-copy");
      applyVariant(heading, config.copy);
      registerTarget(heading);
    }

    if (lead) {
      lead.classList.add("reveal-copy");
      lead.style.setProperty("--stagger-index", "1");
      applyVariant(lead, config.copy);
      registerTarget(lead);
    }

    section.querySelectorAll(".grid").forEach(function (grid) {
      Array.from(grid.children).forEach(function (item, index) {
        item.classList.add("reveal-item");
        item.style.setProperty("--stagger-index", String(index));
        applyVariant(item, getIndexedVariant(config.item, index));
        registerTarget(item);
      });
    });

    section.querySelectorAll(".mt-12, .mt-10, .mt-8").forEach(function (block, index) {
      if (block.closest(".grid")) {
        return;
      }

      block.classList.add("reveal-copy");
      block.style.setProperty("--stagger-index", String(index + 2));
      applyVariant(block, getIndexedVariant(config.copy, index));
      registerTarget(block);
    });

    section.querySelectorAll(".premium-class-tab, .premium-class-card, .premium-faq-item").forEach(function (item, index) {
      item.classList.add("reveal-item");
      item.style.setProperty("--stagger-index", String(index));
      applyVariant(item, getIndexedVariant(config.item, index));
      registerTarget(item);
    });

    section.querySelectorAll(".premium-class-stage, .premium-team-member, .premium-faq-intro").forEach(function (item, index) {
      item.classList.add("reveal-copy");
      item.style.setProperty("--stagger-index", String(index + 1));
      applyVariant(item, getIndexedVariant(config.copy, index));
      registerTarget(item);
    });

    registerSection(section);
  }

  function scanDocument() {
    document.querySelectorAll("section[id]").forEach(function (section) {
      markRevealTargets(section);
    });

    document.querySelectorAll(".section-divider").forEach(function (divider) {
      registerTarget(divider);
    });
  }

  function queueScan() {
    if (scanQueued) {
      return;
    }

    scanQueued = true;

    window.requestAnimationFrame(function () {
      scanQueued = false;
      scanDocument();
    });
  }

  function setupAnimations() {
    document.body.classList.add("js-animations-ready");

    var isMobile = window.innerWidth < 768;

    revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: isMobile ? 0.02 : 0.18,
        rootMargin: isMobile ? "0px 0px 0px 0px" : "0px 0px -8% 0px"
      }
    );

    currentObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            document.querySelectorAll("section[id]").forEach(function (section) {
              section.classList.remove("is-current");
            });

            entry.target.classList.add("is-current");
          }
        });
      },
      {
        threshold: isMobile ? 0.1 : 0.45,
        rootMargin: isMobile ? "0px 0px -10% 0px" : "-10% 0px -30% 0px"
      }
    );

    scanDocument();

    new MutationObserver(function () {
      queueScan();
    }).observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupAnimations, { once: true });
  } else {
    setupAnimations();
  }
})();
