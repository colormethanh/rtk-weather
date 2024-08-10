import WeatherDetails from "./WeatherDetails";
import CurrentWeatherDetails from "./CurrentWeatherDetails";


export default function Panel({ id }) {
  
  return (
    <div className="weather-panel row d-flex justify-content-center w-75 border">
      <CurrentWeatherDetails id={id} />
      <WeatherDetails id={id} />
    </div>
  )
}