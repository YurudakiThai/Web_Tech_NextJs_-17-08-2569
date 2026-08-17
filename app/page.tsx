import Image from "next/image";

export default function Home() {
  const siteName = "CSMJU Websit";
  const description = "ข้อความแนะนํา";
  const courseCount = 3;
  const isOpen: boolean = true;
  const topics: string[4] = [
    "HTML",
    "CSS",
    "TypeScript",
    "Next.js",
  ];


  return (
   <main>
    
      <h1>{siteName}</h1>
      <p>จํานวนรายวิชา : {courseCount}</p>
      <p>{description}</p>
      <section>
        เว็บไซด์นี้เป็นเว็บสําหรับทุกเพศทุกวัย
      </section>
      <p>สถานะระบบ : {isOpen ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p>
      
      <div>
        <ul>
          {topics.map((topic) => (
          <li key={topic}>{topic}</li>
          ))}
        </ul>
      </div>
    </main> 
  );
}
