import type { Metadata } from "next";
import { games } from "@/src/data/games";
import GameExplorer from "@/src/components/GameExplorer";

export const metadata: Metadata = { title: "Game Backlog" };

export default function GamesPage() {
  return (
    <main className="page">
      <GameExplorer initialGames={games} />
    </main>
  );
}
