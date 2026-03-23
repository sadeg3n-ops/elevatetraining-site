(function () {
  var buildQueued = false;
  var faqItems = [
    {
      question: "¿Y si tengo muy poco tiempo para entrenar, merece la pena?",
      answer: "Sí. Cuando el tiempo va justo es cuando más sentido tiene entrenar con cabeza. Organizamos sesiones de 30 a 60 minutos para que avances de verdad sin complicarte la agenda."
    },
    {
      question: "Nunca he pisado un gimnasio y mi forma física es baja, ¿encajaré aquí?",
      answer: "Claro. No esperamos que llegues en forma, estamos para ayudarte a construirla. Adaptamos todo a tu nivel para que empieces con seguridad y sin sentirte fuera de lugar."
    },
    {
      question: "¿Es una opción asequible a largo plazo?",
      answer: "Tenemos planes pensados para distintos ritmos y presupuestos. La idea es que veas esto como una inversión en energía, salud y bienestar, no como una cuota que apenas usas."
    },
    {
      question: "Tengo una lesión o me duele la espalda, ¿puedo entrenar?",
      answer: "En la mayoría de casos, sí. Ajustamos ejercicios, cargas y volumen para que puedas mejorar sin empeorar molestias, siempre con una progresión segura y bien guiada."
    },
    {
      question: "¿En cuánto tiempo empezaré a notar los resultados?",
      answer: "Depende de tu punto de partida y de la constancia, pero solemos notar cambios en energía, fuerza y sensaciones desde las primeras semanas. Lo importante es que el plan se va ajustando contigo."
    },
    {
      question: "Me aburro rápido en los gimnasios, ¿aquí es siempre lo mismo?",
      answer: "Para nada. Variamos ejercicios, formatos y objetivos para que cada etapa tenga sentido y no entres en piloto automático. Queremos que progreses, pero también que te apetezca volver."
    }
  ];

  function buildFAQMarkup() {
    return [
      '<section id="faq" class="relative px-4 py-24">',
      '<div class="container">',
      '<div class="premium-faq-shell">',
      '<div class="premium-faq-intro reveal-copy">',
      '<span class="premium-faq-kicker">Preguntas frecuentes</span>',
      '<h2 class="font-display">LO QUE TODOS<br>NOS <span class="text-primary">PREGUNTAN</span></h2>',
      '<p>Sabemos que empezar cuesta. Estas son las dudas que más resolvemos en la primera entrevista.</p>',
      '<a class="premium-faq-link" href="https://wa.me/34911234567" target="_blank" rel="noopener noreferrer">Hablar con el equipo por WhatsApp</a>',
      "</div>",
      '<div class="premium-faq-list">',
      faqItems.map(function (item, index) {
        var number = String(index + 1).padStart(2, "0");
        var itemId = "faq-item-" + number;
        var buttonId = "faq-trigger-" + number;
        var panelId = "faq-panel-" + number;

        return [
          '<article id="' + itemId + '" class="premium-faq-item reveal-item' + (index === 0 ? " is-open" : "") + '">',
          '<button id="' + buttonId + '" class="premium-faq-trigger" type="button" aria-expanded="' + (index === 0 ? "true" : "false") + '" aria-controls="' + panelId + '">',
          '<span class="premium-faq-number">' + number + "</span>",
          '<span class="premium-faq-question">' + item.question + "</span>",
          '<span class="premium-faq-icon" aria-hidden="true"></span>',
          "</button>",
          '<div id="' + panelId + '" class="premium-faq-answer" role="region" aria-labelledby="' + buttonId + '">',
          '<div class="premium-faq-answer-inner">',
          "<p>" + item.answer + "</p>",
          "</div>",
          "</div>",
          "</article>"
        ].join("");
      }).join(""),
      "</div>",
      "</div>",
      "</div>",
      "</section>"
    ].join("");
  }

  function setupAccordion(section) {
    var items = Array.from(section.querySelectorAll(".premium-faq-item"));

    function setOpen(itemToOpen) {
      items.forEach(function (item) {
        var isOpen = item === itemToOpen;
        var trigger = item.querySelector(".premium-faq-trigger");

        item.classList.toggle("is-open", isOpen);

        if (trigger) {
          trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
        }
      });
    }

    items.forEach(function (item) {
      var trigger = item.querySelector(".premium-faq-trigger");

      if (!trigger) {
        return;
      }

      trigger.addEventListener("click", function () {
        if (item.classList.contains("is-open")) {
          setOpen(null);
          return;
        }

        setOpen(item);
      });
    });
  }

  function insertFAQSection() {
    if (document.getElementById("faq")) {
      return;
    }

    var testimonials = document.getElementById("testimonials");
    if (!testimonials) {
      return;
    }

    var afterNode = testimonials.nextElementSibling && testimonials.nextElementSibling.classList.contains("section-divider")
      ? testimonials.nextElementSibling
      : testimonials;

    var faqWrapper = document.createElement("div");
    faqWrapper.innerHTML = buildFAQMarkup();

    var faqSection = faqWrapper.firstElementChild;
    var faqDivider = document.createElement("div");
    faqDivider.className = "section-divider";
    faqDivider.setAttribute("aria-hidden", "true");

    afterNode.insertAdjacentElement("afterend", faqDivider);
    afterNode.insertAdjacentElement("afterend", faqSection);

    setupAccordion(faqSection);
  }

  function queueBuild() {
    if (buildQueued) {
      return;
    }

    buildQueued = true;

    window.requestAnimationFrame(function () {
      buildQueued = false;
      insertFAQSection();
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
