import { defineConfig, presetUno, presetAttributify, presetIcons } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  theme: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      gold: "var(--gold)",
      dark: "var(--dark)",
      card: "var(--card)",
      muted: "var(--muted)",
    },
  },
  content: {
    filesystem: [
      "app/**/*.{ts,tsx}",
      "pages/**/*.{ts,tsx}",
      "src/**/*.{ts,tsx}",
      "components/**/*.{ts,tsx}",
    ],
  },
});
