import DataTable from "@/components/DataTable";
import { fetchData } from "@/services/dataService";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search = ((await searchParams)?.q as string) || "";
  const sortBy = ((await searchParams)?._sort as string) || "id";
  const order = ((await searchParams)?._order as string) || "asc";
  const page = parseInt((await searchParams)?._page as string) || 1;
  const pageSize = parseInt((await searchParams)?._limit as string) || 5;

  const  data = await fetchData(
    search,
    sortBy,
    order,
    page,
    pageSize
  );
  return (
    <div>
      <DataTable initialData={data} totalItems={1670} />
    </div>
  );
}
