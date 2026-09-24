//เก็บ Zod Schema ทุกตัว Type ที่สร้างจาก Schema และฟังก์ชันเรียก API ไว้ที่เดียว ทั้งฟอร์มและการรับข้อมูลจาก API อ้างถึงไฟล์นี้
import { z } from "zod";
export const CATEGORIES = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
] as const;
export const ProductSchema = z.object({
  id: z.number(),
  title: z.string().trim().min(1, "กรุณากรอกชื่อสินค้า"),
  price: z.number({ error: "กรุณากรอกราคา" }).min(0, "ราคาต้องไม่ติดลบ"),
  stock: z
    .number({ error: "กรุณากรอกจำนวนคงเหลือ" })
    .int("จำนวนคงเหลือต้องเป็นจำนวนเต็ม")
    .min(0, "จำนวนคงเหลือต้องไม่ติดลบ"),
  category: z.enum(CATEGORIES, { error: "กรุณาเลือกหมวดหมู่" }),
  thumbnail: z.string().url(),
});
console.log(ProductSchema);
export const ProductListSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});
export type Product = z.infer<typeof ProductSchema>;
export type ProductList = z.infer<typeof ProductListSchema>;

//เติม: Method ของ zod ที่สร้าง Schema ใหม่โดยนํา field ที่ระบุออก
export const ProductDraftSchema = ProductSchema.omit({ id: true });
export type ProductDraft = z.infer<typeof ProductDraftSchema>;

const API_BASE = "https://dummyjson.com";
export const SORT_FIELDS = ["title", "price", "stock"] as const;
export const SearchQuerySchema = z.object({
  q: z.string().trim(),
  limit: z
    .number({ error: "กรุณากรอกจำนวนรายการ" })
    .int("จำนวนรายการต้องเป็นจำนวนเต็ม")
    .min(1, "อย่างน้อย 1 รายการ")
    .max(30, "ไม่เกิน 30 รายการ"),
  sortBy: z.enum(SORT_FIELDS),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;

export const defaultQuery: SearchQuery = { q: "", limit: 10, sortBy: "title" };

export function buildProductUrl(q: SearchQuery) {
  const p = new URLSearchParams();
  console.log(q);
  p.set("q", q.q);
  p.set("limit", String(q.limit));
  p.set("sortBy", q.sortBy);
  p.set("order", "asc");
  p.set("select", "title,price,stock,category,thumbnail");
  return `${API_BASE}/products/search?${p.toString()}`;
}
console.log(buildProductUrl(defaultQuery));
export async function fetchProducts(q: SearchQuery): Promise<ProductList> {
  const r = await fetch(buildProductUrl(q));
  console.log("r= ", r);
  if (!r.ok) throw new Error(`เรียกข้อมูลไม่สำเร็จ สถานะ ${r.status}`);
  const data: unknown = await r.json();
  console.log("data =", data);
  const result = ProductListSchema.safeParse(data);
  console.log("result success", result.success);
  if (!result.success) throw new Error("รูปแบบข้อมูลที่ได้รับไม่ตรงกับที่กำหนดไว้");
  return result.data;
}
