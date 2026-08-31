import Image from "next/image";

export default function Home() {
  const siteName = "CSMJU Websit";
  const description = "ข้อความแนะนํา";
  const courseCount = 3;
  const isOpen: boolean = true;

  // Array and map()
  const topics: string[] = [
    "HTML",
    "CSS",
    "TypeScript",
    "Next.js",
  ];

  // Object And Type
  type Course = {
    id: number;
    code: string;
    title: string;
    credits: number;
    isOpen: boolean;

  };

  const course: Course = {
    id: 1 ,
    code: "103011231",
    title: "Web Technology",
    credits: 3,
    isOpen: true,

  };

  //Array ของ Object
  const courses: Course[] = [
    {
      id: 1,
      code: "10301231",
      title: "Web Technology",
      credits: 3,
      isOpen: true,
    },
    {
      id: 2, 
      code: "10301232", 
      title: "Database Systems", 
      credits: 3, 
      isOpen: false,
    },
    {
      id: 3,
      code: "6804101333",
      title: "Thanakrit Na Lumphun",
      credits: 3,
      isOpen: true,
    }
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
      <section>
        <article  key = {course.id} > 
          <h2>{course.title}</h2>
          <p>รหัสวิชา : {course.code}</p>
          <p>{course.credits} หน่วยกิต</p>
          <p>{course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p>
        </article>
      </section>
      <section className = "courseGrid">
        {courses.map ((course) => (
        <article key= {course.id} className = "courseGrid">
            <h2>{course.title}</h2>
            <p>รหัสวิชา: {course.code}</p>
            <p>{course.credits} หน่วยกิต</p>
            <p>{course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p>
        </article>
        ))}
      </section>
    </main> 
  );
}
