import Image from "next/image";
import type { Member } from "@/src/types/band";

type MemberCardProps = {
  member: Member;
};

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <article className="member-card">
      <div className="member-image-wrapper">
        <Image
          src={member.image}
          className="member-image w-full h-auto"
          alt={member.name}
          priority={true}
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
