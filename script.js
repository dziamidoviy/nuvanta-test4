(function () {
  "use strict";

  var STORAGE_KEY = "nuvanta-lang";
  var LANGS = ["fr", "es", "en"];

  function getStoredLang() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* storage unavailable — language choice just won't persist across pages */
    }
  }

  function applyLang(lang) {
    if (LANGS.indexOf(lang) === -1) lang = "fr";
    document.documentElement.setAttribute("lang", lang);
    LANGS.forEach(function (code) {
      var btn = document.querySelector('[data-lang-btn="' + code + '"]');
      if (btn) btn.setAttribute("data-active", String(lang === code));
    });
  }

  function initLang() {
    var stored = getStoredLang();
    applyLang(stored || "fr");

    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang-btn");
        storeLang(lang);
        applyLang(lang);
      });
    });
  }

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      var expanded = nav.classList.contains("open");
      toggle.setAttribute("aria-expanded", String(expanded));
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLang();
    initNav();
  });
})();
