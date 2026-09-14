import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { games } from "@/src/data/games";
import { GAME_STATUS_LABELS } from "@/src/types/game";

type GamePageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { id } = await params;
  const game = games.find((item) => item.id === id);
  return { title: game ? game.name : "ไม่พบเกม" };
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;
  const game = games.find((item) => item.id === id);
  if (!game) notFound();

  return (
    <article className="page space-y-4">
      <Link
        href="/games"
        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
      >
        <i className="i-lucide-arrow-left" /> กลับ
      </Link>
      <h1 className="text-3xl font-bold text-ink m-0">{game.name}</h1>
      <dl className="card grid grid-cols-2 gap-y-3 text-sm m-0">
        <dt className="text-muted">แพลตฟอร์ม</dt>
        <dd className="font-medium m-0">{game.platform}</dd>
        <dt className="text-muted">จำนวนชั่วโมง</dt>
        <dd className="m-0">{game.hours} ชม.</dd>
        <dt className="text-muted">สถานะ</dt>
        <dd className="m-0">{GAME_STATUS_LABELS[game.status]}</dd>
      </dl>
    </article>
  );
}
