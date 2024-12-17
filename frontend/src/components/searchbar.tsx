import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import handleSearch from "../functions/searchbarfetch";
interface SearchBarProps {
  setBlogs: (blogs: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setBlogs }) => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<string[]>([]);
  const token = localStorage.getItem("authtoken");

  useEffect(() => {
    const fetchTitles = async () => {
      if (!search.trim()) {
        setResult([]); // Clear results if the search query is empty
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/blogs/gettitles",
          { title: search },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResult(response.data);
      } catch (error) {
        console.error("Error fetching titles:", error);
      }
    };

    fetchTitles();
  }, [search, token]);

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      try {
        const response = await handleSearch(search);
        setBlogs(response);
      } catch (error) {
        console.error("Error during search:", error);
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearch(suggestion);
  };

  return (
    <div className="relative w-1/3">
      <div className="flex items-center bg-white rounded-full shadow-md focus-within:ring-2 focus-within:ring-blue-500">
        <FiSearch className="ml-3 text-gray-500 text-lg" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full px-4 py-2 text-black rounded-full focus:outline-none"
        />
      </div>
      {result.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-md z-10">
          {result.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
