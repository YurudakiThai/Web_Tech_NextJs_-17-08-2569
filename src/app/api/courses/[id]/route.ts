import { NextRequest, NextResponse } from "next/server";
import {
  deleteCourse,
  findCourse,
  updateCourse,
  validateCourseDraft,
  type CourseDraftInput,
} from "../../../../lib/coursesRepo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: NextRequest, { params }: Context) {
  const { id } = await params;
  const course = await findCourse(id);

  if (!course) {
    return NextResponse.json({ message: "ไม่พบรายวิชา" }, { status: 404 });
  }

  return NextResponse.json(course);
}

export async function PUT(req: NextRequest, { params }: Context) {
  try {
    const { id } = await params;
    const input = (await req.json()) as CourseDraftInput;
    const errors = validateCourseDraft(input);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ message: "ข้อมูลไม่ถูกต้อง", errors }, { status: 400 });
    }

    const course = await updateCourse(id, input);

    if (!course) {
      return NextResponse.json({ message: "ไม่พบรายวิชา" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch {
    return NextResponse.json({ message: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  const { id } = await params;
  const deleted = await deleteCourse(id);

  if (!deleted) {
    return NextResponse.json({ message: "ไม่พบรายวิชา" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
