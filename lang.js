// lang.js

function changeLanguage(lang) {
  const elements = document.querySelectorAll("[data-key]");
  elements.forEach(el => {
    const key = el.getAttribute("data-key");
    if (translations[lang] && translations[lang][key]) {
      if (el.placeholder !== undefined && el.tagName === "INPUT") {
        el.placeholder = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });
  localStorage.setItem("language", lang);
  document.getElementById("currentLang").textContent = lang.toUpperCase();
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || "en";
  changeLanguage(savedLang);

  const switchButton = document.getElementById("switchButton");
  const dropdown = document.getElementById("languageDropdown");

  if (switchButton && dropdown) {
    switchButton.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });

    dropdown.querySelectorAll("div").forEach(option => {
      option.addEventListener("click", () => {
        const selectedLang = option.getAttribute("data-lang");
        changeLanguage(selectedLang);
        dropdown.style.display = "none";
      });
    });

    document.addEventListener("click", () => {
      dropdown.style.display = "none";
    });
  }
});
