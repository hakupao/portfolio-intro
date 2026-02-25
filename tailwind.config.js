tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        accent: "#4f4f4f",
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
        heartbeat: "heartbeat 2s infinite",
      },
    },
  },
};
