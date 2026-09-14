import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { games } from "../../../data/games";
import { GAME_STATUS_LABELS } from "../../../types/game";

type GamePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { id } = await params;
  const game = games.find((item) => item.id === id);

  return {
    title: game ? game.name : "ไม่พบเกม",
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;
  const game = games.find((item) => item.id === id);

  if (!game) {
    notFound();
    return null;
  }

  return (
    <article>
      <h1>{game.name}</h1>
      <p>แพลตฟอร์ม: {game.platform}</p>
      <p>จำนวนชั่วโมง: {game.hours}</p>
      <p>สถานะ: {GAME_STATUS_LABELS[game.status]}</p>
      <Link href="/games">กลับ</Link>
    </article>
  );
}
