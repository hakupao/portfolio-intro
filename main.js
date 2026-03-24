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

function hasText(value) {
  return typeof value === "string" && value.trim() !== "";
}

function readCssNumber(variableName, fallbackValue) {
  var value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
  var parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallbackValue;
}

function animateHeroName(root) {
  var heroName = qs('[data-bind="hero.name"]', root);
  if (!heroName) {
    return;
  }

  var text = heroName.textContent || "";
  if (!text.trim()) {
    return;
  }

  heroName.setAttribute("aria-label", text);

  if (heroName.__typingTimer) {
    window.clearTimeout(heroName.__typingTimer);
    heroName.__typingTimer = null;
  }

  if (prefersReducedMotion()) {
    heroName.textContent = text;
    return;
  }

  var startDelayMs = readCssNumber("--hero-name-type-start-delay-ms", 160);
  var stepDelayMs = readCssNumber("--hero-name-type-step-ms", 95);

  heroName.textContent = "";

  var index = 0;

  function typeNext() {
    if (index >= text.length) {
      heroName.__typingTimer = null;
      return;
    }

    index += 1;
    heroName.textContent = text.slice(0, index);

    var upcomingChar = text.charAt(index);
    var delay = upcomingChar === " " ? Math.max(45, stepDelayMs * 0.55) : stepDelayMs;
    heroName.__typingTimer = window.setTimeout(typeNext, delay);
  }

  heroName.__typingTimer = window.setTimeout(typeNext, startDelayMs);
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

function resolveHref(rawHref, contextLabel) {
  if (typeof rawHref === "string" && rawHref.trim()) {
    return rawHref.trim();
  }

  if (typeof console !== "undefined" && typeof console.warn === "function") {
    console.warn("[portfolio] Missing href for " + contextLabel + ". Link is disabled.");
  }
  return null;
}

function applyDisabledLinkState(link) {
  if (!link) {
    return;
  }

  link.setAttribute("href", "#");
  link.setAttribute("aria-disabled", "true");
  link.addEventListener("click", function (event) {
    event.preventDefault();
  });
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

    var href = resolveHref(project.href, 'project "' + (project.title || "Untitled") + '"');
    var card = createElement("a", {
      className:
        "group project-item reveal block py-6 hover:bg-gray-50 transition-colors -mx-4 px-4 rounded-sm border-l-2 border-transparent hover:border-green-500",
      attrs: href ? { href: href } : null,
    });
    card.style.setProperty("--stagger-index", String(index));
    if (href) {
      applyExternalLinkAttrs(card, href);
    } else {
      applyDisabledLinkState(card);
    }

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

    var href = resolveHref(contact.href, 'contact "' + (contact.label || "Unknown") + '"');
    var mutedClass = contact.muted ? " text-gray-600" : "";
    var link = createElement("a", {
      className:
        "contact-link inline-flex items-center gap-2 hover:text-green-600 transition-colors underline-offset-4 hover:underline decoration-1" +
        mutedClass,
      attrs: href ? { href: href } : null,
    });
    if (href) {
      applyExternalLinkAttrs(link, href);
    } else {
      applyDisabledLinkState(link);
    }

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

function enhanceFooterBuild(root, content) {
  var footerBuild = qs('[data-role="footer-build"]', root);
  var buildText = getPathValue(content, "footer.build");
  if (!footerBuild || !hasText(buildText)) {
    return;
  }

  var rawText = String(buildText).trim();
  var parts = rawText.split(/\s*[|｜•·]\s*/).filter(Boolean);

  footerBuild.textContent = "";
  footerBuild.setAttribute("aria-label", rawText);

  if (parts.length <= 1) {
    footerBuild.textContent = rawText;
    return;
  }

  parts.forEach(function (part, index) {
    var chunkText = index < parts.length - 1 ? part + " |" : part;
    footerBuild.appendChild(
      createElement("span", {
        className: "footer-build-chunk",
        text: chunkText,
      })
    );
  });
}

function applyContent(content) {
  if (!content || typeof content !== "object") {
    return;
  }

  if (typeof content.pageTitle === "string") {
    document.title = content.pageTitle;
  }

  bindTextContent(document, content);
  animateHeroName(document);
  bindTitleAttributes(document, content);

  var line1 = qs('[data-role="hero-specialty-line-1"]');
  var line2 = qs('[data-role="hero-specialty-line-2"]');
  var specialtyBlock = qs('[data-role="hero-specialty-lines"]');
  var hasLine1 = hasText(getPathValue(content, "hero.specialtyLine1"));
  var hasLine2 = hasText(getPathValue(content, "hero.specialtyLine2"));

  if (line1) {
    line1.classList.toggle("hidden", !hasLine1);
  }
  if (line2) {
    line2.classList.toggle("hidden", !hasLine2);
  }
  if (specialtyBlock) {
    specialtyBlock.classList.toggle("hidden", !hasLine1 && !hasLine2);
  }

  renderProjects(content.projects);
  renderContacts(content.contacts);
  enhanceFooterBuild(document, content);
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

function setupScrollHint() {
  var scrollHint = qs('[data-role="scroll-hint"]');
  if (!scrollHint) {
    return;
  }

  var bottomThreshold = 24;
  var doc = document.documentElement;

  function isNearBottom() {
    return window.scrollY + window.innerHeight >= doc.scrollHeight - bottomThreshold;
  }

  function updateHintVisibility() {
    if (isNearBottom()) {
      scrollHint.classList.add("is-hidden");
    } else {
      scrollHint.classList.remove("is-hidden");
    }
  }

  window.addEventListener(
    "scroll",
    updateHintVisibility,
    { passive: true }
  );
  window.addEventListener("resize", updateHintVisibility);

  scrollHint.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollBy({
      top: Math.max(window.innerHeight * 0.8, 320),
      behavior: "smooth",
    });
  });

  updateHintVisibility();
}

function initializePortfolioPage() {
  applyContent(window.PORTFOLIO_CONTENT || {});
  setupRevealAnimations();
  setupCursorGlow();
  setupScrollHint();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePortfolioPage);
} else {
  initializePortfolioPage();
}
