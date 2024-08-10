"use client"
import { useState } from "react";
import { getWeather } from "./WeatherAPI";
import { useDispatch } from "react-redux";
import { pushLocation } from "../store/slices/locations";
import * as yup from 'yup';
import SearchBarForm from "./SearchBarForm";

const errorList = {
  apiFail: "There was error with your api",
  type: "Wrong data type"
}

export default function SearchBar() {
  const [searchErrors, setSearchErrors] = useState([]);
  const dispatch = useDispatch();

  const weatherSchema = yup 
    .object({
      id: yup.string().required(),
      name: yup.string().required(), 
      latLon: yup.object().required(), 
      currentWeather: yup.object().required(), 
      fiveDayWeather: yup.array().required()
  })

  const handleFormSubmit = async (inputText) => {

    setSearchErrors([]);

    try {
    // Get location based on city name
    const weather = await getWeather(inputText);
    
    // Validate Api data
    await weatherSchema.validate(weather);
    
    // update redux
    dispatch(pushLocation(weather));
    
    } catch (e) {
      setSearchErrors(prev => [{message: `Could not find the city ${inputText}.`,}, ...prev]);
    }
  }


  return (
    <section className="container">
      <div className="row justify-content-center">
        <div className="col col-9">
          <SearchBarForm handleFormSubmit={handleFormSubmit} apiErrors={searchErrors}/>
        </div>
      </div>
    </section>
  )
}