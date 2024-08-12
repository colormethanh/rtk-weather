import Weather from "./Weather";
import CurrentWeather from "./CurrentWeather";

export default function Panel({ weatherDetails}) {

  return (
    <div className="weather-panel row d-flex justify-content-center w-75 border">
      <CurrentWeather currentWeatherDetails={weatherDetails.currentWeather} />
      <Weather weatherDetails={weatherDetails} />
    </div>
  )
}