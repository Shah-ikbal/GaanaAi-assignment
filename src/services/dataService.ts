const BASE_URL = "http://localhost:4000";

export async function fetchData(
  search = "",
  sortBy = "id",
  order = "asc",
  page: number = 1,
  pageSize: number = 5
) {
  try {
    const response = await fetch(
      `${BASE_URL}/data?_page=${page}&_limit=${pageSize}&_sort=${sortBy}&_order=${order}&q=${search}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function createData(data: any) {
  try {
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
  } catch (error) {
    console.error(error);
  }
}

export async function updateData(id: string, data: any) {
  try {
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
  } catch (error) {
    console.error(error);
  }
}

export async function deleteData(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/data/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
