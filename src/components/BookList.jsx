// src/components/BookList.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../redux/bookSlice";

const BookList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: books, loading, error } = useSelector((state) => state.books);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("title");
  const [dir, setDir] = useState("ASC");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchBooks({ page, sort, dir, filter }));
  }, [page, sort, dir, filter, dispatch]);

  const handleSortChange = (e) => setSort(e.target.value);
  const handleDirChange = (e) => setDir(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage((prev) => prev + 1);

  const handleEdit = (bookId) => {
    navigate(`/edit/${bookId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Book List</h1>

      {/* Sorting and Filtering Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
        <select
          onChange={handleSortChange}
          value={sort}
          className="border border-gray-300 rounded-lg p-2 shadow-sm"
        >
          <option value="title">Title</option>
          <option value="year">Year</option>
          <option value="pages">Pages</option>
        </select>
        <select
          onChange={handleDirChange}
          value={dir}
          className="border border-gray-300 rounded-lg p-2 shadow-sm"
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
        <input
          type="text"
          placeholder="Filter by author, country, language..."
          value={filter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg p-2 shadow-sm w-full"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center my-4">
          <span className="text-blue-500">Loading...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center my-4 text-red-500">
          <span>Error: {error}</span>
        </div>
      )}

      {/* Book List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="border rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 bg-white"
          >
            <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
            <p className="text-gray-700 mb-1">
              <strong>Author:</strong> {book.author}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Country:</strong> {book.country}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Language:</strong> {book.language}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Pages:</strong> {book.pages}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Year:</strong> {book.year}
            </p>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => handleEdit(book.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 shadow-md"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-lg font-bold">Page {page}</span>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
