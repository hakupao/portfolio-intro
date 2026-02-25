function qs(selector, root) {
  return (root || document).querySelector(selector);
}

function qsa(selector, root) {
  return Array.prototype.slice.call((root || document).querySelectorAll(selector));
}

function getPathValue(source, path) {
  if (!source || !path) {
    return undefined;
  }

  return path.split(".").reduce(function (current, key) {
    if (current == null) {
      return undefined;
    }
    return current[key];
  }, source);
}

function setTextContent(node, value) {
  if (!node) {
    return;
  }

  if (typeof value === "string" || typeof value === "number") {
    node.textContent = String(value);
  }
}

function bindTextContent(root, content) {
  qsa("[data-bind]", root).forEach(function (node) {
    setTextContent(node, getPathValue(content, node.dataset.bind));
  });
}

function bindTitleAttributes(root, content) {
  qsa("[data-bind-title]", root).forEach(function (node) {
    var titleValue = getPathValue(content, node.dataset.bindTitle);
    if (typeof titleValue === "string" && titleValue) {
      node.setAttribute("title", titleValue);
      node.setAttribute("aria-label", titleValue);
    }
  });
}

function createElement(tagName, options) {
  var element = document.createElement(tagName);
  if (!options) {
    return element;
  }

  if (options.className) {
    element.className = options.className;
  }

  if (options.text !== undefined && options.text !== null) {
    element.textContent = String(options.text);
  }

  if (options.attrs) {
    Object.keys(options.attrs).forEach(function (name) {
      var value = options.attrs[name];
      if (value !== undefined && value !== null) {
        element.setAttribute(name, String(value));
      }
    });
  }

  return element;
}

function appendChildren(parent, children) {
  children.forEach(function (child) {
    if (child) {
      parent.appendChild(child);
    }
  });
  return parent;
}

function isHttpUrl(href) {
  return /^https?:\/\//i.test(href || "");
}

function applyExternalLinkAttrs(link, href) {
  if (!link || !isHttpUrl(href)) {
    return;
  }
  link.target = "_blank";
  link.rel = "noopener noreferrer";
}

function renderProjects(projects) {
  var container = qs('[data-role="projects-list"]');
  if (!container || !Array.isArray(projects)) {
    return;
  }

  container.textContent = "";

  var fragment = document.createDocumentFragment();

  projects.forEach(function (project, index) {
    if (!project || typeof project !== "object") {
      return;
    }

    var href = typeof project.href === "string" && project.href ? project.href : "#";
    var card = createElement("a", {
      className:
        "group project-item reveal block py-6 hover:bg-gray-50 transition-colors -mx-4 px-4 rounded-sm border-l-2 border-transparent hover:border-green-500",
      attrs: { href: href },
    });
    card.style.setProperty("--stagger-index", String(index));
    applyExternalLinkAttrs(card, href);

    var icon = createElement("span", {
      className:
        "text-green-600 material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-6 group-hover:ml-0",
      text: "terminal",
      attrs: { "aria-hidden": "true" },
    });

    var title = createElement("span", {
      className: "project-title project-item-title font-medium",
      text: project.title || "",
    });

    var stack = createElement("span", {
      className:
        "project-item-stack text-gray-400 font-light hidden md:block group-hover:text-green-600 transition-colors",
      text: project.stack || "",
    });

    var description = createElement("p", {
      className:
        "project-item-description mt-2 text-gray-500 md:ml-8 max-w-xl group-hover:text-gray-800",
      text: project.description || "",
    });

    var leftGroup = appendChildren(createElement("div", { className: "flex items-center gap-3" }), [
      icon,
      title,
    ]);

    var topRow = appendChildren(
      createElement("div", {
        className:
          "flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-8",
      }),
      [leftGroup, stack]
    );

    appendChildren(card, [topRow, description]);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

function renderContacts(contacts) {
  var container = qs('[data-role="contacts-list"]');
  if (!container || !Array.isArray(contacts)) {
    return;
  }

  container.textContent = "";

  var fragment = document.createDocumentFragment();

  contacts.forEach(function (contact) {
    if (!contact || typeof contact !== "object") {
      return;
    }

    var href = typeof contact.href === "string" && contact.href ? contact.href : "#";
    var mutedClass = contact.muted ? " text-gray-600" : "";
    var link = createElement("a", {
      className:
        "contact-link inline-flex items-center gap-2 hover:text-green-600 transition-colors underline-offset-4 hover:underline decoration-1" +
        mutedClass,
      attrs: { href: href },
    });
    applyExternalLinkAttrs(link, href);

    link.appendChild(createElement("span", { text: contact.label || "" }));

    if (contact.showExternalIcon) {
      link.appendChild(
        createElement("span", {
          className: "material-symbols-outlined text-sm",
          text: "north_east",
          attrs: { "aria-hidden": "true" },
        })
      );
    }

    fragment.appendChild(link);
  });

  container.appendChild(fragment);
}

function applyContent(content) {
  if (!content || typeof content !== "object") {
    return;
  }

  if (typeof content.pageTitle === "string") {
    document.title = content.pageTitle;
  }

  bindTextContent(document, content);
  bindTitleAttributes(document, content);
  renderProjects(content.projects);
  renderContacts(content.contacts);
}

function setupRevealAnimations() {
  var revealElements = qsa(".reveal");
  if (!revealElements.length) {
    return;
  }

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add("visible");
    });
  }
}

function prefersReducedMotion() {
  return !!(
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function hasFinePointer() {
  if (!window.matchMedia) {
    return true;
  }
  return window.matchMedia("(pointer: fine)").matches;
}

function setupCursorGlow() {
  var cursorGlow = qs('[data-role="cursor-glow"]');
  if (!cursorGlow || prefersReducedMotion() || !hasFinePointer()) {
    return;
  }

  var glowX = 0;
  var glowY = 0;
  var targetX = 0;
  var targetY = 0;
  var isActive = false;

  document.addEventListener("mousemove", function (event) {
    targetX = event.clientX;
    targetY = event.clientY;

    if (!isActive) {
      isActive = true;
      cursorGlow.classList.add("active");
    }
  });

  document.addEventListener("mouseleave", function () {
    isActive = false;
    cursorGlow.classList.remove("active");
  });

  function animateGlow() {
    glowX += (targetX - glowX) * 0.08;
    glowY += (targetY - glowY) * 0.08;
    cursorGlow.style.left = glowX + "px";
    cursorGlow.style.top = glowY + "px";
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}

document.addEventListener("DOMContentLoaded", function () {
  applyContent(window.PORTFOLIO_CONTENT || {});
  setupRevealAnimations();
  setupCursorGlow();
});
