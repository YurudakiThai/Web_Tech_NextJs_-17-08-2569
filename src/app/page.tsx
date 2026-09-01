import BandsCard from "@/src/components/BandsCard";
import {bands} from "@/src/data/bandsData";
export default function Home() {
  return (
   <main >
      <br/>
      <div className="band-list" >
        {
          bands.map((item) => (
          <BandsCard key={item.id} band={item} />
          ))
        }
      </div>
    </main> 
  );
}
