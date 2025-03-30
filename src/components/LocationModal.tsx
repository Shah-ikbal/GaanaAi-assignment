"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Country, State, City } from "country-state-city";

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
    name: "",
    city: "",
    country: "",
    province: "",
    timezone: "",
    code: "",
    zoneName: "",
    latitude: "",
    longitude: "",
  });

  console.log(City.getAllCities());

  if (!isOpen) return null; // Don't render if modal is closed

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Location</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {/* <div className="mb-3">
            <label className="block text-sm font-medium">Country</label>
            <select
              name="country"
              id="country"
              className="border p-2 rounded w-full"
            >
              {Country.getAllCountries().map((data: any) => (
                <option value={data} key={data.isoCode}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Province</label>
            <select
              name="province"
              id="province"
              className="border p-2 rounded w-full"
            >
              {State.getAllStates().map((data: any) => (
                <option value={data} key={data.stateCode}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">City</label>
            <select name="city" id="city" className="border p-2 rounded w-full">
              {City.getAllCities().map((data: any) => (
                <option
                  value={data}
                  key={data.stateCode + data.name + data.countryCode}
                >
                  {data.name}
                </option>
              ))}
            </select>
          </div> */}
          <div className="flex justify-end gap-2">
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
