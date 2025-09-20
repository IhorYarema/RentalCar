import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bookCar } from "../../api/carsApi";

// thunk
export const bookCarThunk = createAsyncThunk(
  "booking/bookCar",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await bookCar(id, formData);

      return {
        booking: {
          ...response.booking,
          bookingDate: response.booking.bookingDate
            ? new Date(response.booking.bookingDate).toISOString()
            : "",
        },
      };
    } catch (error) {
      return rejectWithValue(error.message || "Booking failed");
    }
  }
);

// state
const initialState = {
  booking: null, // збережена бронь
  success: false, // статус
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
      state.booking = null;
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
        state.booking = action.payload.booking;
      })
      .addCase(bookCarThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
