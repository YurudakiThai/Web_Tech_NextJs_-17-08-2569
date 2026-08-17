import Image from "next/image";

export default function Home() {
  const siteName = "CSMJU Websit";
  const description = "ข้อความแนะนํา";
  
  return (
   <main>
    
      <h1>
        {siteName}
      </h1>
      <p>{description}</p>
      <section>
        เว็บไซด์นี้เป็นเว็บสําหรับทุกเพศทุกวัย
      </section>
      
      <div>
      </div>
    </main> 
  );
}
