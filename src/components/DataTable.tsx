"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import sortIcon from "@/assets/sortIcon.svg";
import editIcon from "@/assets/editIcon.svg";
import deleteIcon from "@/assets/deleteIcon.svg";
import LocationModal from "./LocationModal";

const columns = [
  { key: "id", label: "ID" },
  { key: "city", label: "City" },
  { key: "province", label: "Province" },
  { key: "country", label: "Country" },
  { key: "timezone", label: "TimeZone" },
  { key: "code", label: "Code" },
  { key: "actions", label: "Actions" },
];

export default function DataTable({
  initialData,
  totalItems,
}: {
  initialData: any;
  totalItems: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("q") || "";
  const sortBy = searchParams.get("_sort") || "id";
  const page = parseInt(searchParams.get("_page") || "1");
  const pageSize = parseInt(searchParams.get("_limit") || "5");

  const totalPages = Math.ceil(totalItems / pageSize);

  const updateQueryParams = (params: any) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.keys(params).forEach((key) => newParams.set(key, params[key]));
    router.push(`?${newParams.toString()}`);
  };

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="p-4">
      <LocationModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
      <div className="mb-8">
        <p className="text-2xl font-semibold">Data Table</p>
      </div>
      <div className="flex gap-2 mb-4 justify-between">
        <input
          type="text"
          placeholder="Search..."
          defaultValue={search}
          onChange={(e) => updateQueryParams({ q: e.target.value, _page: 1 })}
          className="border p-2 rounded w-2xl"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handleOpen}
        >
          Add Location
        </button>
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
                  <div className="flex">
                    <p>{col.label}</p>
                    <img
                      src={sortIcon.src}
                      className="h-5 ml-auto cursor-pointer"
                      onClick={() =>
                        updateQueryParams({
                          _sort: sortBy === col.key ? `-${sortBy}` : col.key,
                        })
                      }
                    />
                  </div>
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
                    {col.key === "actions" ? (
                      <div className="flex gap-2 justify-center">
                        <img
                          src={editIcon.src}
                          className="h-5 cursor-pointer"
                          //   onClick={() => {}}
                        />
                        <img
                          src={deleteIcon.src}
                          className="h-5 cursor-pointer"
                          //   onClick={() => {}}
                        />
                      </div>
                    ) : row[col.key] ? (
                      row[col.key]
                    ) : (
                      "N/A"
                    )}
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
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
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
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
