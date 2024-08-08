import { createSlice, current } from "@reduxjs/toolkit";

export const locationsSlice = createSlice({
  name: "locations",
  initialState: {
    currentLocation: null,
    locations: [],
    activeLocation: null,
  },
  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    pushLocation: (state, action) => {
      state.locations.push(action.payload);
    }
  }
})

export const { setCurrentLocation, pushLocation } = locationsSlice.actions;

export default locationsSlice.reducer;