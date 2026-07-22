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
      category: "Knowledge & Spec",
      title: "SDTM Pedia",
      tagline: "AI-ready SDTM knowledge base — no vector DB required.",
      stack: ["Python", "Markdown", "LLM-Ready"],
      bullets: [
        "SDTM IG v3.4 PDFs → 293 structured Markdown files",
        "63 domains · 1,005 codelists · 37,939 CDISC terms",
        "Drop-in for Claude / Cursor — methodology-validated",
      ],
      href: "https://github.com/hakupao/sdtm-pedia",
    },
    {
      category: "Knowledge & Spec",
      title: "SDTM Spec Forge",
      tagline: "Compile SDTMIG references into typed, traceable specs.",
      stack: ["Python", "Rust", "SDTMIG v3.4"],
      bullets: [
        "Hybrid Python + Rust for performance-critical PDF parsing",
        "Spec objects drive config-based dataset generation",
        "Source-to-output traceability built in",
      ],
      href: "https://github.com/hakupao/sdtm-spec-forge",
    },
    {
      category: "Pipeline & Production",
      title: "SDTM Mapping System",
      tagline: "Excel-driven ETL from raw study exports to M5 submission.",
      stack: ["Python", "pandas", "MySQL", "CDISC SDTM"],
      bullets: [
        "7-step automated pipeline · zero Python coding required",
        "Outputs CDISC SDTM datasets + M5 regulatory package",
        "Mapping rules live in a single Excel workbook",
      ],
      href: "https://github.com/hakupao/SDTM-Mapping-System",
    },
    {
      category: "Tooling & Audit",
      title: "MedAudit Diff Watcher",
      tagline: "Local CSV diff & audit for versioned data folders.",
      stack: ["Python", "CLI", "SQLite"],
      bullets: [
        "Auto-compare row/field changes across versions",
        "SQLite-backed history · HTML & CSV reports out",
        "CLI-first · runs entirely offline",
      ],
      href: "https://github.com/hakupao/MedAudit-Diff-Watcher",
    },
    {
      category: "Tooling & Audit",
      title: "DataForge Studio (tools_box)",
      tagline: "Windows desktop toolbox for SDTM data prep.",
      stack: ["Python", "PySide6", "QFluentWidgets"],
      bullets: [
        "Format conversion · cleaning · masking · field extraction",
        "Batch utilities in a Fluent-style GUI",
        "Built for analysts who don't write Python",
      ],
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
    updatedat: "© Jul 2026",
    build: "Build: Tailwind + HTML | Continuously updated",
  },
};
