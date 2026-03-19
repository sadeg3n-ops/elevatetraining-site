(function () {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return;
  }

  function markRevealTargets(section) {
    if (section.id !== "home") {
      section.classList.add("reveal-section");
    }

    var heading = section.querySelector(".container > h2, .container .text-center > h2");
    var lead = section.querySelector(".container > p, .container .text-center > p");

    if (heading) {
      heading.classList.add("reveal-copy");
    }

    if (lead) {
      lead.classList.add("reveal-copy");
      lead.style.setProperty("--stagger-index", "1");
    }

    section.querySelectorAll(".grid").forEach(function (grid) {
      Array.from(grid.children).forEach(function (item, index) {
        item.classList.add("reveal-item");
        item.style.setProperty("--stagger-index", String(index));
      });
    });

    section.querySelectorAll(".mt-12, .mt-10, .mt-8").forEach(function (block, index) {
      if (block.closest(".grid")) {
        return;
      }

      block.classList.add("reveal-copy");
      block.style.setProperty("--stagger-index", String(index + 2));
    });
  }

  function setupAnimations() {
    document.body.classList.add("js-animations-ready");

    var sections = Array.from(document.querySelectorAll("section[id]"));
    var dividers = Array.from(document.querySelectorAll(".section-divider"));
    var revealTargets = [];

    sections.forEach(function (section) {
      markRevealTargets(section);
    });

    dividers.forEach(function (divider) {
      revealTargets.push(divider);
    });

    revealTargets = revealTargets.concat(Array.from(document.querySelectorAll(".reveal-section, .reveal-copy, .reveal-item")));

    var revealObserver = new IntersectionObserver(
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
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealTargets.forEach(function (target) {
      revealObserver.observe(target);
    });

    var currentObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            sections.forEach(function (section) {
              section.classList.remove("is-current");
            });

            entry.target.classList.add("is-current");
          }
        });
      },
      {
        threshold: 0.45,
        rootMargin: "-10% 0px -30% 0px"
      }
    );

    sections.forEach(function (section) {
      currentObserver.observe(section);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupAnimations, { once: true });
  } else {
    setupAnimations();
  }
})();
