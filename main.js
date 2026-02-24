function byId(id) {
  return document.getElementById(id);
}

function setText(id, value) {
  var node = byId(id);
  if (node && typeof value === "string") {
    node.textContent = value;
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderProjects(projects) {
  var container = byId("projects-list");
  if (!container || !Array.isArray(projects)) {
    return;
  }

  container.innerHTML = projects
    .map(function (project) {
      var href = escapeHtml(project.href || "#");
      var title = escapeHtml(project.title || "");
      var stack = escapeHtml(project.stack || "");
      var description = escapeHtml(project.description || "");

      return (
        '<a class="group project-item block py-6 hover:bg-gray-50 transition-colors -mx-4 px-4 rounded-sm border-l-2 border-transparent hover:border-green-500" href="' +
        href +
        '">' +
        '<div class="flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-8">' +
        '<div class="flex items-center gap-3">' +
        '<span class="text-green-600 material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-6 group-hover:ml-0">terminal</span>' +
        '<span class="project-title text-lg md:text-xl font-medium">' +
        title +
        "</span>" +
        "</div>" +
        '<span class="text-sm text-gray-400 font-light hidden md:block group-hover:text-green-600 transition-colors">' +
        stack +
        "</span>" +
        "</div>" +
        '<p class="mt-2 text-sm text-gray-500 md:ml-8 max-w-xl group-hover:text-gray-800">' +
        description +
        "</p>" +
        "</a>"
      );
    })
    .join("");
}

function renderContacts(contacts) {
  var container = byId("connect-list");
  if (!container || !Array.isArray(contacts)) {
    return;
  }

  container.innerHTML = contacts
    .map(function (contact) {
      var href = escapeHtml(contact.href || "#");
      var label = escapeHtml(contact.label || "");
      var mutedClass = contact.muted ? " text-gray-600" : "";
      var iconHtml = contact.showExternalIcon
        ? '<span class="material-symbols-outlined text-sm">north_east</span>'
        : "";

      return (
        '<a class="inline-flex items-center gap-2 text-lg hover:text-green-600 transition-colors underline-offset-4 hover:underline decoration-1' +
        mutedClass +
        '" href="' +
        href +
        '">' +
        "<span>" +
        label +
        "</span>" +
        iconHtml +
        "</a>"
      );
    })
    .join("");
}

function applyContent(content) {
  if (!content) {
    return;
  }

  if (typeof content.pageTitle === "string") {
    document.title = content.pageTitle;
  }

  setText("header-label", content.headerLabel);
  setText("header-location", content.headerLocation);

  if (typeof content.availabilityTitle === "string") {
    var dot = byId("availability-dot");
    if (dot) {
      dot.title = content.availabilityTitle;
    }
  }

  if (content.hero) {
    setText("hero-greeting-prefix", content.hero.greetingPrefix);
    setText("hero-name", content.hero.name);
    setText("hero-location-prefix", content.hero.locationPrefix);
    setText("hero-country", content.hero.country);
    setText("hero-specialty-line-1", content.hero.specialtyLine1);
    setText("hero-specialty-line-2", content.hero.specialtyLine2);
  }

  if (content.sections) {
    setText("works-title", content.sections.works);
    setText("connect-title", content.sections.connect);
  }

  if (content.footer) {
    setText("footer-year", content.footer.year);
    setText("footer-build", content.footer.build);
  }

  renderProjects(content.projects);
  renderContacts(content.contacts);
}

document.addEventListener("DOMContentLoaded", function () {
  applyContent(window.PORTFOLIO_CONTENT);
});
