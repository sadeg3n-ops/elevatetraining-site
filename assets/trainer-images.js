(function () {
  var trainerPhotos = {
    "Marcus Johnson": {
      src: "/assets/team/marcus-johnson.jpg",
      alt: "Marcus Johnson, entrenador principal de Impulso Gym",
      position: "50% 24%"
    },
    "Sarah Williams": {
      src: "/assets/team/sarah-williams.jpg",
      alt: "Sarah Williams, especialista en HIIT de Impulso Gym",
      position: "50% 22%"
    },
    "David Park": {
      src: "/assets/team/david-park.jpg",
      alt: "David Park, entrenador de movilidad y yoga de Impulso Gym",
      position: "50% 24%"
    }
  };

  function applyTrainerPhotos(root) {
    if (!root.querySelectorAll) {
      return;
    }

    root.querySelectorAll("#trainers .group").forEach(function (card) {
      var nameEl = card.querySelector("h3");
      var image = card.querySelector("img");

      if (!nameEl || !image) {
        return;
      }

      var trainerName = nameEl.textContent.trim();
      var trainerConfig = trainerPhotos[trainerName];

      if (!trainerConfig) {
        return;
      }

      image.src = trainerConfig.src;
      image.alt = trainerConfig.alt;
      image.style.objectPosition = trainerConfig.position;

      var frame = image.parentElement;
      if (!frame) {
        return;
      }

      frame.setAttribute("data-trainer-name", trainerName);

      var label = frame.querySelector(".trainer-photo-label");
      if (!label) {
        label = document.createElement("span");
        label.className = "trainer-photo-label";
        frame.appendChild(label);
      }

      label.textContent = trainerName;
    });
  }

  function initTrainerPhotos() {
    applyTrainerPhotos(document);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTrainerPhotos, { once: true });
  } else {
    initTrainerPhotos();
  }

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          applyTrainerPhotos(node);
        }
      });
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
