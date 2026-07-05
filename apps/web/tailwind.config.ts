import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10131a",
        paper: "#f7f4ee",
        moss: "#60745f",
        ember: "#d45b39",
        steel: "#596878",
        gold: "#c8963e"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(16, 19, 26, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
