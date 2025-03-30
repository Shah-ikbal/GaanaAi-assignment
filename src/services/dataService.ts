const BASE_URL = "http://localhost:4000";

export async function fetchData(
  search = "",
  sortBy = "id",
  order = "asc",
  page: number = 1,
  pageSize: number = 5
) {
  const response = await fetch(
    `${BASE_URL}/data?_page=${page}&limit=${pageSize}&_sort=${sortBy}&_order=${order}&q=${search}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function createData(data: any) {
  const response = await fetch(`${BASE_URL}/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function updateData(id: string, data: any) {
  const response = await fetch(`${BASE_URL}/data/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function deleteData(id: string) {
  const response = await fetch(`${BASE_URL}/data/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
