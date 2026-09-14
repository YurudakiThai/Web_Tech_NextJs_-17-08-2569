import Link from "next/link";

export default function Home() {
  return (
    <main className="page space-y-4">
      <h1 className="text-3xl font-bold text-ink m-0">Next Course Hub</h1>
      <ul className="list-none p-0 m-0 space-y-2">
        <li>
          <Link href="/games" className="text-primary hover:underline font-medium">
            /games — Game Backlog
          </Link>
        </li>
      </ul>
    </main>
  );
}
