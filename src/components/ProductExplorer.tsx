"use client";
import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import ProductSearchForm from "./ProductSearchForm";
import ProductThumbnail from "./ProductImages";
import {
  defaultQuery,
  fetchProducts,
  type Product,
  type ProductDraft,
  type ProductList,
  type SearchQuery,
} from "@/src/lib/products";
type LoadState = "loading" | "error" | "ready";
export default function ProductExplorer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<LoadState>("loading");
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  function ok(x: ProductList) {
    setProducts(x.products);
    setStatus("ready");
  }
  function bad(e: unknown) {
    setError(e instanceof Error ? e.message : "เรียกข้อมูลไม่สําเร็จ");
    setStatus("error");
  }
  async function load(q: SearchQuery) {
    setStatus("loading");
    try {
      ok(await fetchProducts(q));
    } catch (e) {
      bad(e);
    }
  }
  useEffect(() => {
    fetchProducts(defaultQuery).then(ok).catch(bad);
  }, []);
  function save(d: ProductDraft) {
    if (editing) {
      setProducts((p) => p.map((x) => (x.id === editing.id ? { ...d, id: editing.id } : x)));
      setEditing(null);
    } else setProducts((p) => [...p, { ...d, id: Date.now() }]);
  }
  function remove(id: number) {
    setProducts((p) => p.filter((x) => x.id !== id));
    if (editing?.id === id) setEditing(null);
  }
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* แถบหัวเรื่อง */}
      <header className="panel-card relative overflow-hidden bg-brand-700 !border-0 p-6 text-white shadow-lg shadow-brand-900/20 sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-500/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-brand-400/30 blur-3xl"
        />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="i-tabler-package text-4xl text-brand-200 drop-shadow" />
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Product Explorer
              </h1>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-brand-100/80">
                <span>React Hook Form + Zod + External API</span>
                <span className="hidden sm:inline">·</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ring-white/20">
                  <span className="i-tabler-palette text-sm" />
                  ตกแต่งด้วย UnoCSS
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={() => load(defaultQuery)}
            disabled={status === "loading"}
            className="btn-secondary !bg-white/10 !text-white ring-1 ring-inset ring-white/25 backdrop-blur transition hover:!bg-white/20"
          >
            <span className={`i-tabler-refresh text-base ${status === "loading" ? "animate-spin" : ""}`} />
            โหลดซ้ำ
          </button>
        </div>
      </header>

      {/* ค้นหา + ฟอร์มเพิ่ม/แก้ไข */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start">
        <div className="space-y-6">
          <ProductSearchForm onSearch={load} />

          {/* รายการสินค้า */}
          <section aria-live="polite" className="panel-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-brand-100 px-5 py-4">
              <h2 className="flex items-center gap-2 text-base font-semibold text-brand-900">
                <span className="i-tabler-shopping-bag text-brand-600 text-xl" />
                รายการสินค้า
              </h2>
              {status === "ready" && products.length > 0 && (
                <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                  {products.length} รายการ
                </span>
              )}
            </div>

            {status === "loading" && (
              <div className="flex items-center justify-center gap-3 px-5 py-14 text-brand-600">
                <span className="i-tabler-loader-2 animate-spin text-2xl" />
                <span className="text-sm font-medium">กําลังโหลดข้อมูล…</span>
              </div>
            )}
            {status === "error" && (
              <div
                role="alert"
                className="m-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <span className="i-tabler-alert-triangle mt-0.5 shrink-0 text-lg" />
                <div>
                  <p className="font-semibold">เกิดข้อผิดพลาด</p>
                  <p className="mt-0.5 text-red-600/90">{error}</p>
                </div>
              </div>
            )}
            {status === "ready" && products.length === 0 && (
              <div className="flex flex-col items-center gap-2 px-5 py-14 text-brand-900/50">
                <span className="i-tabler-box-multiple text-4xl" />
                <p className="text-sm font-medium">ไม่พบสินค้า</p>
                <p className="text-xs">ลองเปลี่ยนคําค้นหรือจํานวนรายการแล้วค้นหาใหม่</p>
              </div>
            )}
            {status === "ready" && products.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-brand-50/70 text-xs uppercase tracking-wide text-brand-700">
                      <th className="px-5 py-3 font-semibold">รูป</th>
                      <th className="px-5 py-3 font-semibold">ชื่อ</th>
                      <th className="px-5 py-3 font-semibold">ราคา</th>
                      <th className="px-5 py-3 font-semibold">คงเหลือ</th>
                      <th className="px-5 py-3 font-semibold">หมวดหมู่</th>
                      <th className="px-5 py-3 text-right font-semibold">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((x) => (
                      <tr
                        key={x.id}
                        className={`border-t border-brand-100/70 transition-colors hover:bg-brand-50/60 ${
                          editing?.id === x.id ? "bg-brand-50 ring-1 ring-inset ring-brand-300" : ""
                        }`}
                      >
                        <td className="px-5 py-3">
                          {x.thumbnail ? (
                            <ProductThumbnail src={x.thumbnail} alt={`${x.title}-${x.id}`} />
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs text-brand-900/40">
                              <span className="i-tabler-image-off" />
                              ไม่มีรูป
                            </span>
                          )}
                        </td>
                        <td className="max-w-64 px-5 py-3">
                          <span className="line-clamp-2 font-medium text-brand-900">{x.title}</span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-3 font-semibold text-brand-700">
                          ฿{x.price.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-5 py-3">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              x.stock === 0
                                ? "bg-red-100 text-red-700"
                                : x.stock <= 10
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-brand-100 text-brand-700"
                            }`}
                          >
                            <span className="i-tabler-circle-filled text-[8px]" />
                            {x.stock}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-2.5 py-0.5 text-xs font-medium text-brand-700">
                            <span className="i-tabler-tag text-sm text-brand-500" />
                            {x.category}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditing(x)}
                              className="btn-secondary !px-3 !py-1.5 !text-xs"
                            >
                              <span className="i-tabler-pencil text-sm" />
                              แก้ไข
                            </button>
                            <button onClick={() => remove(x.id)} className="btn-danger">
                              <span className="i-tabler-trash text-sm" />
                              ลบ
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>

        {/* ฟอร์มเพิ่ม/แก้ไข — อยู่ด้านขวาบนจอใหญ่ */}
        <div className="lg:sticky lg:top-6">
          <ProductForm
            key={editing?.id ?? "new"}
            editing={editing}
            onSave={save}
            onCancel={() => setEditing(null)}
          />
        </div>
      </div>

      <footer className="mt-10 pb-4 text-center text-xs text-brand-900/40">
        ข้อมูลสินค้าจาก{" "}
        <a
          href="https://dummyjson.com"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-brand-600 underline-offset-2 hover:underline"
        >
          DummyJSON
        </a>{" "}
        · สร้างด้วย Next.js, React Hook Form, Zod และ UnoCSS
      </footer>
    </main>
  );
}
