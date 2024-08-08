"use client"

import { useState } from "react";
import { getWeather } from "./WeatherAPI";
import { useDispatch } from "react-redux";
import { pushLocation } from "../store/slices/locations";


export default function SearchBar() {
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting ", inputText);
    // todo : Validate city
    
    // Get location based on city name
    const weather = await getWeather(inputText);
    
    // update redux
    dispatch(pushLocation(weather));
  }


  return (
    <section className="container">
      <div className="row justify-content-center">
        <div className="col col-9">
          <form id="search-form" onSubmit={e => handleSubmit(e)}>
            <div className="mb-3 d-flex">
              <input
                type="text"
                id="search-input"
                className="form-control me-3"
                placeholder="Search a city"
                value={inputText}
                onChange={({target}) => setInputText(target.value)}
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </div>
          </form>
        </div>
      </div>
      <div id="weather-panel-container" className="row">
        <div
          className="col col-12 weather-panel text-center d-flex justify-content-around"
        ></div>
      </div>
    </section>
  )
}