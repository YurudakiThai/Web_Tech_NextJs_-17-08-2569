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
    <main>
      <header>
        <h1>Product Explorer</h1>
        <p>React Hook Form + Zod + External API</p>
      </header>
      <ProductSearchForm onSearch={load} />
      <button onClick={() => load(defaultQuery)} disabled={status === "loading"}>
        โหลดซ้ำ
      </button>
      <div className="products-form">
        <ProductForm
          key={editing?.id ?? "new"}
          editing={editing}
          onSave={save}
          onCancel={() => setEditing(null)}
        />
      </div>
      <section aria-live="polite">
        {status === "loading" && <p>กําลังโหลดข้อมูล</p>}
        {status === "error" && <p role="alert">{error}</p>}
        {status === "ready" && products.length === 0 && <p>ไม่พบสินค้า</p>}
        {status === "ready" && products.length > 0 && (
          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>รูป</th>
                  <th>ชื่อ</th>
                  <th>ราคา</th>
                  <th>คงเหลือ</th>
                  <th>หมวดหมู่</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {products.map((x) => (
                  <tr key={x.id}>
                    <td>
                      {x.thumbnail ? (
                        <ProductThumbnail src={x.thumbnail} alt={`${x.title}-${x.id}`} />
                      ) : (
                        <span>ไม่มีรูป</span>
                      )}
                    </td>
                    <td>{x.title}</td>
                    <td>{x.price}</td>
                    <td>{x.stock}</td>
                    <td>{x.category}</td>
                    <td className="actions">
                      <button onClick={() => setEditing(x)}>แก้ไข</button>
                      <button className="danger" onClick={() => remove(x.id)}>
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
