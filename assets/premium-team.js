(function () {
  var buildQueued = false;

  function getTeamMembers(section) {
    return Array.from(section.querySelectorAll(".group")).map(function (card) {
      var image = card.querySelector("img");
      var name = card.querySelector("h3");
      var info = card.querySelectorAll(".p-6 p");

      if (!image || !name || info.length < 4) {
        return null;
      }

      return {
        image: image.src,
        alt: image.alt || name.textContent.trim(),
        position: image.style.objectPosition || "50% 20%",
        name: name.textContent.trim(),
        role: info[0].textContent.trim(),
        specialty: info[1].textContent.trim(),
        bio: info[2].textContent.replace(/^"|"$/g, "").trim(),
        meta: info[3].textContent.trim()
      };
    }).filter(Boolean);
  }

  function buildTeamSection() {
    var section = document.getElementById("trainers");
    if (!section || section.dataset.premiumTeamApplied === "true") {
      return;
    }

    var container = section.querySelector(".container");
    var heading = container ? container.querySelector("h2") : null;
    var intro = container ? container.querySelector("p") : null;
    var members = container ? getTeamMembers(container) : [];

    if (!container || !heading || !intro || members.length === 0) {
      return;
    }

    section.dataset.premiumTeamApplied = "true";

    container.innerHTML = [
      '<div class="premium-team-shell">',
      '<div class="premium-team-head reveal-copy">',
      '<span class="premium-team-kicker">Equipo de entrenadores personales en Madrid</span>',
      heading.outerHTML,
      intro.outerHTML,
      "</div>",
      '<div class="premium-team-grid">',
      members.map(function (member) {
        var subtleDescription = member.specialty + ". " + member.bio;
        return [
          '<article class="premium-team-member reveal-item">',
          '<div class="premium-team-visual">',
          '<img src="' + member.image + '" alt="' + member.alt + '" loading="lazy" decoding="async" style="object-position:' + member.position + ';">',
          "</div>",
          '<div class="premium-team-copy">',
          "<h3>" + member.name + "</h3>",
          '<p class="premium-team-description">' + subtleDescription + "</p>",
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

  var observer = new MutationObserver(function () {
    queueBuild();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
