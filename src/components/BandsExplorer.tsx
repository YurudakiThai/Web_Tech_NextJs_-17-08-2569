"use client";

import { useState, type ChangeEvent } from "react";
import type { Band } from "@/src/types/band";
import BandsCard from "./BandsCard";

type BandsExplorerProps = {
  bands: Band[];
};

export default function BandsExplorer({ bands }: BandsExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [followedIds, setFollowedIds] = useState<number[]>([]);
  const [likes, setLikes] = useState<Record<number, number>>({});

  function handleKeywordChange(e: ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  function handleToggleFollow(id: number) {
    setFollowedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function handleLike(id: number) {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  }

  const searchText = keyword.trim().toLowerCase();
  const visibleBands = bands.filter((band) => band.name.toLowerCase().includes(searchText));
  // const visibleMembers = bands.members.filter((member) =>
  //   member.name.toLowerCase().includes(searchText),
  // );
  console.log(bands.map((band) => band.members.map((member) => member.name)));

  return (
    <div>
      <div className="toolbar ">
        <input
          type="search"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวงดนตรี..."
          aria-label="ค้นหาวงดนตรี"
        />
        <p className="text-gold">
          ติดตามอยู่ {followedIds.length} วง · พบ {visibleBands.length} วง
        </p>
      </div>

      {visibleBands.length === 0 ? (
        <div className="empty">
          <h2>ไม่พบวงดนตรี</h2>
          <p>ลองเปลี่ยนคำค้นหา</p>
        </div>
      ) : (
        <div className="band-list">
          {visibleBands.map((band, index) => (
            <BandsCard
              key={band.id}
              Band={band}
              position={index}
              isFollowed={followedIds.includes(band.id)}
              onToggleFollow={handleToggleFollow}
              likeCount={likes[band.id] || 0}
              onLike={handleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}
