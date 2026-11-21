"use strict";

const languageButton = document.querySelector("#language-toggle");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

let currentLanguage = "es";

/**
 * Cambia el idioma del portafolio.
 * Los textos se obtienen de los atributos data-es y data-en del HTML.
 */
function setLanguage(language) {
  if (language !== "es" && language !== "en") {
    return;
  }

  currentLanguage = language;
  document.documentElement.lang = language;

  document.querySelectorAll("[data-es][data-en]").forEach((element) => {
    element.innerHTML =
      language === "es" ? element.dataset.es : element.dataset.en;
  });

  if (languageButton) {
    languageButton.textContent = language === "es" ? "EN ↗" : "ES ↗";

    languageButton.setAttribute(
      "aria-label",
      language === "es" ? "Switch to English" : "Cambiar a español"
    );
  }
}

/**
 * Alterna entre español e inglés.
 */
languageButton?.addEventListener("click", () => {
  setLanguage(currentLanguage === "es" ? "en" : "es");
});

/**
 * Filtra los proyectos por categoría.
 */
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter || "all";

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;

      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach((card) => {
      const categories = (card.dataset.category || "")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      const isVisible =
        selectedFilter === "all" ||
        categories.includes(selectedFilter);

      card.hidden = !isVisible;
    });
  });

  button.setAttribute(
    "aria-pressed",
    String(button.classList.contains("active"))
  );
});

/**
 * Inicia el portafolio en español.
 * No utiliza ni muestra años automáticamente.
 */
setLanguage("es");