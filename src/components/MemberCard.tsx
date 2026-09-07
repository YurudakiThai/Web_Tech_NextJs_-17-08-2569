import Image from "next/image";
import type { Member } from "@/src/types/band";


type MemberCardProps  = {
  member: Member;
  isFollowed: boolean;
  isLiked: boolean;
  onToggleFollow: (id: number) => void;
  onToggleLike: (id: number) => void;

}


export default function MemberCard({
  member, isFollowed, isLiked, onToggleFollow, onToggleLike,
}: MemberCardProps) {
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
      <div>
        <button
          type = "button"
          className = {`btn-follow ${isFollowed ? "active":""}`}
          aria-pressed = {isFollowed}
          onClick = { () => onToggleFollow(member.id)}
          >
          {isFollowed ? "เลิกติดตาม" : "ติดตาม"}
        </button>
        <button
          type = "button"
          className = {`btn-like ${isLiked ? "active":""}`}
          aria-pressed = {isLiked}
          onClick = {() => onToggleLike(member.id)}
          >
          Liked 
        </button>
      </div>

    </article>
  );
}
