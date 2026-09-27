"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CATEGORIES,
  ProductDraftSchema,
  type Product,
  type ProductDraft,
} from "@/src/lib/products";
export default function ProductForm({
  editing,
  onSave,
  onCancel,
}: {
  editing: Product | null;
  onSave: (d: ProductDraft) => void;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    // isDirty เป็นข้อมูลที่ได้กรอก
    formState: { errors, isDirty, isValid },
  } = useForm<ProductDraft>({
    resolver: zodResolver(ProductDraftSchema),
    mode: "onTouched",
    defaultValues: editing
      ? {
        title: editing.title,
        price: editing.price,
        stock: editing.stock,
        category: editing.category,
        thumbnail: editing.thumbnail,
      }
      : { title: "", price: undefined, stock: undefined, thumbnail: "" },
  });
  const thumbnail = watch("thumbnail");
  function save(v: ProductDraft) {
    onSave(v);
    reset();
  }
  return (
    <form
      className="panel-card space-y-4 p-5 sm:p-6"
      onSubmit={handleSubmit(save)}
      noValidate
    >
      <div className="flex items-center gap-3 border-b border-brand-100 pb-4">
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
            editing ? "bg-amber-100 text-amber-700" : "bg-brand-100 text-brand-700"
          }`}
        >
          <span className={`text-xl ${editing ? "i-tabler-pencil" : "i-tabler-circle-plus"}`} />
        </span>
        <div>
          <h2 className="font-display text-lg font-semibold leading-tight text-brand-900">
            {editing ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}
          </h2>
          <p className="text-xs text-brand-900/50">
            {editing ? `กำลังแก้ไข ID ${editing.id}` : "กรอกข้อมูลสินค้าใหม่ลงด้านล่าง"}
          </p>
        </div>
      </div>

      <Field label="ชื่อสินค้า" error={errors.title?.message}>
        <input
          required
          placeholder="เช่น iPhone 15 Pro"
          className="field-input"
          {...register("title")}
          aria-invalid={!!errors.title}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="ราคา (บาท)" error={errors.price?.message}>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-brand-900/40">
              ฿
            </span>
            <input
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              className="field-input pl-7"
              {...register("price", { valueAsNumber: true })}
              aria-invalid={!!errors.price}
            />
          </div>
        </Field>

        <Field label="จํานวนคงเหลือ" error={errors.stock?.message}>
          <input
            type="number"
            required
            placeholder="0"
            className="field-input"
            {...register("stock", { valueAsNumber: true })}
            aria-invalid={!!errors.stock}
          />
        </Field>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="thumbnail" className="field-label flex items-center gap-1.5">
          <span className="i-tabler-image text-base text-brand-500" />
          URL รูปภาพ
        </label>
        <input
          id="thumbnail"
          type="url"
          required
          className="field-input"
          {...register("thumbnail")}
          aria-invalid={!!errors.thumbnail}
          aria-describedby="thumbnail-error"
          placeholder="https://example.com/product.png"
        />
        {/* พรีวิวรูปเมื่อใส่ URL ที่ดูถูกต้อง */}
        {/^https?:\/\/.+/.test(thumbnail ?? "") && !errors.thumbnail && (
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-brand-100 bg-brand-50/60 p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail}
              alt="ตัวอย่างรูปภาพ"
              className="h-12 w-12 rounded-md object-cover ring-1 ring-brand-200"
            />
            <span className="text-xs text-brand-900/50">ตัวอย่างรูปภาพ</span>
          </div>
        )}
        <span id="thumbnail-error" role="alert" className="error-text">
          {errors.thumbnail?.message}
        </span>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="category" className="field-label flex items-center gap-1.5">
          <span className="i-tabler-category-2 text-base text-brand-500" />
          หมวดหมู่
        </label>
        <select
          id="category"
          required
          className="field-input appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23176b4d%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M6 9l6 6l6 -6%22/%3E%3C/svg%3E')] bg-[length:1.1em] bg-[position:right_0.75rem_center] bg-no-repeat pr-9"
          {...register("category")}
          aria-invalid={!!errors.category}
        >
          <option value="">กรุณาเลือกหมวดหมู่</option>
          {CATEGORIES.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <span role="alert" className="error-text">
          {errors.category?.message}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-brand-100 pt-4">
        <button disabled={!isDirty || !isValid} className="btn-primary flex-1 sm:flex-none">
          <span className={`text-base ${editing ? "i-tabler-device-floppy" : "i-tabler-plus"}`} />
          {editing ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}
        </button>
        {editing && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            <span className="i-tabler-x text-base" />
            ยกเลิก
          </button>
        )}
        {!editing && isDirty && (
          <span className="ml-auto text-xs text-brand-900/40">
            {isValid ? "พร้อมบันทึก ✓" : "กรอกข้อมูลให้ครบก่อน"}
          </span>
        )}
      </div>
    </form>
  );
}
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="field-label">{label}</label>
      {children}
      <span role="alert" className="error-text">
        {error}
      </span>
    </div>
  );
}
