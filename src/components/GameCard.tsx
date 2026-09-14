"use client";

import Link from "next/link";
import Image from "next/image";
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
    <article className="card">
      <Link href={`/games/${game.id}`} className="block relative group">
        <div className="relative aspect-[92/43] bg-black overflow-hidden">
          <Image
            src={game.image}
            alt={game.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-2 left-2 right-2">
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); onToggleStatus(); }}
              className={chipClass[game.status]}
            >
              {GAME_STATUS_LABELS[game.status]}
            </button>
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-2">
        <h2 className="text-base font-semibold text-white truncate m-0">
          <Link href={`/games/${game.id}`} className="hover:text-steam-accent transition">
            {game.name}
          </Link>
        </h2>

        <div className="flex items-center justify-between text-xs text-steam-muted">
          <span className="flex items-center gap-1">
            <i className="i-lucide-monitor" /> {game.platform}
          </span>
          <span className="flex items-center gap-1">
            <i className="i-lucide-clock" /> {game.hours}h
          </span>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-steam-hover/30">
          <button onClick={onEdit} className="btn-ghost btn-sm flex-1 justify-center">
            <i className="i-lucide-pencil" /> แก้ไข
          </button>
          {confirming ? (
            <>
              <button onClick={onConfirmDelete} className="btn-danger btn-sm flex-1 justify-center">
                <i className="i-lucide-check" /> ยืนยัน
              </button>
              <button onClick={onCancelDelete} className="btn-ghost btn-sm flex-1 justify-center">
                ยกเลิก
              </button>
            </>
          ) : (
            <button onClick={onDelete} className="btn-danger btn-sm flex-1 justify-center">
              <i className="i-lucide-trash-2" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
