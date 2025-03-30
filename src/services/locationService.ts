const BASE_URL = "http://localhost:4000";

export async function fetchCountryData(search = "") {
  try {
    const response = await fetch(`${BASE_URL}/country?q=${search}`);
    if (!response.ok) {
      if (response.status === 500) {
        throw new Error("Internal Server error");
      } else {
        throw new Error("Something went wrong!");
      }
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function fetchStateData(search = "") {
  try {
    const response = await fetch(`${BASE_URL}/state?q=${search}`);
    if (!response.ok) {
      if (response.status === 500) {
        throw new Error("Internal Server error");
      } else {
        throw new Error("Something went wrong!");
      }
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCityData(search = "") {
  try {
    const response = await fetch(`${BASE_URL}/cities?q=${search}`);
    if (!response.ok) {
      if (response.status === 500) {
        throw new Error("Internal Server error");
      } else {
        throw new Error("Something went wrong!");
      }
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
