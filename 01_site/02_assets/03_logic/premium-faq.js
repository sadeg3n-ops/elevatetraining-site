(function () {
  var buildQueued = false;
  var faqItems = [
    {
      question: "¿Tengo poco tiempo, merece la pena?",
      answer: "Sí. Cuando el tiempo va justo es cuando más sentido tiene entrenar bien. Organizamos sesiones de 30 a 60 minutos para que avances de verdad sin complicarte la agenda."
    },
    {
      question: "Nunca he ido a un gimnasio, ¿puedo empezar aquí?",
      answer: "Claro. No esperamos que llegues en forma, estamos para ayudarte a construirla. Adaptamos todo a tu nivel para que empieces con seguridad."
    },
    {
      question: "¿Es asequible a largo plazo?",
      answer: "Tenemos planes para distintos ritmos y presupuestos. La idea es que lo veas como una inversión en tu salud y energía, no como una cuota más."
    },
    {
      question: "Tengo una lesión, ¿puedo entrenar?",
      answer: "En la mayoría de casos, sí. Ajustamos ejercicios, cargas y ritmo para que puedas mejorar sin empeorar molestias, siempre con progresión segura."
    },
    {
      question: "¿Cuándo empezaré a notar resultados?",
      answer: "Depende de tu punto de partida y constancia, pero normalmente se notan cambios en energía y fuerza desde las primeras semanas."
    },
    {
      question: "Me aburro fácil, ¿siempre es lo mismo?",
      answer: "Para nada. Variamos ejercicios, formatos y objetivos para que cada semana sea diferente. Queremos que progreses y que te apetezca volver."
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
      '<p>Estas son las dudas que más resolvemos antes de empezar.</p>',
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
