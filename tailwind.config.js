tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        accent: "#4f4f4f",
        "terminal-green": "#00ff41",
        background: "#ffffff",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        heartbeat: {
          "0%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(74, 222, 128, 0.7)",
          },
          "70%": {
            transform: "scale(1.1)",
            boxShadow: "0 0 0 6px rgba(74, 222, 128, 0)",
          },
          "100%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(74, 222, 128, 0)",
          },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        typing: "typing 2s steps(40, end) forwards",
        heartbeat: "heartbeat 2s infinite",
      },
    },
  },
};
