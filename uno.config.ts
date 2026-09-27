import {
  defineConfig,
  presetUno,
  presetIcons,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  // สไตล์เขียว-หยกเดิมของแอป ต่อยอดเป็นธีม Emerald + Amber
  theme: {
    colors: {
      brand: {
        50: "#effaf5",
        100: "#d9f2e6",
        200: "#b3e4cd",
        300: "#7fd0ac",
        400: "#4bb589",
        500: "#279a6f",
        600: "#176b4d",
        700: "#11573e",
        800: "#0e4532",
        900: "#0c392b",
      },
    },
  },
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Sarabun:400,500,600,700", // ฟอนต์ไทยอ่านง่าย
        display: "Prompt:500,600,700", // หัวเรื่อง
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {
    "panel-card":
      "rounded-2xl border border-brand-100 bg-white shadow-sm shadow-brand-900/5",
    "field-label": "text-sm font-medium text-brand-800",
    "field-input":
      "w-full rounded-lg border border-brand-200 bg-brand-50/40 px-3 py-2 text-sm text-brand-900 outline-none transition placeholder:text-brand-900/35 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/25 aria-[invalid=true]:border-red-400 aria-[invalid=true]:bg-red-50 aria-[invalid=true]:focus:ring-red-400/25",
    "btn-primary":
      "inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
    "btn-secondary":
      "inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
    "btn-danger":
      "inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-600/90 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700 active:scale-[0.98]",
    "error-text": "min-h-[1.2em] text-xs font-medium text-red-600",
  },
});
