import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

const getConfig = (thunkAPI) => {
  const token = thunkAPI.getState().auth?.token;
  return token ? { headers: { Authorization: `Bearer ${token}` } } : null;
};

const getLocalCart = () => {
  const cartStr = localStorage.getItem("guestCart");
  return cartStr ? JSON.parse(cartStr) : { chi_tiet: [] };
};

const saveLocalCart = (cart) => {
  localStorage.setItem("guestCart", JSON.stringify(cart));
};

export const fetchCart = createAsyncThunk("cart/fetch", async (_, thunkAPI) => {
  const config = getConfig(thunkAPI);
  if (!config) return getLocalCart();

  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Lỗi tải giỏ hàng",
    );
  }
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async (data, thunkAPI) => {
    const config = getConfig(thunkAPI);
    if (!config) {
      const cart = getLocalCart();
      const existing = cart.chi_tiet.find(
        (x) => x.san_pham_id === data.san_pham_id,
      );
      if (existing) {
        existing.so_luong += data.so_luong;
      } else {
        cart.chi_tiet.push({
          id: Date.now(),
          san_pham_id: data.san_pham_id,
          so_luong: data.so_luong,
          san_pham: data.san_pham,
        });
      }
      saveLocalCart(cart);
      thunkAPI.dispatch(fetchCart());
      return;
    }

    try {
      await axios.post(
        API_URL,
        { san_pham_id: data.san_pham_id, so_luong: data.so_luong },
        config,
      );
      thunkAPI.dispatch(fetchCart());
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Lỗi thêm vào giỏ hàng",
      );
    }
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (id, thunkAPI) => {
    const config = getConfig(thunkAPI);
    if (!config) {
      const cart = getLocalCart();
      cart.chi_tiet = cart.chi_tiet.filter((x) => x.id !== id);
      saveLocalCart(cart);
      thunkAPI.dispatch(fetchCart());
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`, config);
      thunkAPI.dispatch(fetchCart());
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Lỗi xóa khỏi giỏ hàng",
      );
    }
  },
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ id, so_luong }, thunkAPI) => {
    const config = getConfig(thunkAPI);
    if (!config) {
      const cart = getLocalCart();
      const item = cart.chi_tiet.find((x) => x.id === id);
      if (item) item.so_luong = so_luong;
      saveLocalCart(cart);
      thunkAPI.dispatch(fetchCart());
      return;
    }

    try {
      await axios.put(`${API_URL}/${id}`, { so_luong }, config);
      thunkAPI.dispatch(fetchCart());
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Lỗi cập nhật số lượng",
      );
    }
  },
);

const initialState = {
  cart: { chi_tiet: [] },
  isLoading: false,
  isError: false,
  message: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = { chi_tiet: [] };
      localStorage.removeItem("guestCart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload || { chi_tiet: [] };
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
