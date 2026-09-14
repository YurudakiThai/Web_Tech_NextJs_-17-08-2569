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
  const [showForm, setShowForm] = useState(false);

  function toGame(id: string, draft: GameDraft): Game {
    return {
      id,
      name: draft.name.trim(),
      platform: draft.platform,
      hours: Number(draft.hours),
      status: draft.status,
      image: draft.image?.trim() || "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
    };
  }

  function handleSave(draft: GameDraft) {
    if (editingId === null) {
      setGames((prev) => [...prev, toGame(crypto.randomUUID(), draft)]);
    } else {
      setGames((prev) =>
        prev.map((g) => (g.id === editingId ? toGame(editingId, draft) : g))
      );
      setEditingId(null);
    }
    setShowForm(false);
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

  const playingCount = games.filter((g) => g.status === "playing").length;
  const finishedCount = games.filter((g) => g.status === "finished").length;

  return (
    <div className="space-y-6">
      {/* Hero stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-steam-card p-4 rounded">
          <div className="text-xs uppercase tracking-wider text-steam-muted">PLAYING</div>
          <div className="text-3xl font-bold text-steam-accent mt-1">{playingCount}</div>
        </div>
        <div className="bg-steam-card p-4 rounded">
          <div className="text-xs uppercase tracking-wider text-steam-muted">COMPLETED</div>
          <div className="text-3xl font-bold text-ok mt-1">{finishedCount}</div>
        </div>
        <div className="bg-steam-card p-4 rounded">
          <div className="text-xs uppercase tracking-wider text-steam-muted">BACKLOG (H)</div>
          <div className="text-3xl font-bold text-warn mt-1">{totalHoursNotStarted}</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3 items-end">
        <div>
          <label htmlFor="keyword" className="label">ค้นหา</label>
          <input
            id="keyword"
            placeholder="ค้นชื่อเกม..."
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
        <button
          onClick={() => { setEditingId(null); setShowForm(!showForm); }}
          className="btn-primary"
        >
          <i className="i-lucide-plus" /> เพิ่มเกม
        </button>
      </div>

      {/* Form drawer */}
      {showForm && (
        <section className="bg-steam-card p-6 rounded">
          <GameForm
            key={editingId ?? "new"}
            initialGame={editingGame}
            onSave={handleSave}
            onCancel={() => { setEditingId(null); setShowForm(false); }}
          />
        </section>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {visibleGames.length === 0 ? (
          <p className="text-center text-steam-muted py-8 col-span-full">ไม่พบเกมที่ตรงกับคำค้น</p>
        ) : (
          visibleGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              confirming={confirmingId === game.id}
              onEdit={() => { setEditingId(game.id); setShowForm(true); }}
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
