"use client"
import SearchBar from './components/SearchBar';
import WeatherPanel from './components/WeatherPanel';
import { useDispatch } from 'react-redux';
import { setDefaultLocation, pushLocation } from './store/slices/locations';
import { getWeather } from './components/WeatherAPI';
import { useEffect } from 'react';


export default function Home() {
  const dispatch = useDispatch();

  const handleSetDefault = async (location) => {
    try {
      debugger
      const weatherData = await getWeather("", location);
      dispatch(setDefaultLocation(weatherData));
      dispatch(pushLocation(weatherData));
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    const defaultLocation = JSON.parse(localStorage.getItem("RTKWEATHER_DEFAULTLOCATION"));

    if (defaultLocation) {
      handleSetDefault(defaultLocation);
    };
  })

  return (
    <main>
      <SearchBar />
      <WeatherPanel />
    </main>
  )
}
