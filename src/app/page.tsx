import BandsCard from "@/src/components/BandsCard";
import {Band} from "@/src/types/band";
import {bands} from "@/src/data/bandsData";
export default function Home() {
  return (
   <main styles = "justifyContent: 'center', flexDirection: 'column',">
      <h1>รายชื่อวงดนตรี</h1>
      <div className="band-list">
        {bands.map((item) => (
          <BandsCard key={item.id} band={item} />
        ))}
      </div>
    </main> 
  );
}
