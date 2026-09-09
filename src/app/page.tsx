import Header from "@/src/components/Header";
import BandsExplorer from "../components/BandsExplorer";
import { bands } from "@/src/data/bandsData";

export default function HomePage() {
  return (
    <main>
      <Header />

      <div className="main-content">
        <BandsExplorer bands={bands} />
      </div>

      <footer className="footer">
        <p>Favorite Bands Project</p>
        <p>Created with Next.js and TypeScript</p>
      </footer>
    </main>
  );
}
