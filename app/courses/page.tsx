type Course = { 
  id: number; 
  code: string; 
  title: string; 
  credits: number; 
  isOpen: boolean; 
}; 
 
const courses: Course[] = [ 
  // นำข้อมูลรายวิชาที่สร้างไว้มาใส่ที่นี่ 
]; 
 
export default function CoursesPage() { 
  return ( 
    <main className="page"> 
      <h1>รายวิชาทั้งหมด</h1> 
 
      <section className="courseGrid"> 
        {/* นำส่วน map() ที่ทำสำเร็จแล้วมาใส่ที่นี่ */} 
      </section> 
    </main> 
  ); 
}
