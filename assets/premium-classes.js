(function () {
  var buildQueued = false;

  function getClassCards(section) {
    return Array.from(section.querySelectorAll(".group")).map(function (card) {
      var image = card.querySelector("img");
      var title = card.querySelector("h3");
      var description = card.querySelector(".p-6 p");
      var tagline = card.querySelector(".absolute span");

      if (!image || !title || !description) {
        return null;
      }

      return {
        image: image.src,
        title: title.textContent.trim(),
        tagline: tagline ? tagline.textContent.trim() : "",
        description: description.textContent.trim()
      };
    }).filter(Boolean);
  }

  function renderStage(stage, item, index) {
    stage.classList.add("is-changing");

    window.setTimeout(function () {
      stage.innerHTML = [
        '<div class="premium-class-visual">',
        '<img src="' + item.image + '" alt="' + item.title + '" loading="lazy" decoding="async">',
        '<div class="premium-class-overlay"></div>',
        '<span class="premium-class-badge">' + item.tagline + '</span>',
        "</div>",
        '<div class="premium-class-copy">',
        "<div>",
        '<span class="premium-class-kicker">Clase ' + String(index + 1).padStart(2, "0") + "</span>",
        "<h3>" + item.title + "</h3>",
        "<p>" + item.description + "</p>",
        '<div class="premium-class-points">',
        "<span>Adaptada a tu nivel</span>",
        "<span>Con técnica guiada</span>",
        "<span>Resultados sostenibles</span>",
        "</div>",
        "</div>",
        '<div class="premium-class-footer">',
        '<p class="premium-class-hint">Elige la clase que mejor encaja contigo y reserva tu primera sesión cuando quieras.</p>',
        '<a class="premium-class-cta" href="#contact">Reserva una prueba</a>',
        "</div>",
        "</div>"
      ].join("");

      requestAnimationFrame(function () {
        stage.classList.remove("is-changing");
      });
    }, 120);
  }

  function buildPremiumClasses() {
    var section = document.getElementById("classes");
    if (!section || section.dataset.premiumClassesApplied === "true") {
      return;
    }

    var container = section.querySelector(".container");
    var heading = container ? container.querySelector("h2") : null;
    var intro = container ? container.querySelector("p") : null;
    var items = container ? getClassCards(container) : [];

    if (!container || !heading || !intro || items.length === 0) {
      return;
    }

    section.dataset.premiumClassesApplied = "true";

    container.innerHTML = [
      '<div class="premium-classes-shell">',
      '<div class="text-center">',
      heading.outerHTML,
      intro.outerHTML,
      "</div>",
      '<div class="premium-classes-layout">',
      '<div class="premium-classes-nav" role="tablist" aria-label="Clases destacadas"></div>',
      '<div class="premium-class-stage glass-card"></div>',
      "</div>",
      "</div>"
    ].join("");

    var nav = container.querySelector(".premium-classes-nav");
    var stage = container.querySelector(".premium-class-stage");
    var activeIndex = 0;
    var rotationTimer;

    function setActive(index) {
      activeIndex = index;
      Array.from(nav.querySelectorAll(".premium-class-tab")).forEach(function (button, buttonIndex) {
        button.classList.toggle("is-active", buttonIndex === activeIndex);
        button.setAttribute("aria-selected", buttonIndex === activeIndex ? "true" : "false");
      });
      renderStage(stage, items[activeIndex], activeIndex);
    }

    function restartRotation() {
      window.clearInterval(rotationTimer);
      rotationTimer = window.setInterval(function () {
        setActive((activeIndex + 1) % items.length);
      }, 5500);
    }

    items.forEach(function (item, index) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "premium-class-tab";
      button.setAttribute("role", "tab");
      button.innerHTML = [
        '<span class="premium-class-tab-index">' + String(index + 1).padStart(2, "0") + "</span>",
        '<strong class="block font-heading text-lg">' + item.title + "</strong>",
        '<span class="premium-class-tab-tag">' + item.tagline + "</span>"
      ].join("");

      button.addEventListener("click", function () {
        setActive(index);
        restartRotation();
      });

      nav.appendChild(button);
    });

    setActive(0);
    restartRotation();

    section.addEventListener("mouseenter", function () {
      window.clearInterval(rotationTimer);
    });

    section.addEventListener("mouseleave", function () {
      restartRotation();
    });
  }

  function queueBuild() {
    if (buildQueued) {
      return;
    }

    buildQueued = true;

    window.requestAnimationFrame(function () {
      buildQueued = false;
      buildPremiumClasses();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", queueBuild, { once: true });
  } else {
    queueBuild();
  }

  var observer = new MutationObserver(function () {
    queueBuild();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
