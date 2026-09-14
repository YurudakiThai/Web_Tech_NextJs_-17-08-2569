"use client";

import Link from "next/link";
import type { Game } from "../types/game";
import { GAME_STATUS_LABELS } from "../types/game";

type GameCardProps = {
  game: Game;
  confirming: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  onToggleStatus: () => void;
};

export default function GameCard({
  game,
  confirming,
  onEdit,
  onDelete,
  onCancelDelete,
  onConfirmDelete,
  onToggleStatus,
}: GameCardProps) {
  return (
    <article>
      <h2>
        <Link href={`/games/${game.id}`}>{game.name}</Link>
      </h2>
      <p>แพลตฟอร์ม: {game.platform}</p>
      <p>ชั่วโมง: {game.hours}</p>
      <p>สถานะ: {GAME_STATUS_LABELS[game.status]}</p>

      <button type="button" onClick={onToggleStatus}>
        เปลี่ยนสถานะ
      </button>
      <button type="button" onClick={onEdit}>
        แก้ไข
      </button>

      {confirming ? (
        <>
          <span>ยืนยันการลบ?</span>
          <button type="button" onClick={onConfirmDelete}>
            ลบ
          </button>
          <button type="button" onClick={onCancelDelete}>
            ยกเลิก
          </button>
        </>
      ) : (
        <button type="button" onClick={onDelete}>
          ลบ
        </button>
      )}
    </article>
  );
}
