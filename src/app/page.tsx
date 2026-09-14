import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Next Course Hub</h1>
      <p>
        <Link href="/courses">/courses</Link>
      </p>
      <p>
        <Link href="/games">/games</Link>
      </p>
    </main>
  );
}
