// Language picker, plus a one-time redirect from the English pages to the visitor's language.
// The app links to the English URLs, so this is what sends a German iPhone to /de/privacy/.
// A language picked by hand is remembered and always wins over the browser setting.
(function () {
  var LANGS = ["en", "de", "fr", "es", "es-419", "pt-br", "it", "nl", "nb", "sv", "ja", "ko"];
  var KEY = "revline-lang";
  var script = document.currentScript;
  var root = script ? script.src.replace(/lang\.js(\?.*)?$/, "") : "/";
  var picker = document.querySelector("select.lang");
  var page = picker ? picker.getAttribute("data-page") || "" : "";

  function urlFor(lang) {
    return root + (lang === "en" ? "" : lang + "/") + page + location.hash;
  }
  function remember(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }
  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  // Browser tag (e.g. "es-MX", "nb-NO", "pt-PT") → one of our folders, or null.
  function match(tag) {
    tag = (tag || "").toLowerCase();
    var primary = tag.split("-")[0];
    if (primary === "es") return (tag === "es" || tag === "es-es") ? "es" : "es-419";
    if (primary === "pt") return "pt-br";
    if (primary === "no" || primary === "nn" || primary === "nb") return "nb";
    return LANGS.indexOf(primary) >= 0 ? primary : null;
  }

  if (picker) {
    picker.addEventListener("change", function () {
      remember(picker.value);
      location.href = urlFor(picker.value);
    });
  }

  if (document.documentElement.lang === "en" && !stored()) {
    var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (var i = 0; i < prefs.length; i++) {
      var lang = match(prefs[i]);
      if (lang === "en") break;
      if (lang) { location.replace(urlFor(lang)); break; }
    }
  }
})();
