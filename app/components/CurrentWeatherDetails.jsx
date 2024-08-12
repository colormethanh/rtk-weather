import Image from "next/image";
import { useSelector } from "react-redux";

export default function CurrentWeatherDetails({id, currentWeatherDetails}) {
  // const currentWeatherDetails = useSelector((state) => {
  //   return state.locations.locations.find((day) => day.id === id).currentWeather
  // });
  
  if (!currentWeatherDetails.name) return <h1> Could not load location! </h1>

  return (
    <div className="d-flex justify-content-around text-center"> 
    <div className="cur-weather-text d-flex flex-column justify-content-center">
      <div className="weather-degree">{currentWeatherDetails.temp}°</div>
      <div className="weather-city">{currentWeatherDetails.name}</div>
      <div className="weather-condition">{currentWeatherDetails.weather}</div>
    </div>
    <Image
      src={`https://openweathermap.org/img/wn/${currentWeatherDetails.iconCode}@2x.png`}
      alt={`${currentWeatherDetails.weather} icon`}
      width={100}
      height={100}
      priority
      className="cur-weather-icon"
    />
  </div>
  )
}