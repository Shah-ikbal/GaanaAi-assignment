"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const columns = [
  { key: "id", label: "ID" },
  { key: "city", label: "City" },
  { key: "province", label: "Province" },
  { key: "country", label: "Country" },
  { key: "timezone", label: "TimeZone" },
];

export default function DataTable({
  initialData,
  totalItems,
}: {
  initialData: any;
  totalItems: any;
}) {
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("q") || "";
  const sortBy = searchParams.get("_sort") || "id";
  const order = searchParams.get("_order") || "asc";
  const page = parseInt(searchParams.get("_page") || "1");
  const pageSize = parseInt(searchParams.get("_limit") || "5");

  const totalPages = Math.ceil(totalItems / pageSize);

  const updateQueryParams = (params: any) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.keys(params).forEach((key) => newParams.set(key, params[key]));
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="p-4">
      <div className="mb-8">
        <p className="text-2xl font-semibold">Data Table</p>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          defaultValue={search}
          onChange={(e) => updateQueryParams({ q: e.target.value, _page: 1 })}
          className="border p-2 rounded"
        />
        <select
          defaultValue={sortBy}
          onChange={(e) => updateQueryParams({ _sort: e.target.value })}
          className="border p-2 rounded"
        >
          {columns.map((col) => (
            <option key={col.key} value={col.key}>
              {col.label}
            </option>
          ))}
        </select>
        <select
          defaultValue={order}
          onChange={(e) => updateQueryParams({ _order: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="flex gap-2 mb-2">
        {columns.map((col) => (
          <label key={col.key} className="flex items-center">
            <input
              type="checkbox"
              checked={visibleColumns[col.key]}
              onChange={() =>
                setVisibleColumns({
                  ...visibleColumns,
                  [col.key]: !visibleColumns[col.key],
                })
              }
              className="mr-2"
            />
            {col.label}
          </label>
        ))}
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col) =>
              visibleColumns[col.key] ? (
                <th key={col.key} className="border p-2">
                  {col.label}
                </th>
              ) : null
            )}
          </tr>
        </thead>
        <tbody>
          {initialData.map((row: any) => (
            <tr key={row.id} className="border">
              {columns.map((col) =>
                visibleColumns[col.key] ? (
                  <td key={col.key} className="border p-2">
                    {row[col.key]}
                  </td>
                ) : null
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => updateQueryParams({ _page: Math.max(1, page - 1) })}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() =>
            updateQueryParams({ _page: Math.min(page + 1, totalPages) })
          }
          disabled={page >= totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
