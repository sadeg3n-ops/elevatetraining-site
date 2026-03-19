(function () {
  var textTranslations = new Map([
    ["FLEXITY GYM", "IMPULSO GYM"],
    ["¿POR QUÉ ELEGIR", "¿POR QUÉ"],
    ["NOSOTROS?", "ELEGIRNOS A NOSOTROS?"],
    ["Entrenadores certificados", "Equipo experto"],
    ["Nuestros coaches cuentan con certificaciones de alto nivel y años de experiencia real.", "Profesionales con experiencia real y formación especializada."],
    ["Entrenador Principal", "Especialista en CrossFit"],
    ["Fuerza y Acondicionamiento", "CrossFit y Rendimiento"],
    ["No hay límites, solo metas por superar.", "Potencia, técnica y resistencia para rendir al máximo."],
    ["Especialista en HIIT", "Especialista en Pilates"],
    ["Pérdida de Grasa y Resistencia", "Pilates y Yoga"],
    ["Cada repetición cuenta. Hazlo intenso.", "Control, movilidad y equilibrio en cada sesión."],
    ["Entrenador de Movilidad", "Especialista en fitness"],
    ["Yoga y Recuperación", "Fitness y Musculación"],
    ["Muévete bien, recupérate mejor, rinde más tiempo.", "Fuerza, constancia y progreso real en cada entrenamiento."],
    ["Start Your Journey", "Empieza tu cambio"],
    ["Fill out the form and we'll get you set up.", "Rellena el formulario y te ayudamos a empezar."],
    ["Name", "Nombre"],
    ["Email", "Correo electrónico"],
    ["Fitness Goal", "Objetivo"],
    ["Preferred Time", "Horario preferido"],
    ["Anything we should know? (optional)", "¿Hay algo que debamos saber? (opcional)"],
    ["Select your goal", "Selecciona tu objetivo"],
    ["Weight Loss", "Pérdida de peso"],
    ["Muscle Gain", "Ganar masa muscular"],
    ["General Fitness", "Ponerte en forma"],
    ["Flexibility", "Flexibilidad"],
    ["Select preferred time", "Selecciona un horario"],
    ["Morning (6AM – 10AM)", "Mañana (6:00 - 10:00)"],
    ["Midday (10AM – 2PM)", "Mediodía (10:00 - 14:00)"],
    ["Afternoon (2PM – 6PM)", "Tarde (14:00 - 18:00)"],
    ["Evening (6PM – 10PM)", "Noche (18:00 - 22:00)"],
    ["Welcome to Flexity Gym!", "Solicitud recibida"],
    ["We'll reach out within 24 hours. Check your email for next steps.", "Te contactaremos en menos de 24 horas. Revisa tu correo para los siguientes pasos."]
  ]);

  var placeholderTranslations = new Map([
    ["Your full name", "Tu nombre completo"],
    ["you@example.com", "tu@email.com"],
    ["Your main goal, injuries, or questions...", "Tu objetivo principal, lesiones o dudas..."]
  ]);

  function replaceTextNodes(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var node;

    while ((node = walker.nextNode())) {
      var current = node.nodeValue;
      if (!current) continue;

      var trimmed = current.trim();
      if (!trimmed || !textTranslations.has(trimmed)) continue;

      node.nodeValue = current.replace(trimmed, textTranslations.get(trimmed));
    }
  }

  function replacePlaceholders(root) {
    root.querySelectorAll("input[placeholder], textarea[placeholder]").forEach(function (field) {
      var placeholder = field.getAttribute("placeholder");
      if (placeholderTranslations.has(placeholder)) {
        field.setAttribute("placeholder", placeholderTranslations.get(placeholder));
      }
    });
  }

  function translateUI(root) {
    replaceTextNodes(root);
    if (root.querySelectorAll) {
      replacePlaceholders(root);
    }
  }

  function runTranslations() {
    translateUI(document.body);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runTranslations, { once: true });
  } else {
    runTranslations();
  }

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          translateUI(node);
        } else if (node.nodeType === Node.TEXT_NODE && node.parentElement) {
          translateUI(node.parentElement);
        }
      });
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
