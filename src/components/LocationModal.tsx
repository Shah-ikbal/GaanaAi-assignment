"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Autocomplete from "./AutoComplete";
import {
  fetchCityData,
  fetchCountryData,
  fetchStateData,
} from "@/services/locationService";
import Loader from "./Loader";

export default function LocationModal({
  isOpen,
  onClose,
  onSubmit,
  type,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any, type: "Add" | "Edit") => void;
  type: "Add" | "Edit";
  data?: any;
}) {
  const [formData, setFormData] = useState({
    timezone: "",
    code: "",
    latitude: "",
    longitude: "",
  });
  const [selectedCountry, setSelectedCountry] = useState<any>({ name: "" });
  const [selectedState, setSelectedState] = useState<any>({ name: "" });
  const [selectedCity, setSelectedCity] = useState<any>({ name: "" });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setFormData({ ...formData, code: data?.code });
      setSelectedCountry({ name: data?.country });
      prefetchData();
    }
  }, [data]);

  const reset = () => {
    setSelectedCountry({ name: "" });
    setSelectedCity({ name: "" });
    setSelectedState({ name: "" });
    setFormData({
      timezone: "",
      code: "",
      latitude: "",
      longitude: "",
    });
  };

  useEffect(() => {
    if (type === "Add") {
      reset();
    }
  }, []);

  console.log(formData, "formdata");

  if (!isOpen) return null; // Don't render if modal is closed

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let record = {
      id: selectedCity?.countryCode + selectedCity?.stateCode,
      name: selectedCity?.name,
      city: selectedCity?.name,
      country: selectedCountry?.name,
      alias: [],
      regions: [],
      coordinates: [formData.latitude, formData.longitude],
      province: selectedState?.name,
      timezone: formData.timezone,
      unlocs: [selectedCity?.countryCode + selectedCity?.stateCode],
      code: formData.code,
    };
    onSubmit(record, type);
    onClose();
  };

  const handleSelectedCountry = (country: any) => {
    setSelectedCountry(country);
    if (country?.timezones?.length) {
      setFormData({
        ...formData,
        timezone: country?.timezones[0].zoneName,
      });
    }
  };

  const handleSelectedState = (state: any) => {
    setSelectedState(state);
  };

  const handleSelectedCity = (city: any) => {
    setSelectedCity(city);
    setFormData({
      ...formData,
      latitude: city?.latitude,
      longitude: city?.longitude,
    });
  };

  const fetchCountries = async (search = "") => {
    return fetchCountryData({ search });
  };

  const fetchStates = async (search = "") => {
    return fetchStateData({ search, countryCode: selectedCountry?.isoCode });
  };

  const fetchCities = async (search = "") => {
    return fetchCityData({
      search,
      stateCode: selectedState?.isoCode,
      countryCode: selectedCountry?.isoCode,
    });
  };

  const prefetchData = async () => {
    setLoading(true);
    let countryResponse: any = await fetchCountryData({
      name: data?.country,
      search: "",
    });
    let stateResponse: any = await fetchStateData({
      name: data?.province,
      countryCode: countryResponse[0]?.isoCode,
      search: "",
    });
    let cityResponse: any = await fetchCityData({
      name: data?.name,
      stateCode: stateResponse[0]?.isoCode,
      countryCode: countryResponse[0]?.isoCode,
      search: "",
    });
    handleSelectedCountry(countryResponse[0]);
    handleSelectedState(stateResponse[0]);
    handleSelectedCity(cityResponse[0]);
    setFormData({ ...formData, code: data?.code });
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{type} Location</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium">Country</label>
            <Autocomplete
              handleSelected={handleSelectedCountry}
              fetchData={fetchCountries}
              fieldName={selectedCountry}
              setFieldName={setSelectedCountry}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Time Zones</label>
            <select
              name="timezone"
              id="timezone"
              className="w-full p-2 border rounded disabled:bg-gray-200 disabled:cursor-not-allowed"
              disabled={
                !selectedCountry.name && !selectedCountry?.timezones?.length
              }
              value={formData.timezone}
              onChange={handleChange}
            >
              {selectedCountry?.timezones?.map((zone: any, idx: number) => (
                <option value={zone.zoneName} key={idx}>
                  {zone.zoneName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Province</label>
            <Autocomplete
              handleSelected={handleSelectedState}
              fetchData={fetchStates}
              disabled={!selectedCountry?.name}
              fieldName={selectedState}
              setFieldName={setSelectedState}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">City</label>
            <Autocomplete
              handleSelected={handleSelectedCity}
              fetchData={fetchCities}
              disabled={!selectedState?.name}
              fieldName={selectedCity}
              setFieldName={setSelectedCity}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Code</label>
            <input
              type="number"
              name="code"
              min={0}
              value={formData.code}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
              disabled={
                !selectedCountry?.name ||
                !selectedCity?.name ||
                !selectedState?.name
              }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
