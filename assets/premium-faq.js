(function () {
  var buildQueued = false;
  var faqItems = [
    {
      question: "¿No tengo suficiente tiempo para entrenar, esto es para mí?",
      answer: "Sí. Nuestros entrenamientos se adaptan a agendas ocupadas, con sesiones de 30 a 60 minutos y una planificación personalizada para que avances incluso cuando vas justo de tiempo."
    },
    {
      question: "¿Qué pasa si no estoy en buena forma física o nunca he entrenado?",
      answer: "No pasa nada. Ajustamos cada plan a tu punto de partida y te guiamos paso a paso para que mejores con seguridad, confianza y sin sentirte perdido."
    },
    {
      question: "¿Es muy caro entrenar aquí?",
      answer: "Trabajamos con planes flexibles para distintos presupuestos. Más que un gasto, buscamos que lo vivas como una inversión real en tu salud, tu energía y tu bienestar a largo plazo."
    },
    {
      question: "¿Puedo entrenar si tengo lesiones o limitaciones físicas?",
      answer: "Sí. Adaptamos ejercicios, cargas y progresiones para que puedas entrenar de forma segura, respetando tus limitaciones y ayudándote a avanzar sin asumir riesgos innecesarios."
    },
    {
      question: "¿Y si no veo resultados rápidamente?",
      answer: "El progreso depende de la constancia, pero no te dejamos solo. Hacemos seguimiento, ajustamos el plan cuando hace falta y te acompañamos para que notes avances reales y sostenibles."
    },
    {
      question: "¿Es aburrido o siempre hago lo mismo?",
      answer: "Nunca. Variamos ejercicios, técnicas y estímulos para mantener la motivación alta, sin perder el foco en tus objetivos ni convertir cada sesión en una rutina repetitiva."
    }
  ];

  function buildFAQMarkup() {
    return [
      '<section id="faq" class="relative px-4 py-24">',
      '<div class="container">',
      '<div class="premium-faq-shell">',
      '<div class="premium-faq-intro reveal-copy">',
      '<span class="premium-faq-kicker">Preguntas frecuentes</span>',
      '<h2 class="font-display">Resolvemos las objeciones más habituales antes de empezar.</h2>',
      '<p>Si te estás planteando entrenar con nosotros, estas son las dudas que más solemos resolver en la primera conversación.</p>',
      '<a class="premium-faq-link" href="#contact">Hablar con el equipo</a>',
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

  var observer = new MutationObserver(function () {
    queueBuild();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
