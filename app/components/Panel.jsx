import WeatherDetails from "./WeatherDetails";
import CurrentWeatherDetails from "./CurrentWeatherDetails";
import { useSelector } from "react-redux";

export default function Panel({ weatherDetails}) {

  return (
    <div className="weather-panel row d-flex justify-content-center w-75 border">
      <CurrentWeatherDetails currentWeatherDetails={weatherDetails.currentWeather} />
      <WeatherDetails weatherDetails={weatherDetails} />
    </div>
  )
}