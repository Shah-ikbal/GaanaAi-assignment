import useDebounce from "@/hooks/useDebounce";
import { useState, ChangeEvent, useEffect } from "react";

const Autocomplete = ({
  handleSelected,
  fetchData,
}: {
  handleSelected: (props: any) => void;
  fetchData: any;
}) => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const queryDebounced = useDebounce(query, 300);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (queryDebounced.length > 0) {
        let countryData = await fetchData(queryDebounced);
        setFilteredSuggestions(countryData);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [queryDebounced]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setQuery(userInput);
  };

  const handleSelect = (suggestion: any) => {
    setQuery(suggestion.name);
    handleSelected(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
      {showSuggestions && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-md">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion: any, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion.name}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
