import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../redux/bookSlice";
import { Search } from "lucide-react"; // Importing search icon from lucide-react

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchBooks({ title: query }));
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded-full w-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" />
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
