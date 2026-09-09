import Header from "@/src/components/Header";
import BandsExplorer from "../components/BandsExplorer";
import { bands } from "@/src/data/bandsData";

export default function HomePage() {
  return (
    <main>
      <Header />

      <div className="main-content">

        <div className="section-heading">
          <p>SELECTED ARTISTS</p>
          <h2>
            Three Bands, Three Unique Sounds
          </h2>
        </div>

        <BandsExplorer
          bands={bands}
        />

      </div>

      <footer className="footer">
        <p>Favorite Bands Project</p>
        <p>Created with Next.js and TypeScript</p>
      </footer>
    </main >
  );
}
