"use client"

import { useState } from "react";
import { getWeather } from "./WeatherAPI";
import { useDispatch } from "react-redux";
import { pushLocation } from "../store/slices/locations";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


export default function SearchBar() {
  const [inputText, setInputText] = useState("");
  const [searchError, setSearchError] = useState(false);
  const dispatch = useDispatch();
  yup.setLocale({
    mixed: {
      required: 'Required Field',
    },
  });
  const weatherSchema = yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
      latLon: yup.object().required(),
      currentWeather: yup.object().required(),
      fiveDayWeather: yup.array().required()
  });
  const formSchema = yup
  .object({
    city: yup.string().required().min(5),
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  const handleFormSubmit = async () => {
    console.log(errors)
    console.log("submitting ", inputText);
    // Get location based on city name
    const weather = await getWeather(inputText);
    console.log(weather)

    // Validate results
    if (Object.keys(weather).length === 0) {
      setSearchError(true);
      return;
    } else {
      setSearchError(false);
    }
    
    // update redux
    dispatch(pushLocation(weather));
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
                  onChange={({target}) => setInputText(target.value)}
                />
                <button type="submit" className="btn btn-primary">Search</button>
              </div>
              {errors.city && 
                <div className="text-danger">
                    <p>{errors.city.message}</p>
                </div>      
              }
              {searchError && 
                <div className="text-danger">
                    <p>{`Could not find weather data for city ${inputText}! :( try again`}</p>
                </div>      
              }

            </div>
          </form>
        </div>
      </div>
    </section>
  )
}