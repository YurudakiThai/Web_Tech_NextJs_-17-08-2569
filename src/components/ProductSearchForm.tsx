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
    <form className="panel search" onSubmit={handleSubmit(onSearch)} noValidate>
      <div>
        <label htmlFor="q">คําค้น</label>
        <input id="q" {...register("q")} placeholder="phone" />
      </div>
      <div>
        <label htmlFor="limit">จํานวนรายการ</label>
        <input
          id="limit"
          type="number"
          required
          {...register("limit", { valueAsNumber: true })}
          aria-invalid={!!errors.limit}
        />
        <span role="alert">{errors.limit?.message}</span>
      </div>
      <div>
        <label htmlFor="sortBy">เรียงตาม</label>
        <select id="sortBy" {...register("sortBy")}>
          {SORT_FIELDS.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>
      <button disabled={isSubmitting}>{isSubmitting ? "กําลังค้นหา" : "ค้นหา"}</button>
    </form>
  );
}
