import { bands } from "@/src/data/bandsData";
import { Band } from "../types/band";

export default function Header() {
  return (
    <header className="site-header">
      <nav className="navbar">

        <a href="">
          <span> BAND SPACE</span>
        </a>

        <div className="nav-links">
          {bands.map((band: Band) => (
            <a key={band.slug} href={`#${band.slug}`}>
              <span>{band.name}</span>
            </a>
          ))}
        </div>

      </nav>

      <div className="hero-content">

        <p className="eyebrow">
          MUSIC COLLECTION
        </p>

        <h1>
          My Favorite
          <span>Bands</span>
        </h1>

        <p className="hero-description">
          Discover three bands that inspire me through
          their music, style, and memorable members.
        </p>

        <a href="#the-beatles">
          Explore the bands ↓
        </a>
      </div>
    </header >
  );
}
