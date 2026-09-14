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
      primary: "#8b5cf6",
      ink: "#0f172a",
      fog: "#f8fafc",
      ok: "#22c55e",
      warn: "#f59e0b",
      danger: "#ef4444",
      muted: "#64748b",
    },
  },
  shortcuts: {
    "btn": "px-4 py-2 rounded-md font-medium transition inline-flex items-center gap-2 cursor-pointer disabled:opacity-50",
    "btn-primary": "btn bg-primary text-white hover:bg-primary/90",
    "btn-ghost": "btn border border-slate-300 bg-white text-ink hover:bg-slate-100",
    "btn-danger": "btn bg-danger text-white hover:bg-danger/90",
    "btn-sm": "btn !px-3 !py-1.5 text-sm",
    "input": "w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary",
    "input-error": "input border-danger focus:ring-danger/40 focus:border-danger",
    "select": "input appearance-none",
    "label": "block text-sm font-medium text-ink mb-1",
    "error-text": "text-xs text-danger mt-1",
    "card": "rounded-lg border border-slate-200 bg-white p-5 shadow-sm",
    "page": "max-w-3xl mx-auto px-4 py-8",
    "chip": "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
    "chip-not-started": "chip bg-slate-100 text-slate-700",
    "chip-playing": "chip bg-primary/10 text-primary",
    "chip-finished": "chip bg-ok/10 text-ok",
  },
});
