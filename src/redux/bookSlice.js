import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://64.227.142.191:8080/application-test-v1.1/books";

// Fetch Books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (
    { title = "", page = 1, sort = "title", dir = "ASC", filter = "" },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(API, {
        params: {
          title,
          page,
          sort,
          DIR: dir,
          filter,
        },
      });
      return response.data;
    } catch (error) {
      // Return a detailed error message
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add Book
export const addBook = createAsyncThunk(
  "books/addBook",
  async (book, { rejectWithValue }) => {
    try {
      const response = await axios.post(API, book);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Book
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, book }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API}/${id}`, book);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    list: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      pageSize: 25,
      totalElements: 0,
    },
  },
  reducers: {
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Books
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        const { data = [], pagination = {} } = action.payload;
        state.list = data;
        state.status = "succeeded";
        state.pagination = {
          ...state.pagination,
          currentPage: pagination.currentPage || 1,
          totalPages: pagination.totalPages || 1,
          pageSize: pagination.pageSize || 25,
          totalElements: pagination.totalElements || 0,
        };
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch books.";
      })

      // Add Book
      .addCase(addBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(addBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add book.";
      })

      // Update Book
      .addCase(updateBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update book.";
      });
  },
});

export const { setPage } = bookSlice.actions;
export default bookSlice.reducer;
