// src/components/BookForm.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addBook, updateBook } from "../redux/bookSlice";

const BookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const existingBook = useSelector((state) =>
    state.books.list.find((book) => book.id === parseInt(id))
  );

  const [book, setBook] = useState(
    existingBook || {
      author: "",
      country: "",
      language: "",
      link: "",
      pages: "",
      title: "",
      year: "",
    }
  );

  useEffect(() => {
    if (existingBook) {
      setBook(existingBook);
    }
  }, [existingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingBook) {
      dispatch(updateBook({ id: existingBook.id, book }));
    } else {
      dispatch(addBook(book));
    }
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        {existingBook ? "Edit Book" : "Add New Book"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Title</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Author</label>
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Country</label>
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={book.country}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Language</label>
          <input
            type="text"
            placeholder="Language"
            name="language"
            value={book.language}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Pages</label>
          <input
            type="text"
            placeholder="Pages"
            name="pages"
            value={book.pages}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            value={book.year}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
        >
          {existingBook ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
