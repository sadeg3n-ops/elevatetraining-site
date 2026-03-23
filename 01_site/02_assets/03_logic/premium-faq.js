(function () {
  var buildQueued = false;
  var faqItems = [
    {
      question: "No tengo tiempo para entrenar",
      answer: "Precisamente por eso entrenamos contigo. Organizamos sesiones de 30 a 60 minutos para que avances de verdad sin que el gimnasio te complique la agenda."
    },
    {
      question: "No estoy en forma todavía",
      answer: "Perfecto. Nadie empieza estándolo. Adaptamos todo a tu nivel para que ganes confianza desde el primer día."
    },
    {
      question: "¿Es caro entrenar aquí?",
      answer: "Tenemos diferentes opciones según tu ritmo y objetivos. Lo importante es que lo veas como una inversión en tu salud, tu energía y cómo te sientes cada día."
    },
    {
      question: "Tengo molestias o alguna lesión",
      answer: "En la mayoría de casos podemos trabajar sin problema. Ajustamos ejercicios, cargas y progresión para que mejores sin forzar."
    },
    {
      question: "¿Cuándo empezaré a notar cambios?",
      answer: "Depende de cada persona, pero normalmente las primeras semanas ya notas más energía, más fuerza y más seguridad entrenando."
    },
    {
      question: "¿Las sesiones se hacen repetitivas?",
      answer: "Para nada. Cambiamos ejercicios, formatos y objetivos para que sigas progresando y, sobre todo, tengas ganas de volver."
    }
  ];

  function buildFAQMarkup() {
    return [
      '<section id="faq" class="relative px-4 py-24">',
      '<div class="container">',
      '<div class="premium-faq-shell">',
      '<div class="premium-faq-intro reveal-copy">',
      '<span class="premium-faq-kicker">Preguntas frecuentes</span>',
      '<h2 class="font-display">LO QUE MÁS NOS <span class="text-primary">PREGUNTAN</span></h2>',
      '<p>Estas son las dudas más habituales antes de empezar.</p>',
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
