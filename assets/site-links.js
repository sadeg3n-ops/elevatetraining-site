(function () {
  var currentSiteUrl = "https://elevatetraining-site.vercel.app/";
  var socialSelectors = [
    'footer a[href*="instagram.com"]',
    'footer a[href*="facebook.com"]',
    'footer a[href*="twitter.com"]',
    'footer a[href*="youtube.com"]',
    'a[href*="flexitygym"]'
  ];
  var footerLinkMap = [
    { selector: 'footer a[href="/privacy"]', href: "#home", label: "Inicio" },
    { selector: 'footer a[href="/terms"]', href: "#faq", label: "Preguntas frecuentes" },
    { selector: 'footer a[href="/cookies"]', href: "#contact", label: "Contacto" }
  ];

  function ensureMetaTag(selector, attributeName, attributeValue, content) {
    var tag = document.head.querySelector(selector);

    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attributeName, attributeValue);
      document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);
  }

  function ensureCanonical(url) {
    var canonical = document.head.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", url);
  }

  function updateStructuredData(url) {
    var schema = document.querySelector('script[type="application/ld+json"]');
    if (!schema) {
      return;
    }

    try {
      var parsed = JSON.parse(schema.textContent);
      parsed.url = url;
      if (!parsed.sameAs) {
        parsed.sameAs = [url];
      }
      schema.textContent = JSON.stringify(parsed, null, 2);
    } catch (error) {
      console.warn("No se pudo actualizar el JSON-LD del sitio.", error);
    }
  }

  function normalizeSiteLinks(root) {
    if (!root.querySelectorAll) {
      return;
    }

    socialSelectors.forEach(function (selector) {
      root.querySelectorAll(selector).forEach(function (link) {
        link.href = currentSiteUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      });
    });

    footerLinkMap.forEach(function (item) {
      root.querySelectorAll(item.selector).forEach(function (link) {
        link.href = item.href;
        link.removeAttribute("target");
        link.removeAttribute("rel");
        link.textContent = item.label;
      });
    });

    root.querySelectorAll("footer span").forEach(function (node) {
      var text = node.textContent.trim();
      if (text === "© 2026 Flexity Gym. All rights reserved.") {
        node.textContent = "© 2026 Impulso Gym. Todos los derechos reservados.";
      }
    });
  }

  function applySiteLinks() {
    ensureCanonical(currentSiteUrl);
    ensureMetaTag('meta[property="og:url"]', "property", "og:url", currentSiteUrl);
    updateStructuredData(currentSiteUrl);
    normalizeSiteLinks(document);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applySiteLinks, { once: true });
  } else {
    applySiteLinks();
  }

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          normalizeSiteLinks(node);
        }
      });
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
