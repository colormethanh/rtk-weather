"use client"
import { combineReducers } from "redux";
import locationsReducer from "./slices/locations";

const rootReducer = combineReducers({
  locations: locationsReducer
});

export default rootReducer;
