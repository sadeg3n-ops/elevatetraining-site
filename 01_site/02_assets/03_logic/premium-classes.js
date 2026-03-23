(function () {
  var buildQueued = false;
  var classData = [
    {
      title: "Musculación y Fuerza",
      shortLabel: "La base de todo buen entrenamiento",
      badge: "FUERZA",
      stageKicker: "ACTIVIDAD",
      summary: "Peso libre, máquinas guiadas y una técnica que cuida cada detalle. Gana fuerza, masa muscular y confíanza en cada sesión.",
      featuredTitle: "Hazte más fuerte.",
      featuredBody: "Aprende a entrenar con buena técnica y progresión real.",
      points: [
        "Progresiones adaptadas a ti",
        "Técnica supervisada",
        "Resultados que se notan"
      ],
      image: "/01_site/02_assets/04_media/classes/fuerza.jpg"
    },
    {
      title: "HIIT y Acondicionamiento",
      shortLabel: "Máxima intensidad, mínimo tiempo",
      badge: "HIIT",
      stageKicker: "ACTIVIDAD",
      summary: "Sesiones de alta intensidad pensadas para quemar grasa, mejorar tu resistencia y terminar cada día con más energía.",
      featuredTitle: "Suda y progresa.",
      featuredBody: "Lleva tu resistencia un paso más allá en cada sesión.",
      points: [
        "Quema calórica real",
        "Mejor resistencia cardiovascular",
        "Sesiones dinámicas y variadas"
      ],
      image: "/01_site/02_assets/04_media/classes/hiit.jpg"
    },
    {
      title: "Pilates",
      shortLabel: "Postura, control y equilibrio",
      badge: "PILATES",
      stageKicker: "ACTIVIDAD",
      summary: "Fortalece tu core, corrige tu postura y prevén lesiones con movimientos precisos y conscientes.",
      featuredTitle: "Conecta cuerpo y mente.",
      featuredBody: "El equilibrio perfecto entre fuerza, control y bienestar.",
      points: [
        "Mejora postural",
        "Core más fuerte",
        "Prevención de lesiones"
      ],
      image: "/01_site/02_assets/04_media/classes/pilates.jpg"
    },
    {
      title: "Entrenamiento Funcional",
      shortLabel: "Prepárate para el día a día",
      badge: "FUNCIONAL",
      stageKicker: "ACTIVIDAD",
      summary: "Movimientos reales para mejorar tu agilidad, coordinación y resistencia. Entrena tu cuerpo para lo que de verdad importa.",
      featuredTitle: "Listo para todo.",
      featuredBody: "Entrena para la vida real, no solo para el gimnasio.",
      points: [
        "Más agilidad y coordinación",
        "Trabajo integral del cuerpo",
        "Aplicable a tu rutina diaria"
      ],
      image: "/01_site/02_assets/04_media/classes/funcional.jpg"
    }
  ];

  function buildPremiumClasses() {
    var section = document.getElementById("classes");
    if (!section || section.dataset.premiumClassesApplied === "true") {
      return;
    }

    var container = section.querySelector(".container");
    if (!container) {
      return;
    }

    var items = classData;

    section.dataset.premiumClassesApplied = "true";

    container.innerHTML = [
      '<div class="premium-classes-shell">',
      '<div class="premium-classes-intro">',
      '<h2 class="font-display">ENCUENTRA TU <span class="text-primary">RITMO</span></h2>',
      "<p>Fuerza, resistencia, flexibilidad o equilibrio. Hay un espacio y una disciplina para cada objetivo.</p>",
      "</div>",
      '<div class="premium-classes-grid">',
      items.map(function (item, index) {
        return [
          '<article class="premium-class-card">',
          '<div class="premium-class-card-visual">',
          '<img src="' + item.image + '" alt="' + item.title + '" loading="lazy" decoding="async">',
          '<div class="premium-class-card-overlay"></div>',
          '<span class="premium-class-card-badge">' + item.badge + "</span>",
          "</div>",
          '<div class="premium-class-card-content">',
          '<div class="premium-class-card-header">',
          "<h3>" + item.title + "</h3>",
          '<p class="premium-class-card-lead">' + item.shortLabel + "</p>",
          "</div>",
          '<div class="premium-class-card-body">',
          "<p>" + item.summary + "</p>",
          '<ul class="premium-class-card-points">',
          item.points.map(function (point) {
            return "<li>" + point + "</li>";
          }).join(""),
          "</ul>",
          "</div>",
          '<div class="premium-class-card-footer">',
          '<a class="premium-class-card-cta" href="#contact">Saber más</a>',
          "</div>",
          "</div>",
          "</article>"
        ].join("");
      }).join(""),
      "</div>",
      "</div>"
    ].join("");

    // No specific logic needed after rendering the grid
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
