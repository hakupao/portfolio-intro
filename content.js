// Edit this file to replace the demo content with your own profile data.
window.PORTFOLIO_CONTENT = {
  pageTitle: "Portfolio",
  headerLabel: "Portfolio_v2.0",
  headerLocation: "Loc: Tokyo, JP",
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
      title: "Clinical Trial Dashboard",
      stack: "React / D3.js",
      description:
        "Interactive visualization of patient data for real-time demographic filtering.",
      href: "#",
    },
    {
      title: "Automated ETL Pipeline",
      stack: "Python / SQL",
      description:
        "Processing raw clinical data from EDC systems into SDTM compliant datasets.",
      href: "#",
    },
    {
      title: "SDTM Converter Tool",
      stack: "SAS / Macro",
      description:
        "Custom SAS macro library automating mapping of raw datasets to CDISC standards.",
      href: "#",
    },
    {
      title: "Medical Record Anonymizer",
      stack: "NLP / Security",
      description:
        "HIPAA-compliant data masking tool utilizing NLP for unstructured text.",
      href: "#",
    },
  ],
  contacts: [
    {
      label: "github.com/kenji-data",
      href: "#",
      showExternalIcon: true,
      muted: false,
    },
    {
      label: "hello@example.com",
      href: "mailto:hello@example.com",
      showExternalIcon: false,
      muted: true,
    },
  ],
  footer: {
    year: "© 2026",
    build: "Build: Tailwind + HTML",
  },
};
