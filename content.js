// Edit this file to replace the demo content with your own profile data.
window.PORTFOLIO_CONTENT = {
  pageTitle: "Portfolio",
  headerLabel: "Portfolio",
  headerLocation: "Location: Yokohama & Tokyo, Japan",
  availabilityTitle: "SYS.ONLINE",
  hero: {
    greetingPrefix: "Hello, I'm",
    name: "Bojiang Zhang.",
    openTo: "Remote roles\nJapan-based roles\nAustralia-based roles",
    role: "Medical Data Engineer",
    skill: "ETL pipelines / SDTM standards",
    scrollHint: "SCROLL TO MORE",
    specialtyLine1: "Specializing in Medical Data Engineering.",
    specialtyLine2: "ETL Pipelines and SDTM Standards.",
  },
  sections: {
    works: "01_Selected_Works",
    connect: "02_Connect",
  },
  projects: [
    {
      title: "SDTM Pedia",
      stack: "Python / Markdown / Knowledge Base / LLM-Ready",
      description:
        "AI-ready SDTM knowledge base — converts SDTM IG v3.4 PDFs and CDISC Controlled Terminology into 293 structured Markdown files across 63 domains, 1,005 codelists and 37,939 terms, fully traceable and searchable without a vector database.",
      href: "https://github.com/hakupao/sdtm-pedia",
    },
    {
      title: "SDTM Mapping System",
      stack: "Python / pandas / MySQL / CDISC SDTM / M5 Packaging",
      description:
        "Production-grade ETL pipeline that turns raw clinical study exports into CDISC SDTM-compliant datasets and ready-to-submit M5 packages, driven entirely by an Excel mapping workbook — no Python coding required.",
      href: "https://github.com/hakupao/SDTM-Mapping-System",
    },
    {
      title: "SDTM Spec Forge",
      stack: "Python / Rust / SDTMIG v3.4 / Config-Driven",
      description:
        "Hybrid Python/Rust pipeline that compiles SDTMIG PDF/Excel master references into typed specification objects, then drives config-based dataset forging with full source-to-output traceability.",
      href: "https://github.com/hakupao/sdtm-spec-forge",
    },
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
  ],
  contacts: [
    {
      label: "https://github.com/hakupao",
      href: "https://github.com/hakupao",
      showExternalIcon: true,
      muted: false,
    },
    {
      label: "zhang@bojiangz.com",
      href: "mailto:zhang@bojiangz.com",
      showExternalIcon: false,
      muted: true,
    },
  ],
  footer: {
    updatedat: "© May 2026",
    build: "Build: Tailwind + HTML | Continuously updated",
  },
};
