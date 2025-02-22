import React from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleAddBook = () => {
    navigate("/add");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
        Book Search App
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleAddBook}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition transform duration-300"
        >
          Add New Book
        </button>
      </div>

      <div className="mb-6">
        <SearchBar />
      </div>

      <div>
        <BookList />
      </div>
    </div>
  );
};

export default Home;
