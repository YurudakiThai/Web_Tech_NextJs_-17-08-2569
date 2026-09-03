import Image from "next/image";
import MemberCard from "./MemberCard";
import type { Band } from "@/src/types/band";

type BandsCardProps = {
  Band: Band;
  position: number;
};

export default function BandsCard({
  Band,
  position,
}: BandsCardProps) {
  return (
    <section
      id={Band.slug}
      className="Band-card"
      style={{
        borderTopColor: Band.accentColor,
      }}
    >
      <div className="Band-hero">

        <div className="Band-image-wrapper">
          <Image
            src={Band.image}
            className="Band-image"
            priority={true}
            alt={Band.name}
            width={300}
            height={300}
            style={{ width: '61.8%', height: 'auto', }}
          />

        </div>

        <div className="Band-information">

          <span
            className="Band-number"
            style={{
              color: Band.accentColor,
            }}
          >
            BAND {String(position + 1).padStart(2, "0")}
          </span>

          <h2>{Band.name}</h2>

          <div className="Band-meta">
            <span>{Band.genre}</span>
            <span>•</span>
            <span>{Band.origin}</span>
          </div>

          <p className="Band-description">
            {Band.description}
          </p>

          <p className="member-count">
            {Band.members.length} members
          </p>

        </div>
      </div>

      <div className="members-section">

        <h3>Band Members</h3>

        <div className="member-grid">
          {Band.members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
