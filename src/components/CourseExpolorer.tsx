"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import type { Course } from "../types/course";
import CourseCard from "../components/CourseCard";
import CourseForm, { type CourseDraft } from "../components/CourseForm";

type CourseExplorerProps = {
  initialCourses: Course[];
};

export default function CourseExplorer({ initialCourses }: CourseExplorerProps) {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [keyword, setKeyword] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCourses(initialCourses);
  }, [initialCourses]);

  async function handleSave(draft: CourseDraft): Promise<boolean> {
    try {
      if (editingId === null) {
        const res = await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          setMessage(body?.message ?? "บันทึกไม่สำเร็จ");
          return false;
        }

        setMessage("");
        router.refresh();
        return true;
      }

      const res = await fetch(`/api/courses/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setMessage(body?.message ?? "บันทึกไม่สำเร็จ");
        return false;
      }

      setMessage("");
      setEditingId(null);
      router.refresh();
      return true;
    } catch {
      setMessage("บันทึกไม่สำเร็จ");
      return false;
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/courses/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    }
  }

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  const editingCourse = courses.find((course) => course.id === editingId);
  const searchText = keyword.trim().toLowerCase();

  const visibleCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText),
  );

  return (
    <div>
      <label htmlFor="keyword">ค้นหารายวิชา</label>
      <input id="keyword" placeholder="ค้นหารายวิชา" value={keyword} onChange={handleKeywordChange} />

      {message ? <p>{message}</p> : null}

      <CourseForm
        key={editingId ?? "new"}
        initialCourse={editingCourse}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      {visibleCourses.length === 0 ? (
        <p>ไม่พบรายวิชาที่ตรงกับคำค้น</p>
      ) : (
        visibleCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEdit={() => setEditingId(course.id)}
            onDelete={() => handleDelete(course.id)}
          />
        ))
      )}
    </div>
  );
}
