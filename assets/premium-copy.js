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

    setText(menuButton, "Empieza tu cambio");
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

    setHTML(heading, 'FUERTE HOY.<br><span class="text-primary">MÁS FUERTE</span> MAÑANA.');
    setText(
      body,
      "Transforma tu cuerpo, eleva tu mente y desbloquea tu máximo potencial con entrenamiento de alto nivel."
    );
    setText(primaryAction, "Empieza ahora");
    setText(secondaryAction, "Ver clases");

    if (proofRow && proofRow.dataset.premiumProof !== "true") {
      proofRow.dataset.premiumProof = "true";
      proofRow.innerHTML = '<span class="premium-social-proof">★★★★★ 4.9/5 | Más de 300 clientes confían en nosotros.</span>';
    } else if (proofRow) {
      setText(proofRow.querySelector(".premium-social-proof"), "★★★★★ 4.9/5 | Más de 300 clientes confían en nosotros.");
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
  }

  function applyCopy() {
    updateMeta();
    updateNavigation();
    updateHero();
    updateAbout();
    updatePricing();
    updateTestimonials();
    updateContact();
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
