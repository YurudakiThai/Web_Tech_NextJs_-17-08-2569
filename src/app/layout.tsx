import type { Metadata } from "next";
import "@unocss/reset/tailwind.css"; // normalize พื้นฐาน ให้จุดเริ่มต้นเดียวกันกับทุกเบราว์เซอร์
import "@/src/app/uno.css"; // UnoCSS (ผ่าน @unocss/postcss)

export const metadata: Metadata = {
  title: "รายการสินค้า | Product Explorer",
  description: "สำรวจ จัดการ และค้นหาสินค้า — React Hook Form + Zod + UnoCSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className="font-sans">
      <body className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-brand-100/60 text-brand-900 antialiased selection:bg-brand-200">
        {children}
      </body>
    </html>
  );
}
