import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findCourse } from "../../../lib/coursesRepo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await findCourse(id);

  return {
    title: course ? course.name : "ไม่พบรายวิชา",
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = await findCourse(id);

  if (!course) {
    notFound();
    return null;
  }

  return (
    <article>
      <h1>{course.name}</h1>
      <p>รหัสวิชา {course.code}</p>
      <p>หน่วยกิต {course.credit}</p>
      <p>ผู้สอน {course.instructor}</p>
      <Link href="/courses">กลับ</Link>
    </article>
  );
}
