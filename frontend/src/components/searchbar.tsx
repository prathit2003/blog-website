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
        setResult([]);
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
        if (response.data.response) {
          const titles = response.data.response.map((item: { title: string }) => item.title);
          setResult(titles);
        } else {
          setResult([]);
        }
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
        console.log(response);
        setBlogs(response);
      } catch (error) {
        console.error("Error during search:", error);
      }
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    try {
      const response = await handleSearch(suggestion);
      setBlogs(response);
    } catch (error) {
      console.error("error during search:", error);
    }
  };

  return (
    <div className="relative w-1/3">
      <div className="flex items-center bg-black rounded-full shadow-md border border-white">
        <FiSearch className="ml-3 text-gray-500 text-lg" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full px-4 py-2 text-gray-400 bg-black rounded-full focus:outline-none"
        />
      </div>
      {result.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-black border border-white rounded-lg shadow-md z-10">
          {result.map((suggestion) => (
            <li
              className="px-4 py-2 text-gray-400 hover:text-blue-500 hover:before:content-['↗'] hover:before:mr-2 hover:before:text-blue-500 cursor-pointer transition-colors"
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