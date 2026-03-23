(function () {
  if (window.innerWidth >= 768) return;

  var applied = false;

  function setup() {
    if (applied) return;

    var section = document.getElementById("testimonials");
    if (!section) return;

    var scrollContainer = section.querySelector(".flex.overflow-x-auto, .grid");
    if (!scrollContainer || !scrollContainer.classList.contains("overflow-x-auto")) {
      scrollContainer = section.querySelector("[class*='overflow-x-auto']");
    }
    if (!scrollContainer) return;

    var cards = scrollContainer.querySelectorAll(".glass-card");
    if (cards.length < 2) return;

    applied = true;

    // Create dots
    var dotsContainer = document.createElement("div");
    dotsContainer.className = "testimonials-dots";
    var dots = [];

    for (var i = 0; i < cards.length; i++) {
      var dot = document.createElement("span");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }

    // Create swipe hint
    var hint = document.createElement("div");
    hint.className = "testimonials-swipe-hint";
    hint.innerHTML = 'Desliza <span class="arrow">→</span>';

    // Insert after scroll container
    scrollContainer.parentNode.insertBefore(dotsContainer, scrollContainer.nextSibling);
    scrollContainer.parentNode.insertBefore(hint, dotsContainer.nextSibling);

    // Update dots on scroll
    var scrollTimeout;
    scrollContainer.addEventListener("scroll", function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        var scrollLeft = scrollContainer.scrollLeft;
        var cardWidth = cards[0].offsetWidth;
        var gap = 24;
        var activeIndex = Math.round(scrollLeft / (cardWidth + gap));

        dots.forEach(function (d, idx) {
          d.classList.toggle("active", idx === activeIndex);
        });

        // Hide hint after first scroll
        if (scrollLeft > 20) {
          hint.classList.add("is-hidden");
        }
      }, 50);
    }, { passive: true });
  }

  function trySetup() {
    if (applied) return;
    window.requestAnimationFrame(function () {
      setup();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(trySetup, 500);
    }, { once: true });
  } else {
    setTimeout(trySetup, 500);
  }

  new MutationObserver(function () {
    if (!applied) trySetup();
  }).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
