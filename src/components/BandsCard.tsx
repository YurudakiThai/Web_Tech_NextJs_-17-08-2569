import Image from 'next/image';
import {Band} from "../types/band";

type BandCardProps = {
 band:Band;
};

export default function BandCard({band}: BandCardProps) {
  if (!band) return null;
  return (
    <article className="band-card">
      <Image 
      src={band.logoUrl}
      alt = {band.id}
      width = {300}
      height = {300}
      />
      {band.brandname}
      {band.founder}
      {Array.isArray(band.members) ? band.members.join(", \n") : band.members}  
      <br/>
      {band.establishedYear} 
    </article>
  );
};
