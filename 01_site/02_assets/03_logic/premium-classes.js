(function () {
  var buildQueued = false;
  var classData = [
    {
      title: "Musculación y Fuerza",
      shortLabel: "La base de un cuerpo fuerte y equilibrado",
      badge: "FUERZA",
      stageKicker: "ACTIVIDAD",
      summary: "Entrena con peso libre, máquinas guiadas y una técnica cuidada al detalle para desarrollar fuerza real, aumentar masa muscular y ganar confianza en cada sesión.",
      featuredTitle: "Hazte más fuerte.",
      featuredBody: "Aprende a entrenar con buena técnica y progresión real.",
      points: [
        "Progresiones adaptadas a tu nivel y objetivos",
        "Supervisión técnica constante",
        "Resultados visibles desde las primeras semanas"
      ],
      image: "/01_site/02_assets/04_media/classes/fuerza.jpg"
    },
    {
      title: "HIIT y Acondicionamiento",
      shortLabel: "Más intensidad, mejores resultados en menos tiempo",
      badge: "HIIT",
      stageKicker: "ACTIVIDAD",
      summary: "Sesiones dinámicas y exigentes diseñadas para quemar grasa, mejorar tu resistencia y aumentar tu energía diaria sin necesidad de largas horas de entrenamiento.",
      featuredTitle: "Suda y progresa.",
      featuredBody: "Lleva tu resistencia un paso más allá en cada sesión.",
      points: [
        "Alta quema calórica en sesiones cortas",
        "Mejora rápida de la resistencia cardiovascular",
        "Entrenamientos variados y motivadores"
      ],
      image: "/01_site/02_assets/04_media/classes/hiit.jpg"
    },
    {
      title: "Pilates",
      shortLabel: "Control corporal desde el centro",
      badge: "PILATES",
      stageKicker: "ACTIVIDAD",
      summary: "Fortalece tu core, mejora tu postura y reduce el riesgo de lesiones con un trabajo preciso que conecta fuerza, movilidad y conciencia corporal.",
      featuredTitle: "Conecta cuerpo y mente.",
      featuredBody: "El equilibrio perfecto entre fuerza, control y bienestar.",
      points: [
        "Corrección postural progresiva",
        "Core fuerte y estable",
        "Prevención activa de lesiones"
      ],
      image: "/01_site/02_assets/04_media/classes/pilates.jpg"
    },
    {
      title: "Entrenamiento Funcional",
      shortLabel: "Entrena para rendir mejor en tu vida diaria",
      badge: "FUNCIONAL",
      stageKicker: "ACTIVIDAD",
      summary: "Movimientos naturales que mejoran tu agilidad, coordinación y resistencia global para que tu cuerpo funcione mejor dentro y fuera del gimnasio.",
      featuredTitle: "Listo para todo.",
      featuredBody: "Entrena para la vida real, no solo para el gimnasio.",
      points: [
        "Mayor agilidad y coordinación",
        "Trabajo completo de todo el cuerpo",
        "Transferencia directa a tu día a día"
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

    // Mobile: add toggle chevrons and expand/collapse
    if (window.innerWidth < 768) {
      var allCards = document.querySelectorAll("#classes .premium-class-card");
      allCards.forEach(function (card) {
        var header = card.querySelector(".premium-class-card-header");
        if (!header || header.querySelector(".card-toggle")) return;

        // Wrap title + lead in a div so chevron stays to the right
        var titleWrap = document.createElement("div");
        titleWrap.style.flex = "1";
        while (header.firstChild) {
          titleWrap.appendChild(header.firstChild);
        }
        header.appendChild(titleWrap);

        // Add chevron
        var chevron = document.createElement("span");
        chevron.className = "card-toggle";
        chevron.setAttribute("aria-hidden", "true");
        header.appendChild(chevron);

        // Click handler - only toggle this card
        header.addEventListener("click", function (e) {
          e.stopPropagation();
          card.classList.toggle("is-expanded");
        });
      });
    }
  }

  var classesBuilt = false;
  var classesObserver;

  function queueBuild() {
    if (buildQueued || classesBuilt) {
      return;
    }

    buildQueued = true;

    window.requestAnimationFrame(function () {
      buildQueued = false;
      buildPremiumClasses();

      // Check if successfully built
      if (document.querySelector("#classes .premium-class-card")) {
        classesBuilt = true;
        if (classesObserver) {
          classesObserver.disconnect();
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", queueBuild, { once: true });
  } else {
    queueBuild();
  }

  classesObserver = new MutationObserver(function () {
    queueBuild();
  });
  classesObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
