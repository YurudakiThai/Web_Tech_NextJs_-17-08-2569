"use client";

import Link from "next/link";
import type { Game, GameStatus } from "@/src/types/game";
import { GAME_STATUS_LABELS } from "@/src/types/game";

type GameCardProps = {
  game: Game;
  confirming: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  onToggleStatus: () => void;
};

const chipClass: Record<GameStatus, string> = {
  "not-started": "chip-not-started",
  playing: "chip-playing",
  finished: "chip-finished",
};

export default function GameCard({
  game, confirming,
  onEdit, onDelete, onCancelDelete, onConfirmDelete, onToggleStatus,
}: GameCardProps) {
  return (
    <article className="card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-lg font-semibold m-0">
            <Link href={`/games/${game.id}`} className="hover:text-primary transition">
              {game.name}
            </Link>
          </h2>
          <button
            type="button"
            onClick={onToggleStatus}
            className={chipClass[game.status]}
            title="คลิกเพื่อเปลี่ยนสถานะ"
          >
            {GAME_STATUS_LABELS[game.status]}
          </button>
        </div>
        <p className="text-sm text-muted mt-1 mb-0">
          <span className="font-medium">{game.platform}</span> · {game.hours} ชม.
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0 flex-wrap">
        <button onClick={onEdit} className="btn-ghost btn-sm">
          <i className="i-lucide-pencil" /> แก้ไข
        </button>

        {confirming ? (
          <>
            <span className="text-sm text-danger">ยืนยันการลบ?</span>
            <button onClick={onConfirmDelete} className="btn-danger btn-sm">
              <i className="i-lucide-check" /> ยืนยัน
            </button>
            <button onClick={onCancelDelete} className="btn-ghost btn-sm">
              ยกเลิก
            </button>
          </>
        ) : (
          <button onClick={onDelete} className="btn-danger btn-sm">
            <i className="i-lucide-trash-2" /> ลบ
          </button>
        )}
      </div>
    </article>
  );
}
