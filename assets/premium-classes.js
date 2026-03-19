(function () {
  var buildQueued = false;
  var fallbackImages = [
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
    "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=900&q=80",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80"
  ];

  var classData = [
    {
      title: "Entrenamiento de fuerza",
      shortLabel: "Potencia, músculo y salud",
      badge: "Potencia, músculo y salud",
      stageKicker: "CLASE 01",
      summary: "Construye una base sólida, previene lesiones y siéntete más fuerte para tu día a día.",
      featuredTitle: "Hazte fuerte de verdad.",
      featuredBody: "Gana fuerza, estabilidad y confianza con sesiones pensadas para mejorar tu rendimiento dentro y fuera del gimnasio.",
      points: [
        "Progresiones adaptadas a tu nivel",
        "Técnica cuidada en cada repetición",
        "Mejoras que se notan en tu día a día"
      ]
    },
    {
      title: "HIIT",
      shortLabel: "Alta intensidad, máxima quema",
      badge: "ALTA INTENSIDAD - CLASE 02 HIIT",
      stageKicker: "CLASE 02",
      summary: "El aliado perfecto para quemar grasa y disparar tu resistencia. Sales sudando, pero con una sonrisa.",
      featuredTitle: "No tienes tiempo que perder.",
      featuredBody: "Quema calorías y lleva tu resistencia al siguiente nivel con sesiones interválicas intensas, divertidas y eficientes.",
      points: [
        "Adaptada a tu nivel físico",
        "Con técnica 100% guiada",
        "Resultados que se mantienen en el tiempo"
      ]
    },
    {
      title: "Movilidad y Yoga",
      shortLabel: "Recuperación y fluidez",
      badge: "RECUPERACIÓN Y FLUIDEZ",
      stageKicker: "CLASE 03",
      summary: "Dale un respiro a tu cuerpo. Mejora tu postura, gana flexibilidad y resetea tu mente.",
      featuredTitle: "Recupera, respira y vuelve mejor.",
      featuredBody: "Descarga tensiones, mejora tu movilidad y recupera sensaciones con una clase que cuida tu cuerpo sin perder enfoque.",
      points: [
        "Más movilidad y menos rigidez",
        "Trabajo guiado con control postural",
        "Una pausa real para tu mente y tu cuerpo"
      ]
    }
  ];

  function getCurrentImages(section) {
    return Array.from(section.querySelectorAll(".group img")).map(function (image) {
      return image.getAttribute("src") || image.src;
    });
  }

  function renderStage(stage, item, index, image) {
    stage.classList.add("is-changing");

    window.setTimeout(function () {
      stage.innerHTML = [
        '<div class="premium-class-visual">',
        '<img src="' + image + '" alt="' + item.title + '" loading="lazy" decoding="async">',
        '<div class="premium-class-overlay"></div>',
        '<span class="premium-class-badge">' + item.badge + "</span>",
        "</div>",
        '<div class="premium-class-copy">',
        '<div class="premium-class-copy-main">',
        '<span class="premium-class-kicker">' + item.stageKicker + "</span>",
        "<h3>" + item.title + "</h3>",
        '<p class="premium-class-lead">' + item.shortLabel + "</p>",
        '<p class="premium-class-body">' + item.featuredBody + "</p>",
        '<ul class="premium-class-points">',
        item.points.map(function (point) {
          return "<li>" + point + "</li>";
        }).join(""),
        "</ul>",
        "</div>",
        '<div class="premium-class-footer">',
        '<p class="premium-class-highlight">' + item.featuredTitle + "</p>",
        '<a class="premium-class-cta" href="#contact">Reserva una clase de prueba</a>',
        "</div>",
        "</div>"
      ].join("");

      window.requestAnimationFrame(function () {
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
    if (!container) {
      return;
    }

    var images = getCurrentImages(section);
    var items = classData.map(function (item, index) {
      return Object.assign({}, item, {
        image: images[index] || fallbackImages[index]
      });
    });

    section.dataset.premiumClassesApplied = "true";

    container.innerHTML = [
      '<div class="premium-classes-shell">',
      '<div class="text-center">',
      '<h2 class="font-display">ENCUENTRA TU <span class="text-primary">RITMO</span></h2>',
      "<p>De levantar pesado a fluir sin estrés. Descubre la clase que mejor encaja con tus objetivos.</p>",
      "</div>",
      '<div class="premium-classes-layout">',
      '<div class="premium-classes-nav" role="tablist" aria-label="Clases destacadas"></div>',
      '<div class="premium-class-stage glass-card"></div>',
      "</div>",
      "</div>"
    ].join("");

    var nav = container.querySelector(".premium-classes-nav");
    var stage = container.querySelector(".premium-class-stage");
    var activeIndex = 1;
    var rotationTimer;

    function setActive(index) {
      activeIndex = index;

      Array.from(nav.querySelectorAll(".premium-class-tab")).forEach(function (button, buttonIndex) {
        var isActive = buttonIndex === activeIndex;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      renderStage(stage, items[activeIndex], activeIndex, items[activeIndex].image);
    }

    function restartRotation() {
      window.clearInterval(rotationTimer);
      rotationTimer = window.setInterval(function () {
        setActive((activeIndex + 1) % items.length);
      }, 6500);
    }

    items.forEach(function (item, index) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "premium-class-tab";
      button.setAttribute("role", "tab");
      button.innerHTML = [
        '<span class="premium-class-tab-index">' + String(index + 1).padStart(2, "0") + "</span>",
        '<strong class="block font-heading text-lg">' + item.title + "</strong>",
        '<span class="premium-class-tab-tag">' + item.shortLabel + "</span>"
      ].join("");

      button.addEventListener("click", function () {
        setActive(index);
        restartRotation();
      });

      nav.appendChild(button);
    });

    setActive(activeIndex);
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

  new MutationObserver(function () {
    queueBuild();
  }).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
