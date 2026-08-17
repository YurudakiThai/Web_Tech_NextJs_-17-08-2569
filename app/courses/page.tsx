type Course = { 
  id: number; 
  code: string; 
  title: string; 
  credits: number; 
  isOpen: boolean; 
}; 
 
const courses: Course[] = [ 
  // นำข้อมูลรายวิชาที่สร้างไว้มาใส่ที่นี่ 
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
 
export default function CoursesPage() { 
  return ( 
    <main className="page"> 
      <h1>รายวิชาทั้งหมด</h1> 
 
      <section className="courseGrid"> 
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
