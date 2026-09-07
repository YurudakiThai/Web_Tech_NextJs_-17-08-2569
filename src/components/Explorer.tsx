// src/app/page.tsx
"use client"; // ต้องใช้ client component เพื่อใช้ useState

import { useState } from "react";
import BandsCard from "@/src/components/BandsCard";
import type { Band } from "@/src/types/band";

type BandFollowState = {
  isFollowed: boolean;
  isLiked: boolean;
};

export default function Page({ bands }: { bands: Band[] }) {
  // State สำหรับวงดนตรีแต่ละวง (key: band.id)
  const [bandStates, setBandStates] = useState<Record<number, BandFollowState>>(() => {
    const initial: Record<number, BandFollowState> = {};
    bands.forEach((band) => {
      initial[band.id] = {
        isFollowed: false,
        isLiked: false,
      };
    });
    return initial;
  });

  const handleToggleBandFollow = (bandId: number) => {
    setBandStates((prev) => ({
      ...prev,
      [bandId]: {
        ...prev[bandId],
        isFollowed: !prev[bandId].isFollowed,
      },
    }));
  };

  const handleToggleBandLike = (bandId: number) => {
    setBandStates((prev) => ({
      ...prev,
      [bandId]: {
        ...prev[bandId],
        isLiked: !prev[bandId].isLiked,
      },
    }));
  };

  return (
    <div>
      {bands.map((band, index) => {
        const bandState = bandStates[band.id] ?? {
          isFollowed: false,
          isLiked: false,
        };
        return (
          <BandsCard
            key={band.id}
            band={band}
            position={index}
            isFollowed={bandState.isFollowed}
            isLiked={bandState.isLiked}
            onToggleFollow={handleToggleBandFollow}
            onToggleLike={handleToggleBandLike}
          />
        );
      })}
    </div>
  );
}
