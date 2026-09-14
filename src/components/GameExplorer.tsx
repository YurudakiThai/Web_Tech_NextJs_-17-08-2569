"use client";

import { useState, type ChangeEvent } from "react";
import type { Game, GameStatus } from "@/src/types/game";
import { GAME_STATUS_LABELS } from "@/src/types/game";
import GameCard from "@/src/components/GameCard";
import GameForm, { type GameDraft } from "@/src/components/GameForm";

type GameExplorerProps = { initialGames: Game[] };
type GameStatusFilter = "all" | GameStatus;

export default function GameExplorer({ initialGames }: GameExplorerProps) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<GameStatusFilter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  function toGame(id: string, draft: GameDraft): Game {
    return {
      id,
      name: draft.name.trim(),
      platform: draft.platform,
      hours: Number(draft.hours),
      status: draft.status,
    };
  }

  function handleSave(draft: GameDraft) {
    if (editingId === null) {
      setGames((prev) => [...prev, toGame(crypto.randomUUID(), draft)]);
      return;
    }
    setGames((prev) =>
      prev.map((g) => (g.id === editingId ? toGame(editingId, draft) : g))
    );
    setEditingId(null);
  }

  function handleDelete(id: string) {
    setGames((prev) => prev.filter((g) => g.id !== id));
    setConfirmingId(null);
  }

  function handleToggleStatus(id: string) {
    setGames((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const nextStatus: GameStatus =
          g.status === "not-started" ? "playing"
            : g.status === "playing" ? "finished"
              : "not-started";
        return { ...g, status: nextStatus };
      })
    );
  }

  const editingGame = games.find((g) => g.id === editingId);
  const searchText = keyword.trim().toLowerCase();
  const visibleGames = games.filter((g) => {
    const matchSearch =
      g.name.toLowerCase().includes(searchText) ||
      g.platform.toLowerCase().includes(searchText);
    const matchStatus = statusFilter === "all" || g.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalHoursNotStarted = games
    .filter((g) => g.status === "not-started")
    .reduce((sum, g) => sum + g.hours, 0);

  return (
    <div className="space-y-6">
      <header className="flex items-baseline justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-ink m-0">Game Backlog</h1>
        <p className="text-sm text-muted m-0">
          ยังไม่เริ่มรวม <span className="font-semibold text-ink">{totalHoursNotStarted}</span> ชม.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="keyword" className="label">ค้นหาเกม</label>
          <input
            id="keyword"
            placeholder="ค้นหาชื่อเกมหรือแพลตฟอร์ม..."
            value={keyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="statusFilter" className="label">สถานะ</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setStatusFilter(e.target.value as GameStatusFilter)
            }
            className="select"
          >
            <option value="all">ทั้งหมด</option>
            {Object.entries(GAME_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <section className="card">
        <GameForm
          key={editingId ?? "new"}
          initialGame={editingGame}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
        />
      </section>

      <div className="space-y-3">
        {visibleGames.length === 0 ? (
          <p className="text-center text-muted py-8">ไม่พบเกมที่ตรงกับคำค้น</p>
        ) : (
          visibleGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              confirming={confirmingId === game.id}
              onEdit={() => setEditingId(game.id)}
              onDelete={() => setConfirmingId(game.id)}
              onCancelDelete={() => setConfirmingId(null)}
              onConfirmDelete={() => handleDelete(game.id)}
              onToggleStatus={() => handleToggleStatus(game.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
