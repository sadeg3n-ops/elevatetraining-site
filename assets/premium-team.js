(function () {
  var buildQueued = false;
  var members = [
    {
      name: "Marcos Jurado",
      role: "Fuerza y Rendimiento",
      description: "Potencia, técnica y resistencia para que rindas al máximo sin lesionarte.",
      image: "/assets/team-premium/marcus-johnson-portrait.jpg",
      alt: "Marcos Jurado, especialista en fuerza y rendimiento en Impulso Gym",
      position: "50% 18%"
    },
    {
      name: "Sara Villanueva",
      role: "Pilates y Yoga",
      description: "Control, movilidad y equilibrio. Te enseñará a reconectar con tu cuerpo.",
      image: "/assets/team-premium/sarah-williams-portrait.jpg",
      alt: "Sara Villanueva, especialista en pilates y yoga en Impulso Gym",
      position: "50% 20%"
    },
    {
      name: "David Pardo",
      role: "Fitness y Musculación",
      description: "Constancia, motivación y progreso real. Si crees que no puedes más, él te demostrará que sí.",
      image: "/assets/team-premium/david-park-portrait.jpg",
      alt: "David Pardo, especialista en fitness y musculación en Impulso Gym",
      position: "50% 18%"
    }
  ];

  function buildTeamSection() {
    var section = document.getElementById("trainers");
    if (!section || section.dataset.premiumTeamApplied === "true") {
      return;
    }

    var container = section.querySelector(".container");
    if (!container) {
      return;
    }

    section.dataset.premiumTeamApplied = "true";

    container.innerHTML = [
      '<div class="premium-team-shell">',
      '<div class="premium-team-head reveal-copy reveal-variant-soft" style="--stagger-index:1;">',
      '<h2 class="font-display">CONOCE A NUESTRO EQUIPO</h2>',
      "</div>",
      '<div class="premium-team-grid">',
      members.map(function (member, index) {
        return [
          '<article class="premium-team-member reveal-item reveal-variant-zoom" style="--stagger-index:' + String(index) + ';">',
          '<div class="premium-team-visual">',
          '<img src="' + member.image + '" alt="' + member.alt + '" loading="lazy" decoding="async" style="object-position:' + member.position + ';">',
          "</div>",
          '<div class="premium-team-copy">',
          "<h3>" + member.name + "</h3>",
          '<p class="premium-team-role">' + member.role + "</p>",
          '<p class="premium-team-description">' + member.description + "</p>",
          "</div>",
          "</article>"
        ].join("");
      }).join(""),
      "</div>",
      "</div>"
    ].join("");
  }

  function queueBuild() {
    if (buildQueued) {
      return;
    }

    buildQueued = true;

    window.requestAnimationFrame(function () {
      buildQueued = false;
      buildTeamSection();
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
