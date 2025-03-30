"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Autocomplete from "./AutoComplete";
import {
  fetchCityData,
  fetchCountryData,
  fetchStateData,
} from "@/services/locationService";

export default function LocationModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (props: any) => void;
}) {
  const [formData, setFormData] = useState({
    timezone: "",
    code: "",
    latitude: "",
    longitude: "",
  });
  const [selectedCountry, setSelectedCountry] = useState<any>({});
  const [selectedState, setSelectedState] = useState<any>();
  const [selectedCity, setSelectedCity] = useState<any>();

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
    onSubmit(record);
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Location</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium">Country</label>
            <Autocomplete
              handleSelected={handleSelectedCountry}
              fetchData={fetchCountryData}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Time Zones</label>
            <select
              name="timezone"
              id="timezone"
              className="w-full p-2 border rounded"
              disabled={
                !Object.keys(selectedCountry)?.length &&
                !selectedCountry?.timezones?.length
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
              fetchData={fetchStateData}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">City</label>
            <Autocomplete
              handleSelected={handleSelectedCity}
              fetchData={fetchCityData}
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
              className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
