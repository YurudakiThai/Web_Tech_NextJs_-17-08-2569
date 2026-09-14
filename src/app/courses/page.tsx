import type { Metadata } from "next";
import CourseExplorer from "../../components/CourseExpolorer";
import { readCourses } from "../../lib/coursesRepo";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "รายวิชาทั้งหมด",
};

export default async function CoursesPage() {
  const initialCourses = await readCourses();

  return (
    <main>
      <h1>รายวิชาทั้งหมด</h1>
      <CourseExplorer initialCourses={initialCourses} />
    </main>
  );
}
