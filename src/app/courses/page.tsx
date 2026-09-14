import type { Metadata } from "next";
import { courses } from "../../data/courses";
import CourseExplorer from "../../components/CourseExpolorer";

export const metadata: Metadata = {
  title: "รายวิชาทั้งหมด",
};

export default function CoursesPage() {
  return (
    <main>
      <h1>รายวิชาทั้งหมด</h1>
      <CourseExplorer initialCourses={courses} />
    </main>
  );
}
