import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({ scale: 1.2 }),
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      // Steam palette
      "steam-bg": "#1b2838",
      "steam-card": "#2a475e",
      "steam-text": "#c7d5e0",
      "steam-muted": "#8f98a0",
      "steam-accent": "#66c0f4",
      "steam-highlight": "#1a9fff",
      "steam-hover": "#3d6c8d",
      danger: "#e74c3c",
      ok: "#5cb85c",
      warn: "#f0ad4e",
    },
  },
  shortcuts: {
    "btn": "px-4 py-2 rounded font-medium transition inline-flex items-center gap-2 cursor-pointer disabled:opacity-50 border-0",
    "btn-primary": "btn bg-steam-highlight text-white hover:brightness-110",
    "btn-ghost": "btn bg-transparent border border-steam-hover text-steam-text hover:bg-steam-hover",
    "btn-danger": "btn bg-danger text-white hover:brightness-110",
    "btn-sm": "btn !px-3 !py-1.5 text-xs",
    "input": "w-full px-3 py-2 rounded bg-steam-bg border border-steam-hover text-steam-text focus:outline-none focus:border-steam-accent placeholder:text-steam-muted",
    "input-error": "input border-danger focus:border-danger",
    "select": "input appearance-none",
    "label": "block text-xs uppercase tracking-wider text-steam-accent mb-1.5 font-semibold",
    "error-text": "text-xs text-danger mt-1",
    "card": "rounded bg-steam-card shadow-md overflow-hidden transition hover:-translate-y-1 hover:shadow-xl",
    "page": "max-w-6xl mx-auto px-4 py-8",
    "chip": "inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-semibold uppercase tracking-wide",
    "chip-not-started": "chip bg-steam-muted/20 text-steam-muted",
    "chip-playing": "chip bg-steam-highlight/30 text-steam-accent",
    "chip-finished": "chip bg-ok/20 text-ok",
  },
});
