import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bookCar } from "../../api/carsApi";

export const bookCarThunk = createAsyncThunk(
  "booking/bookCar",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      return await bookCar(id, formData); // тепер завжди успішно
    } catch (error) {
      return rejectWithValue(error.message || "Booking failed");
    }
  }
);

const initialState = {
  formData: {
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  },
  success: false,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBooking: (state) => {
      state.success = false;
      state.error = null;
      state.formData = initialState.formData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookCarThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(bookCarThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.formData = action.payload.booking;
      })
      .addCase(bookCarThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
