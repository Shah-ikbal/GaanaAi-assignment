const BASE_URL = "http://localhost:4000";

export async function fetchCountryData(search = "") {
  const response = await fetch(`${BASE_URL}/country?q=${search}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function fetchStateData(search = "") {
  const response = await fetch(`${BASE_URL}/state?q=${search}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function fetchCityData(search = "") {
  const response = await fetch(`${BASE_URL}/cities?q=${search}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
