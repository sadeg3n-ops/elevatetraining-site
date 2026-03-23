(function () {
  var queued = false;
  var testimonials = [
    {
      quote: '"Impulso Gym cambió mi mentalidad. Perdí 14 kg, pero lo más importante es la confianza que he ganado en mí misma."',
      name: "Jessica R.",
      meta: "Miembro desde 2023"
    },
    {
      quote: '"Por fin un gimnasio donde los entrenadores te hacen caso. La mejor inversión que he hecho este año."',
      name: "Miguel T.",
      meta: "Perdió 11 kg"
    },
    {
      quote: '"Me encanta el ambiente que hay. Cero postureo, mucha ayuda. Es lo que me hace volver cada día."',
      name: "Paula S.",
      meta: "Miembro desde 2022"
    },
    {
      quote: '"Horarios flexibles y material de primera. Los entrenadores adaptaron todo a una lesión antigua que tenía de rodilla."',
      name: "Carlos M.",
      meta: "Miembro desde 2024"
    },
    {
      quote: '"Las clases de HIIT son una locura, intensas y súper divertidas. Las recomiendo totalmente."',
      name: "Elena W.",
      meta: "Entrena 5 días/semana"
    },
    {
      quote: '"Pasé de no saber coger una mancuerna a levantar peso con buena técnica. La atención aquí es de otro nivel."',
      name: "Jaime K.",
      meta: "Miembro desde 2021"
    }
  ];

  function setText(element, value) {
    if (!element || element.textContent === value) {
      return;
    }

    element.textContent = value;
  }

  function setHTML(element, value) {
    if (!element || element.innerHTML === value) {
      return;
    }

    element.innerHTML = value;
  }

  function updateMeta() {
    document.title = "Impulso Gym - Entrenamiento y Fitness en Madrid";

    [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]'
    ].forEach(function (selector) {
      var tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute(
          "content",
          "Transforma tu cuerpo en Impulso Gym. Entrenadores expertos, clases guiadas y planes flexibles para avanzar con fuerza y constancia."
        );
      }
    });

    [
      'meta[property="og:title"]',
      'meta[name="twitter:title"]'
    ].forEach(function (selector) {
      var tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute("content", "Impulso Gym - Entrenamiento y Fitness en Madrid");
      }
    });
  }

  function updateNavigation() {
    var nav = document.querySelector("nav");
    if (!nav) {
      return;
    }

    var brand = nav.querySelector('a[href="#home"]');
    var menuLinks = nav.querySelectorAll('.hidden.md\\:flex a[href^="#"], .md\\:hidden a[href^="#"]');
    var menuButton = nav.querySelector(".hidden.md\\:flex > button");

    setText(brand, "IMPULSO GYM");

    if (menuLinks.length >= 14) {
      var labels = [
        "Inicio",
        "Por qué nosotros",
        "Clases",
        "Precios",
        "Equipo",
        "Testimonios",
        "Contacto",
        "Inicio",
        "Por qué nosotros",
        "Clases",
        "Precios",
        "Equipo",
        "Testimonios",
        "Contacto"
      ];

      menuLinks.forEach(function (link, index) {
        setText(link, labels[index]);
      });
    }

    if (menuButton) {
      var textNode = Array.from(menuButton.childNodes).find(function (n) { return n.nodeType === 3; });
      if (textNode) {
        textNode.nodeValue = "Empieza tu cambio";
      } else if (menuButton.firstChild && menuButton.firstChild.nodeType === 1) {
        menuButton.firstChild.textContent = "Empieza tu cambio";
      } else {
        menuButton.textContent = "Empieza tu cambio";
      }
    }
  }

  /* ── Standalone premium form overlay ── */
  function createFormOverlay() {
    if (document.getElementById("premium-form-overlay")) return;

    var overlay = document.createElement("div");
    overlay.id = "premium-form-overlay";
    overlay.className = "premium-form-overlay";
    overlay.innerHTML = [
      '<div class="premium-form-panel">',
      '<button type="button" class="premium-form-close" aria-label="Cerrar">&times;</button>',
      '<h2>Empieza tu cambio</h2>',
      '<p class="premium-form-sub">Rellena tus datos y te contactaremos en menos de 24 h.</p>',
      '<form id="premium-form">',
      '<div class="premium-form-group"><label for="pf-name">Nombre</label><input id="pf-name" type="text" placeholder="Tu nombre completo" required></div>',
      '<div class="premium-form-group"><label for="pf-email">Email</label><input id="pf-email" type="email" placeholder="tu@email.com" required></div>',
      '<div class="premium-form-group"><label for="pf-goal">Objetivo</label><select id="pf-goal" required><option value="" disabled selected>Selecciona tu objetivo</option><option value="weight-loss">Pérdida de peso</option><option value="muscle-gain">Ganar músculo</option><option value="general-fitness">Fitness general</option><option value="flexibility">Flexibilidad</option></select></div>',
      '<div class="premium-form-group"><label for="pf-time">Horario preferido</label><select id="pf-time" required><option value="" disabled selected>Selecciona horario</option><option value="morning">Mañana (6–10h)</option><option value="midday">Mediodía (10–14h)</option><option value="afternoon">Tarde (14–18h)</option><option value="evening">Noche (18–22h)</option></select></div>',
      '<div class="premium-form-group"><label for="pf-notes">¿Algo que debamos saber? (opcional)</label><textarea id="pf-notes" placeholder="Tu objetivo principal, lesiones, preguntas..." rows="3"></textarea></div>',
      '<button type="submit" class="premium-form-submit">Empieza ahora</button>',
      '</form>',
      '</div>'
    ].join("");

    document.body.appendChild(overlay);

    // Close
    overlay.querySelector(".premium-form-close").addEventListener("click", closePremiumForm);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closePremiumForm();
    });

    // Submit
    overlay.querySelector("#premium-form").addEventListener("submit", function (e) {
      e.preventDefault();
      alert("¡Gracias! Nos pondremos en contacto contigo pronto.");
      e.target.reset();
      closePremiumForm();
    });
  }

  function openPremiumForm() {
    createFormOverlay();
    var overlay = document.getElementById("premium-form-overlay");
    if (overlay) {
      requestAnimationFrame(function () {
        overlay.classList.add("is-open");
      });
    }
  }

  function closePremiumForm() {
    var overlay = document.getElementById("premium-form-overlay");
    if (overlay) {
      overlay.classList.remove("is-open");
    }
  }

  function bindCTAButtons() {
    // Nav button
    var navBtn = document.querySelector("nav .hidden.md\\:flex > button");
    if (navBtn && !navBtn.dataset.premiumFormBound) {
      navBtn.dataset.premiumFormBound = "true";
      navBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        openPremiumForm();
      }, true);
    }

    // All CTA buttons with onClick that opens the original React dialog —
    // match any button containing "Empieza" text anywhere on the page
    document.querySelectorAll("button").forEach(function (btn) {
      if (btn.dataset.premiumFormBound) return;
      var text = btn.textContent.trim();
      if (
        text === "Empieza ahora" ||
        text === "Empieza tu cambio" ||
        text === "Reserva tu clase gratuita"
      ) {
        btn.dataset.premiumFormBound = "true";
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          openPremiumForm();
        }, true);
      }
    });
  }

  function updateHero() {
    var section = document.getElementById("home");
    if (!section) {
      return;
    }

    var container = section.querySelector(".relative.z-10.container");
    if (!container) {
      return;
    }

    var heading = container.querySelector("h1");
    var body = container.querySelector("p");
    var actionRow = body ? body.nextElementSibling : null;
    var proofRow = actionRow ? actionRow.nextElementSibling : null;
    var primaryAction = actionRow ? actionRow.querySelector("button") : null;
    var secondaryAction = actionRow ? actionRow.querySelector('a[href="#classes"]') : null;

    container.classList.add("premium-hero-shell");
    if (actionRow) {
      actionRow.classList.add("premium-hero-actions");
    }
    if (proofRow) {
      proofRow.classList.add("premium-hero-proof-row");
    }

    setHTML(heading, 'FUERTE HOY.<br><span class="text-primary">MÁS FUERTE</span> MAÑANA.');
    setText(
      body,
      "Transforma tu cuerpo, eleva tu mente y desbloquea tu máximo potencial con entrenamiento de alto nivel."
    );
    setText(primaryAction, "Empieza ahora");
    setText(secondaryAction, "Ver clases");

    if (proofRow && proofRow.dataset.premiumProof !== "true") {
      proofRow.dataset.premiumProof = "true";
      proofRow.innerHTML = '<span class="premium-social-proof"><span class="premium-social-stars">★★★★★</span><span class="premium-social-divider"></span><span class="premium-social-text"><strong>4.9 / 5</strong> — Más de 300 personas confían en nosotros</span></span>';
    } else if (proofRow) {
      var proofSpan = proofRow.querySelector(".premium-social-proof");
      if (proofSpan && !proofSpan.querySelector(".premium-social-stars")) {
        proofSpan.innerHTML = '<span class="premium-social-stars">★★★★★</span><span class="premium-social-divider"></span><span class="premium-social-text"><strong>4.9 / 5</strong> — Más de 300 personas confían en nosotros</span>';
      }
    }
  }

  function updateAbout() {
    var section = document.getElementById("about");
    if (!section) {
      return;
    }

    var heading = section.querySelector("h2");
    var intro = section.querySelector(".container > p");
    var cards = section.querySelectorAll(".glass-card");
    var cardContent = [
      {
        title: "Entrenamiento inteligente",
        body: "Cero rutinas genéricas. Nuestros profesionales diseñan programas basados en tu cuerpo, tu nivel y tus objetivos reales."
      },
      {
        title: "Comunidad y motivación",
        body: "Aquí se entrena duro, pero el ambiente es tu mejor pre-entreno. Te ayudamos a mantener el foco cuando la motivación falle."
      },
      {
        title: "Acompañamiento desde el minuto uno",
        body: "Se acabó eso de sentirte perdido en la sala. Desde el primer día, te sentirás como en casa y sabrás exactamente qué hacer."
      },
      {
        title: "Soporte total 24/7",
        body: "¿Dudas con un ejercicio? ¿Preguntas sobre nutrición? Tienes línea directa con nosotros para que nunca frenes tu progreso."
      }
    ];

    setHTML(heading, '¿POR QUÉ IMPULSO GYM<br><span class="text-primary">NO ES UN GIMNASIO MÁS?</span>');
    setText(
      intro,
      "Porque aquí no vienes a alquilar máquinas, vienes a conseguir resultados. Todo lo que necesitas, con un equipo que se toma tu progreso como algo personal."
    );

    cards.forEach(function (card, index) {
      var title = card.querySelector("h3");
      var text = card.querySelector("p");
      var data = cardContent[index];

      if (!data) {
        return;
      }

      setText(title, data.title);
      setText(text, data.body);
    });
  }

  function updatePricing() {
    var section = document.getElementById("pricing");
    if (!section) {
      return;
    }

    var heading = section.querySelector("h2");
    var intro = section.querySelector(".container > p");
    var cards = section.querySelectorAll(".glass-card");

    setHTML(heading, 'TU INVERSIÓN EN <span class="text-primary">SALUD</span>');
    setText(
      intro,
      "Planes sin letra pequeña y flexibles que se adaptan a tu ritmo de vida y a tu ambición."
    );

    cards.forEach(function (card) {
      var planName = card.querySelector("h3");
      var cta = card.querySelector("button, a");

      if (planName && cta) {
        setText(cta, "Elegir plan " + planName.textContent.trim());
      }
    });
  }

  function updateTestimonials() {
    var section = document.getElementById("testimonials");
    if (!section) {
      return;
    }

    var heading = section.querySelector("h2");
    var intro = section.querySelector(".container > p");
    var cards = section.querySelectorAll(".glass-card");

    setHTML(heading, 'LO QUE DICEN NUESTROS <span class="text-primary">CLIENTES</span>');
    setText(intro, "No nos creas a nosotros. Créeles a ellos.");

    cards.forEach(function (card, index) {
      var data = testimonials[index];
      var quote = card.querySelector("p.text-sm.italic");
      var name = card.querySelector("p.text-sm.font-semibold");
      var meta = card.querySelector("p.text-xs");

      if (!data) {
        return;
      }

      setText(quote, data.quote);
      setText(name, data.name);
      setText(meta, data.meta);
    });
  }

  function updateContact() {
    var section = document.getElementById("contact");
    if (!section) {
      return;
    }

    var heading = section.querySelector("h2");
    var paragraphs = section.querySelectorAll("p");
    var button = section.querySelector("button");

    setHTML(heading, "ES HORA DE DAR EL PRIMER PASO.");

    if (paragraphs[0]) {
      setText(
        paragraphs[0],
        "Sabemos que leerlo no es lo mismo que vivirlo. Por eso, tu primera sesión corre de nuestra cuenta. Ven, conoce a los entrenadores, prueba el ambiente y decide si somos lo que estás buscando."
      );
    }

    if (paragraphs[1]) {
      setText(paragraphs[1], "Sin compromisos. Sin pedirte la tarjeta.");
    }

    setText(button, "Quiero reservar mi clase gratuita");

    // Immersive scroll effect logic
    if (!section.dataset.immersiveBound) {
      section.dataset.immersiveBound = "true";
      // We use a low threshold to trigger it a bit before they scroll all the way down
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
            section.classList.add("is-immersive");
          } else {
            section.classList.remove("is-immersive");
          }
        });
      }, { threshold: [0.35] });
      observer.observe(section);
    }
  }


  function applyCopy() {
    updateMeta();
    updateNavigation();
    updateHero();
    updateAbout();
    updatePricing();
    updateTestimonials();
    updateContact();
    bindCTAButtons();
  }

  function queueApply() {
    if (queued) {
      return;
    }

    queued = true;

    window.requestAnimationFrame(function () {
      queued = false;
      applyCopy();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", queueApply, { once: true });
  } else {
    queueApply();
  }

  new MutationObserver(function () {
    queueApply();
  }).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
