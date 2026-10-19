// The support address is assembled only when someone clicks a contact link, so it never appears
// as plain text in the page source (keeps it away from spam scrapers).
(function () {
  var user = ["revline", "ev"].join(".");
  var domain = ["gmail", "com"].join(".");
  document.querySelectorAll("[data-contact]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var subject = el.getAttribute("data-subject") || "Revline";
      window.location.href = "mailto:" + user + "@" + domain + "?subject=" + encodeURIComponent(subject);
    });
  });
})();
