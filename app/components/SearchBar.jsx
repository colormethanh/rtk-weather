"use client"
import { useState } from "react";
import { getWeather } from "./WeatherAPI";
import { useDispatch } from "react-redux";
import { pushLocation } from "../store/slices/locations";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Error from "./ErrorMessage";

const errorList = {
  apiFail: "There was error with your api",
  type: "Wrong data type"
}

export default function SearchBar() {
  const [inputText, setInputText] = useState("");
  const [searchError, setSearchError] = useState(false);
  const dispatch = useDispatch();
  const [ errorMessage, setErrorMessage ] = useState("");
  
  // Yup schema for validation
  const formSchema = yup
    .object({
      city: yup.string().required().min(3),
  });

  const weatherSchema = yup 
    .object({
      id: yup.string().required(),
      name: yup.string().required(), 
      latLon: yup.object().required(), 
      currentWeather: yup.object().required(), 
      fiveDayWeather: yup.array().required()
    })

  // Register form validations
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  // Change state value and reset search errors
  const handleOnInputChange = (target) => {
    setSearchError(false);
    setInputText(target.value);
  };

  const handleFormSubmit = async () => {
    try {
    // Get location based on city name
    const weather = await getWeather(inputText);
    if (!weather) setErrorMessage(errorList.apiFail);
    
    await weatherSchema.validate(weather);
    
    // update redux
    dispatch(pushLocation(weather));
    
    // clear inputText
    setInputText("");
    } catch (e) {
      console.log(e.errors);
      setSearchError(true);
      setErrorMessage(errorList.type);
    }
  }


  return (
    <section className="container">
      <div className="row justify-content-center">
        <div className="col col-9">
          <form id="search-form" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-3 d-flex flex-column">
              <div className="d-flex">
                <input
                  {...register('city', {required: true})}
                  type="text"
                  id="search-input"
                  className={`form-control me-3 ${errors.city && "is-invalid"}`}
                  placeholder="Search a city"
                  value={inputText}
                  onChange={({target}) => handleOnInputChange(target)}
                  onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                />
                <button type="submit" className="btn btn-primary">Search</button>
              </div>
              {errors.city && 
                <Error message={errors.city} />      
              }
              {searchError && 
                <Error message={errorMessage} />     
              }
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}