import { createSlice } from "@reduxjs/toolkit";

export const locationsSlice = createSlice({
  name: "locations",
  initialState: {
    currentLocation: null,
    defaultLocation: null,
    locations: [],
  },
  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    pushLocation: (state, action) => {
      const locationInState = state.locations.find(itm => itm.id === action.payload.id);
      if (locationInState) return;
      state.locations.push(action.payload);
    },
    setDefaultLocation: (state, action) => {
      state.defaultLocation = action.payload; 
    }
  }
})

export const { setCurrentLocation, pushLocation, setDefaultLocation } = locationsSlice.actions;

export default locationsSlice.reducer;