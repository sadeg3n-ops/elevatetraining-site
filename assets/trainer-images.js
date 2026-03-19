(function () {
  var trainerPhotos = {
    "Marcus Johnson": {
      src: "/assets/team/marcus-johnson.jpg",
      alt: "Marcus Johnson, especialista en CrossFit de Impulso Gym",
      position: "50% 24%"
    },
    "Sarah Williams": {
      src: "/assets/team/sarah-williams.jpg",
      alt: "Sarah Williams, especialista en Pilates y Yoga de Impulso Gym",
      position: "50% 22%"
    },
    "David Park": {
      src: "/assets/team/david-park.jpg",
      alt: "David Park, especialista en fitness y musculación de Impulso Gym",
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
      frame.querySelectorAll(".trainer-photo-label").forEach(function (label) {
        label.remove();
      });
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
