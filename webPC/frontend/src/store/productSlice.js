import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (queryParams, { rejectWithValue }) => {
    try {
      let url = `${API_URL}?page=${queryParams?.page || 1}&limit=${queryParams?.limit || 12}`;
      if (queryParams?.search) url += `&search=${queryParams.search}`;
      if (queryParams?.category) url += `&category=${queryParams.category}`;
      if (queryParams?.sort) url += `&sort=${queryParams.sort}`;

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tải sản phẩm",
      );
    }
  },
);

// Fetch single product
export const fetchProductDetails = createAsyncThunk(
  "products/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tải sản phẩm",
      );
    }
  },
);

const initialState = {
  products: [],
  productDetails: null,
  pagination: {},
  isLoading: false,
  isError: false,
  message: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // fetch one
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { clearProductDetails } = productSlice.actions;
export default productSlice.reducer;
