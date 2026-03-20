(function () {
  var buildQueued = false;
  var classData = [
    {
      title: "Musculación y Fuerza",
      shortLabel: "Construye una base sólida",
      badge: "FUERZA",
      stageKicker: "ACTIVIDAD",
      summary: "Entrena con peso libre y máquinas guiadas para ganar fuerza, masa muscular y mejorar tu metabolismo.",
      featuredTitle: "Hazte más fuerte.",
      featuredBody: "Desarrolla tu fuerza física con la técnica correcta.",
      points: [
        "Progresiones adaptadas",
        "Técnica cuidada",
        "Mejoras funcionales"
      ],
      image: "assets/classes/fuerza.jpg"
    },
    {
      title: "HIIT y Acondicionamiento",
      shortLabel: "Alta intensidad, máxima quema",
      badge: "HIIT",
      stageKicker: "ACTIVIDAD",
      summary: "Intervalos de alta intensidad diseñados para mejorar tu capacidad cardiovascular y quemar grasa eficientemente.",
      featuredTitle: "Suda y progresa.",
      featuredBody: "Lleva tu resistencia al límite en cada sesión.",
      points: [
        "Quema calórica alta",
        "Mejora cardiovascular",
        "Sesiones dinámicas"
      ],
      image: "assets/classes/hiit.jpg"
    },
    {
      title: "Pilates",
      shortLabel: "Control y equilibrio postural",
      badge: "PILATES",
      stageKicker: "ACTIVIDAD",
      summary: "Fortalece tu core, mejora tu alineación corporal y previene lesiones con movimientos precisos y conscientes.",
      featuredTitle: "Conecta con tu cuerpo.",
      featuredBody: "El equilibrio perfecto entre fuerza y control.",
      points: [
        "Control postural",
        "Fortalecimiento del core",
        "Prevención de lesiones"
      ],
      image: "assets/classes/pilates.jpg"
    },
    {
      title: "Entrenamiento Funcional",
      shortLabel: "Muévete mejor en tu día a día",
      badge: "FUNCIONAL",
      stageKicker: "ACTIVIDAD",
      summary: "Ejercicios que imitan movimientos cotidianos para mejorar tu resistencia, agilidad y coordinación general.",
      featuredTitle: "Preparado para todo.",
      featuredBody: "Entrena tu cuerpo para los retos de la vida real.",
      points: [
        "Mejora de la agilidad",
        "Entrenamiento integral",
        "Transferencia a rutinas diarias"
      ],
      image: "assets/classes/funcional.jpg"
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
      "<p>Desde trabajar la fuerza bruta hasta fluir con tu respiración. Un espacio y una disciplina para cada meta.</p>",
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
