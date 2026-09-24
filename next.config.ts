import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // ถ้าใช้ Next/Image กับ URL ภายนอก ต้องอนุญาต domain
    remotePatterns: [
      { protocol: "https", hostname: "**" }, // หรือระบุ domain เจาะจง
    ],
    // GIF ขนาดใหญ่ ถ้าอยากให้ optimize ให้ตั้งค่าเพิ่ม
    dangerouslyAllowSVG: true, // ถ้าใช้ .svg
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
