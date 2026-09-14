import { NextRequest, NextResponse } from "next/server";
import {
  createCourse,
  readCourses,
  validateCourseDraft,
  type CourseDraftInput,
} from "../../../lib/coursesRepo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const courses = await readCourses();
  return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
  try {
    const input = (await req.json()) as CourseDraftInput;
    const errors = validateCourseDraft(input);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ message: "ข้อมูลไม่ถูกต้อง", errors }, { status: 400 });
    }

    const course = await createCourse(input);

    return NextResponse.json(course, { status: 201 });
  } catch {
    return NextResponse.json({ message: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }
}
