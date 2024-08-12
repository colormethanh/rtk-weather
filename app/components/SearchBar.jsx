"use client"
import { useState } from "react";
import { getWeather } from "./WeatherAPI";
import { useDispatch } from "react-redux";
import { pushLocation } from "../store/slices/locations";
import SearchBarForm from "./SearchBarForm";
import useReturnDataValidation from "./useReturnDataValidation"

export default function SearchBar() {
  const [searchErrors, setSearchErrors] = useState(null);
  const dispatch = useDispatch();

  const weatherSchema = useReturnDataValidation()

  const handleFormSubmit = async (inputText) => {
    // Reset errors
    setSearchErrors(null);
    
    try {
      // Get location based on city name
      const weather = await getWeather(inputText);
      
      // Validate Api data using yup
      await weatherSchema.validate(weather);
      
      // update redux
      dispatch(pushLocation(weather));
    
    } catch (e) {
      // On validation fail set error message
      setSearchErrors({message: `Could not find the city ${inputText}.`});
    }
  }; 


  return (
    <section className="container">
      <div className="row justify-content-center">
        <div className="col col-9">
          <SearchBarForm 
            handleFormSubmit={handleFormSubmit} 
            returnDataError={searchErrors}
          />
        </div>
      </div>
    </section>
  )
}