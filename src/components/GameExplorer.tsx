"use client";

import { useState, type ChangeEvent } from "react";
import type { Game, GameStatus } from "../types/game";
import { GAME_STATUS_LABELS } from "../types/game";
import GameCard from "../components/GameCard";
import GameForm, { type GameDraft } from "../components/GameForm";

type GameExplorerProps = {
  initialGames: Game[];
};

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
      prev.map((game) => (game.id === editingId ? toGame(editingId, draft) : game)),
    );

    setEditingId(null);
  }

  function handleDelete(id: string) {
    setGames((prev) => prev.filter((game) => game.id !== id));
    setConfirmingId(null);
  }

  function handleToggleStatus(id: string) {
    setGames((prev) =>
      prev.map((game) => {
        if (game.id !== id) {
          return game;
        }

        const nextStatus: GameStatus =
          game.status === "not-started"
            ? "playing"
            : game.status === "playing"
              ? "finished"
              : "not-started";

        return { ...game, status: nextStatus };
      }),
    );
  }

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleStatusFilterChange(event: ChangeEvent<HTMLSelectElement>) {
    setStatusFilter(event.target.value as GameStatusFilter);
  }

  const editingGame = games.find((game) => game.id === editingId);
  const searchText = keyword.trim().toLowerCase();

  const visibleGames = games.filter((game) => {
    const matchSearch =
      game.name.toLowerCase().includes(searchText) ||
      game.platform.toLowerCase().includes(searchText);

    const matchStatus = statusFilter === "all" || game.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const totalHoursNotStarted = games
    .filter((game) => game.status === "not-started")
    .reduce((sum, game) => sum + game.hours, 0);

  return (
    <div>
      <label htmlFor="keyword">ค้นหาเกม</label>
      <input id="keyword" placeholder="ค้นหาเกม" value={keyword} onChange={handleKeywordChange} />

      <label htmlFor="statusFilter">สถานะ</label>
      <select id="statusFilter" value={statusFilter} onChange={handleStatusFilterChange}>
        <option value="all">ทั้งหมด</option>
        {GAME_STATUS_LABELS &&
          Object.entries(GAME_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
      </select>

      <p>ชั่วโมงรวมของเกมที่ยังไม่เริ่ม: {totalHoursNotStarted}</p>

      <GameForm
        key={editingId ?? "new"}
        initialGame={editingGame}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      {visibleGames.length === 0 ? (
        <p>ไม่พบเกม</p>
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
  );
}
