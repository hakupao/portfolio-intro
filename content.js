// Edit this file to replace the demo content with your own profile data.
window.PORTFOLIO_CONTENT = {
  pageTitle: "Portfolio",
  headerLabel: "Portfolio",
  headerLocation: "Loc: Yokohama, JP",
  availabilityTitle: "Available for work",
  hero: {
    greetingPrefix: "Hello, I'm",
    name: "Bojiang Zhang.",
    locationPrefix: "Based in",
    country: "Yokohama, Japan",
    specialtyLine1: "Specializing in Medical Data Engineering.",
    specialtyLine2: "ETL Pipelines and SDTM Standards.",
  },
  sections: {
    works: "01_Selected_Works",
    connect: "02_Connect",
  },
  projects: [
    {
      title: "MedAudit Diff Watcher",
      stack: "Python / CLI / SQLite / CSV Audit",
      description:
        "Local CSV audit diff tool for versioned folders with auto-compare, structured row/field change detection, SQLite persistence, and HTML/CSV report generation.",
      href: "https://github.com/hakupao/MedAudit-Diff-Watcher",
    },
    {
      title: "DataForge Studio (tools_box)",
      stack: "Python / PySide6 / QFluentWidgets",
      description:
        "Windows desktop toolbox for SDTM-oriented data processing, featuring format conversion, data cleaning, masking, field extraction, and batch utilities in a Fluent-style GUI.",
      href: "https://github.com/hakupao/tools_box",
    },
    {
      title: "Badminton YoYaku Assistant",
      stack: "Chrome Extension (MV3) / JavaScript / DOM Automation",
      description:
        "Browser extension that assists Yokohama facility booking workflows with automated page interactions, search condition handling, and bilingual (Chinese/Japanese) UI support.",
      href: "https://github.com/hakupao/badminton-yoyaku",
    },
    {
      title: "LatSolarLab",
      stack: "JavaScript / Three.js / Globe.gl",
      description:
        "Interactive solar radiation calculator with a live 3D globe, location/date comparison modes, coordinate conversion, and bilingual visualization for latitude-based analysis.",
      href: "https://github.com/hakupao/LatSolarLab",
    },
  ],
  contacts: [
    {
      label: "https://github.com/hakupao",
      href: "#",
      showExternalIcon: true,
      muted: false,
    },
    {
      label: "cnhakupao@yahoo.co.jp",
      href: "mailto:cnhakupao@yahoo.co.jp",
      showExternalIcon: false,
      muted: true,
    },
  ],
  footer: {
    year: "© 2026",
    build: "Build: Tailwind + HTML",
  },
};
