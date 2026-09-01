import Image from 'next/image';
import {Band} from "@/src/types/band";

type BandCardProps = {
 band:Band;
};

export default function BandCard({band}: BandCardProps) {
  if (!band) return null;
  return (
    <article className="band-card text-center">
      <div className="flex justify-center">
        <Image 
          src={band.logoUrl}
          alt = {band.id}
          width = {300}
          height = {300}
        />
      </div>
      
      <br/>
      <h2 >ชื่อวง : {band.brandname}</h2>
      <p>ผู้บุกเบิก : {band.founder} <br/>
      ก่อตั้งเมื่อปี : {band.establishedYear} </p>
      <br/>
      <p>ชื่อสมาชิกในปัจจุบัน : {Array.isArray(band.members) ? band.members.join(", \n") : band.members}</p>  
      <br/>
    </article>
  );
};
