(function () {
  var queued = false;
  var testimonials = [
    {
      quote: '"Llevo unos meses y el cambio se nota: perdí 14 kg, pero sobre todo me siento mucho más segura."',
      name: "Jessica R.",
      meta: "Miembro desde 2023"
    },
    {
      quote: '"Por fin un sitio donde los entrenadores están pendientes de ti de verdad. La mejor decisión que he tomado este año."',
      name: "Miguel T.",
      meta: "Perdió 11 kg"
    },
    {
      quote: '"Me encanta el ambiente: cero postureo y mucha ayuda. Es lo que me hace volver cada día."',
      name: "Paula S.",
      meta: "Miembro desde 2022"
    },
    {
      quote: '"Horarios flexibles y material de primera. Adaptaron todo a una lesión antigua que tengo de rodilla."',
      name: "Carlos M.",
      meta: "Miembro desde 2024"
    },
    {
      quote: '"Las clases de HIIT son una pasada: intensas, divertidas y se pasa volando. Totalmente recomendable."',
      name: "Elena W.",
      meta: "Entrena 5 días/semana"
    },
    {
      quote: '"Empecé sin saber coger una mancuerna y ahora levanto peso con buena técnica. La atención aquí es otra cosa."',
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
        text === "Empieza tu cambio" ||
        text === "Reservar mi clase gratis"
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
      "Transforma tu cuerpo, entrena con intención y descubre hasta dónde puedes llegar cuando tienes un equipo que te guía de verdad."
    );
    setText(primaryAction, "Escríbenos");
    setText(secondaryAction, "Ver clases");

    // Make "Escríbenos" redirect to WhatsApp
    if (primaryAction && !primaryAction.dataset.waLinked) {
      primaryAction.dataset.waLinked = "true";
      primaryAction.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.open("https://wa.me/34600000000", "_blank");
      }, true);
    }

    if (proofRow && proofRow.dataset.premiumProof !== "true") {
      proofRow.dataset.premiumProof = "true";
      proofRow.innerHTML = '<span class="premium-social-proof"><span class="premium-social-stars">★★★★★</span><span class="premium-social-divider"></span><span class="premium-social-text"><strong>4.9 / 5</strong> — Más de 300 personas ya entrenan con nosotros</span></span>';
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
        title: "Entrenamiento adaptado a ti",
        body: "Nada de rutinas copiadas y pegadas. Diseñamos tu programa según tu cuerpo, tu nivel y tus objetivos."
      },
      {
        title: "Una comunidad que empuja contigo",
        body: "Entrenamos en serio, pero el ambiente es lo que marca la diferencia. Aquí te sientes parte del equipo desde el primer día."
      },
      {
        title: "Sabes qué hacer desde la primera sesión",
        body: "Llegas y entrenas con claridad. Te guiamos paso a paso para que avances con seguridad desde el inicio."
      },
      {
        title: "Acompañamiento real, no solo una inscripción",
        body: "Si tienes dudas, ajustamos contigo. Si necesitas cambiar algo, lo revisamos. No te dejamos solo en ningún momento."
      }
    ];

    setHTML(heading, '¿POR QUÉ <span class="text-primary">IMPULSO GYM</span> ES DIFERENTE?');
    setText(
      intro,
      "Porque aquí no vienes solo a entrenar. Vienes a mejorar."
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
      "Planes claros, flexibles y sin sorpresas. Elige el nivel de acompañamiento que mejor encaje contigo y empieza a notar resultados desde el primer mes."
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

    setHTML(heading, 'LO QUE DICEN QUIENES <span class="text-primary">YA ENTRENAN</span> AQUÍ');
    setText(intro, "No nos creas a nosotros. Escúchales a ellos.");

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

    setHTML(heading, "DA EL PRIMER PASO.");

    if (paragraphs[0]) {
      setText(
        paragraphs[0],
        "Sabemos que leerlo no es lo mismo que vivirlo. Tu primera sesión va por nuestra cuenta: ven, conoce al equipo y decide si esto es lo que buscas."
      );
    }

    if (paragraphs[1]) {
      setText(paragraphs[1], "Sin compromiso. Sin pedirte la tarjeta.");
    }

    setText(button, "Reservar mi clase gratis");

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
