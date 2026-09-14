import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-[#171a21] border-b border-[#0a0a0a]">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-8" aria-label="เมนูหลัก">
        <Link href="/" className="flex items-center gap-2 text-steam-text hover:text-white transition">
          <i className="i-lucide-gamepad-2 text-2xl text-steam-accent" />
          <span className="font-bold text-lg">STEAM BACKLOG</span>
        </Link>
        <ul className="flex gap-6 list-none m-0 p-0 text-sm">
          <li><Link href="/" className="text-steam-text hover:text-white transition">HOME</Link></li>
          <li><Link href="/games" className="text-steam-text hover:text-white transition">LIBRARY</Link></li>
        </ul>
      </nav>
    </header>
  );
}
