import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  brand: "",
  price: "",
  mileageFrom: "",
  mileageTo: "",
  brandsOptions: [],
  loadingBrands: false,
  errorBrands: null,
};

export const fetchBrands = createAsyncThunk(
  "filters/fetchBrands",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://car-rental-api.goit.global/brands"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilterField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetFilters: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loadingBrands = true;
        state.errorBrands = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brandsOptions = action.payload;
        state.loadingBrands = false;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loadingBrands = false;
        state.errorBrands = action.payload;
      });
  },
});

export const { setFilterField, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
