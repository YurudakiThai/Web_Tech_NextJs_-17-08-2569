"use client";

import { useState } from "react";
import Image from "next/image";

const FALLBACK_IMAGE = "/no-image.svg";

// domain ที่ควรใช้ <img> แทน next/image
const EXTERNAL_GIF_HOSTS = ["tenor.com", "giphy.com", "gfycat.com"];

function shouldUseNativeImg(src: string) {
  try {
    const host = new URL(src).hostname;
    return EXTERNAL_GIF_HOSTS.some((h) => host.endsWith(h));
  } catch {
    return false;
  }
}

export default function ProductThumbnail({
  src,
  alt,
  size = 60,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    if (imgSrc !== FALLBACK_IMAGE) setImgSrc(FALLBACK_IMAGE);
  };

  // ใช้ class ของ UnoCSS แทน inline style — ขอบมน มีวงแหวนและเงาเล็กน้อย
  const className =
    "rounded-lg object-cover ring-1 ring-brand-200/70 shadow-sm bg-brand-50 shrink-0";

  // GIF จาก Tenor/Giphy → ใช้ <img> ตรงๆ
  if (shouldUseNativeImg(imgSrc)) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={imgSrc}
        alt={alt}
        width={size}
        height={size}
        className={className}
        style={{ width: size, height: size }}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={size}
      height={size}
      unoptimized
      className={className}
      style={{ width: size, height: size }}
      onError={handleError}
    />
  );
}
