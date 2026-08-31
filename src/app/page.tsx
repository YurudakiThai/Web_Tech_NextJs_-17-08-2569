import BandsCard from "@/src/components/BandsCard";
import {Band} from "@/src/types/band";
import {bands} from "@/src/data/bandsData";
export default function Home() {
  return (
   <main >
      <br/>
      <div className="band-list" styles = "flex: box;">
        {
          bands.map((item) => (
          <BandsCard key={item.id} band={item} />
          ))
        }
      </div>
    </main> 
  );
}
