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
  function save(v: ProductDraft) {
    onSave(v);
    reset();
  }
  return (
    <form className="panel" onSubmit={handleSubmit(save)} noValidate>
      <h2>{editing ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}</h2>
      <Field label="ชื่อสินค้า" error={errors.title?.message}>
        <input required {...register("title")} aria-invalid={!!errors.title} />
      </Field>
      <Field label="ราคา" error={errors.price?.message}>
        <input
          type="number"
          step="0.01"
          required
          {...register("price", { valueAsNumber: true })}
          aria-invalid={!!errors.price}
        />
      </Field>
      <Field label="จำนวนคงเหลือ" error={errors.stock?.message}>
        <input
          type="number"
          required
          {...register("stock", { valueAsNumber: true })}
          aria-invalid={!!errors.stock}
        />
      </Field>
      <div>
        <label htmlFor="thumbnail">URL รูปภาพ</label>

        <input
          id="thumbnail"
          type="url"
          required
          {...register("thumbnail")}
          aria-invalid={!!errors.thumbnail}
          aria-describedby="thumbnail-error"
          placeholder="https://example.com/product.png"
        />

        <span id="thumbnail-error" role="alert">
          {errors.thumbnail?.message}
        </span>
      </div>

      <div>
        <label>หมวดหมู่</label>
        <select required {...register("category")} aria-invalid={!!errors.category}>
          <option value="">กรุณาเลือกหมวดหมู่</option>
          {CATEGORIES.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <span role="alert">{errors.category?.message}</span>
      </div>
      <div className="actions">
        <button disabled={!isDirty || !isValid}>{editing ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}</button>
        {editing && (
          <button type="button" className="secondary" onClick={onCancel}>
            ยกเลิก
          </button>
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
    <div>
      <label>{label}</label>
      {children}
      <span role="alert">{error}</span>
    </div>
  );
}
