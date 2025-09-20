import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCars } from "../../api/carsApi";

const initialState = {
  brands: [],
  prices: [],
  loadingBrands: false,
  errorBrands: null,
  loadingPrices: false,
  errorPrices: null,
};

export const fetchBrandsOptions = createAsyncThunk(
  "filtersOptions/fetchBrandsOptions",
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

export const fetchPricesOptions = createAsyncThunk(
  "filtersOptions/fetchPricesOptions",
  async (_, thunkAPI) => {
    try {
      const { cars } = await getCars({ page: 1, limit: 1000 });
      const prices = [...new Set(cars.map((c) => Number(c.rentalPrice)))]
        .filter(Boolean)
        .sort((a, b) => a - b);
      return prices;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const filtersOptionsSlice = createSlice({
  name: "filtersOptions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // brands
      .addCase(fetchBrandsOptions.pending, (state) => {
        state.loadingBrands = true;
        state.errorBrands = null;
      })
      .addCase(fetchBrandsOptions.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.loadingBrands = false;
      })
      .addCase(fetchBrandsOptions.rejected, (state, action) => {
        state.loadingBrands = false;
        state.errorBrands = action.payload;
      })
      // prices
      .addCase(fetchPricesOptions.pending, (state) => {
        state.loadingPrices = true;
        state.errorPrices = null;
      })
      .addCase(fetchPricesOptions.fulfilled, (state, action) => {
        state.prices = action.payload;
        state.loadingPrices = false;
      })
      .addCase(fetchPricesOptions.rejected, (state, action) => {
        state.loadingPrices = false;
        state.errorPrices = action.payload;
      });
  },
});

export default filtersOptionsSlice.reducer;
