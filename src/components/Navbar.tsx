import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-ink text-white">
      <nav className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-6" aria-label="เมนูหลัก">
        <Link href="/" className="font-bold text-lg hover:text-primary transition">
          Game Hub
        </Link>
        <ul className="flex gap-4 list-none m-0 p-0">
          <li><Link href="/" className="text-slate-200 hover:text-white transition">หน้าแรก</Link></li>
          <li><Link href="/games" className="text-slate-200 hover:text-white transition">Game Backlog</Link></li>
        </ul>
      </nav>
    </header>
  );
}
