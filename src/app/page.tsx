import Header from "@/src/components/Header";
import BandsCard from "@/src/components/BandsCard";
import { bands } from "@/src/data/bandsData";

export default function HomePage() {
  return (
    <main>
      <Header />

      <main className="main-content">

        <div className="section-heading">
          <p>SELECTED ARTISTS</p>
          <h2>
            Three Bands, Three Unique Sounds
          </h2>
        </div>

        <div className="Band-list">
          {bands.map((Band, index) => (
            <BandsCard
              key={Band.id}
              Band={Band}
              position={index}
            />

          ))}
        </div>

      </main>

      <footer className="footer">
        <p>Favorite Bands Project</p>
        <p>Created with Next.js and TypeScript</p>
      </footer>
    </main>
  );
}
