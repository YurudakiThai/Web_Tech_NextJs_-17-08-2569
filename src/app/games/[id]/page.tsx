import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
    <article className="page">
      <Link
        href="/games"
        className="inline-flex items-center gap-1 text-sm text-steam-accent hover:underline mb-4"
      >
        <i className="i-lucide-arrow-left" /> กลับสู่ Library
      </Link>

      <div className="relative aspect-[92/43] rounded overflow-hidden mb-6">
        <Image
          src={game.image}
          alt={game.name}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-steam-bg via-transparent to-transparent" />
        <h1 className="absolute bottom-4 left-4 text-4xl font-bold text-white m-0 drop-shadow-lg">
          {game.name}
        </h1>
      </div>

      <div className="bg-steam-card rounded p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-steam-accent mb-1">แพลตฟอร์ม</div>
          <div className="text-lg text-white">{game.platform}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-steam-accent mb-1">จำนวนชั่วโมง</div>
          <div className="text-lg text-white">{game.hours} ชม.</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-steam-accent mb-1">สถานะ</div>
          <div className="text-lg text-white">{GAME_STATUS_LABELS[game.status]}</div>
        </div>
      </div>
    </article>
  );
}
