import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import type { Course } from "../types/course";

export type CourseDraftInput = {
  code: string;
  name: string;
  credit: string | number;
  instructor: string;
};

export type CourseErrors = Partial<Record<"code" | "name" | "credit", string>>;

const filePath = path.join(process.cwd(), "src", "data", "courses.json");

export async function readCourses(): Promise<Course[]> {
  try {
    const text = await readFile(filePath, "utf-8");
    return JSON.parse(text) as Course[];
  } catch {
    return [];
  }
}

export async function writeCourses(courses: Course[]): Promise<void> {
  await writeFile(filePath, JSON.stringify(courses, null, 2), "utf-8");
}

export function validateCourseDraft(input: CourseDraftInput): CourseErrors {
  const errors: CourseErrors = {};

  if (!input.code?.trim()) {
    errors.code = "กรุณาระบุรหัสวิชา";
  }

  if (!input.name?.trim()) {
    errors.name = "กรุณาระบุชื่อวิชา";
  }

  const credit = Number(input.credit);

  if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
    errors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
  }

  return errors;
}

export function toCourse(id: string, input: CourseDraftInput): Course {
  return {
    id,
    code: input.code.trim(),
    name: input.name.trim(),
    credit: Number(input.credit),
    instructor: input.instructor?.trim() ?? "",
  };
}

export async function findCourse(id: string): Promise<Course | undefined> {
  const courses = await readCourses();
  return courses.find((course) => course.id === id);
}

export async function createCourse(input: CourseDraftInput): Promise<Course> {
  const courses = await readCourses();
  const course = toCourse(randomUUID(), input);

  await writeCourses([...courses, course]);

  return course;
}

export async function updateCourse(
  id: string,
  input: CourseDraftInput,
): Promise<Course | undefined> {
  const courses = await readCourses();
  const index = courses.findIndex((course) => course.id === id);

  if (index === -1) {
    return undefined;
  }

  const updated: Course = {
    ...courses[index],
    ...toCourse(id, input),
  };

  const next = courses.map((course) => (course.id === id ? updated : course));

  await writeCourses(next);

  return updated;
}

export async function deleteCourse(id: string): Promise<boolean> {
  const courses = await readCourses();
  const next = courses.filter((course) => course.id !== id);

  if (next.length === courses.length) {
    return false;
  }

  await writeCourses(next);

  return true;
}
