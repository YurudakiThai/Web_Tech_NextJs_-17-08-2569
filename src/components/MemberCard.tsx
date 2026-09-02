import Image from "next/image";
import type { Member } from "@/src/types/band";

type MemberCardProps = {
  member: Member;
};

export default function MemberCard({
  member,
}: MemberCardProps) {
  return (
    <article className="member-card">

      <div className="member-image-wrapper">
        <Image
          src={member.image}
          sizes="(max-width: 768px) 45vw, 180px"
          className="member-image"
          alt={member.name}
          width={180}
          height={180}
        />
      </div>

      <div className="member-detail">
        <h4>{member.name}</h4>
        <p>{member.role}</p>
      </div>

    </article>
  );
}
