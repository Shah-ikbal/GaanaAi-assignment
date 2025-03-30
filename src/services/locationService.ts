const BASE_URL = "http://localhost:4000";

export async function fetchCountryData(params: any) {
  try {
    let query;
    if (params?.name) {
      query = `${BASE_URL}/country?name=${params?.name}&q=${params?.search}`;
    } else {
      query = `${BASE_URL}/country?q=${params?.search}`;
    }
    const response = await fetch(query);
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

export async function fetchStateData(params: any) {
  try {
    let query;
    if (params?.name) {
      query = `${BASE_URL}/state?name=${params?.name}&countryCode=${params?.countryCode}&q=${params?.search}`;
    } else {
      query = `${BASE_URL}/state?countryCode=${params?.countryCode}&q=${params?.search}`;
    }
    const response = await fetch(query);
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

export async function fetchCityData(params: any) {
  try {
    let query;
    if (params?.name) {
      query = `${BASE_URL}/cities?name=${params?.name}&countryCode=${params?.countryCode}&stateCode=${params?.stateCode}&q=${params?.search}`;
    } else {
      query = `${BASE_URL}/cities?countryCode=${params?.countryCode}&stateCode=${params?.stateCode}&q=${params?.search}`;
    }
    const response = await fetch(query);
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
