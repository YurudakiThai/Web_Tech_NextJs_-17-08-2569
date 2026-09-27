"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SORT_FIELDS, SearchQuerySchema, defaultQuery, type SearchQuery } from "@/src/lib/products";

export default function ProductSearchForm({
  onSearch,
}: {
  onSearch: (q: SearchQuery) => Promise<void>;
}) {
  // v1
  // const {register} = useForm<SearchQuery>({defaultValues:defaultQuery,});
  //
  // v2
  // const {register,formState: {errors},} = useForm<SearchQuery>({
  //  resolver: zodResolver(SearchQuerySchema),
  //  mode: "onTouched",
  //  defaultValues: defaultQuery,
  // });

  // v3
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchQuery>({
    resolver: zodResolver(SearchQuerySchema),
    mode: "onTouched",
    defaultValues: defaultQuery,
  });
  return (
    <form className="panel-card p-5 sm:p-6" onSubmit={handleSubmit(onSearch)} noValidate>
      <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-brand-900">
        <span className="i-tabler-search text-lg text-brand-600" />
        ค้นหาสินค้า
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-end">
        <div className="space-y-1.5">
          <label htmlFor="q" className="field-label">
            คําค้น
          </label>
          <div className="relative">
            <span className="i-tabler-text-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-brand-900/35" />
            <input id="q" {...register("q")} placeholder="phone" className="field-input pl-9" />
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="limit" className="field-label">
            จํานวนรายการ
          </label>
          <input
            id="limit"
            type="number"
            required
            className="field-input"
            {...register("limit", { valueAsNumber: true })}
            aria-invalid={!!errors.limit}
          />
          <span role="alert" className="error-text block">
            {errors.limit?.message}
          </span>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="sortBy" className="field-label">
            เรียงตาม
          </label>
          <select
            id="sortBy"
            className="field-input appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23176b4d%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M6 9l6 6l6 -6%22/%3E%3C/svg%3E')] bg-[length:1.1em] bg-[position:right_0.75rem_center] bg-no-repeat pr-9"
            {...register("sortBy")}
          >
            {SORT_FIELDS.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
        <button disabled={isSubmitting} className="btn-primary h-[38px] whitespace-nowrap lg:w-auto">
          <span className={`text-base ${isSubmitting ? "i-tabler-loader-2 animate-spin" : "i-tabler-search"}`} />
          {isSubmitting ? "กําลังค้นหา" : "ค้นหา"}
        </button>
      </div>
    </form>
  );
}
