import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCars, getCarById } from "../../api/carsApi";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (
    { page = 1, limit = 12, brand, price, mileageFrom, mileageTo },
    thunkAPI
  ) => {
    try {
      const response = await getCars({
        page,
        limit,
        brand,
        price,
        mileageFrom,
        mileageTo,
      });
      return { cars: response.cars, totalPages: response.totalPages, page };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, thunkAPI) => {
    try {
      const response = await getCarById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    currentPage: 1,
    totalPages: 0,
    loading: false,
    error: null,
    currentCar: null,
  },
  reducers: {
    resetCars(state) {
      state.items = [];
      state.currentPage = 1;
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCars
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        const { cars, totalPages, page } = action.payload;
        if (page === 1) {
          state.items = cars;
        } else {
          cars.forEach((car) => {
            if (!state.items.find((c) => c.id === car.id)) {
              state.items.push(car);
            }
          });
        }
        state.currentPage = page;
        state.totalPages = totalPages;
        state.loading = false;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchCarById
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentCar = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCar = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCars } = carsSlice.actions;
export default carsSlice.reducer;
