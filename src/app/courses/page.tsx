import CourseCard from "@/src/components/CourseCard";
import {Course} from "@/src/types/course";
import {courses} from "@/src/data/coursesdata";
 
 
export default function CoursesPage() { 
  return ( 
    <main className="page">
      <h1>รายวิชาทั้งหมด</h1>
      <div className="course-list">
        {courses.map((item) => (
          <CourseCard key={item.id} course={item} />
        ))}
      </div>
    </main> 
  ); 
}
