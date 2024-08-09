import Image from "next/image";
import { useSelector } from "react-redux";
import WeatherDetails from "./WeatherDetails";


export default function Panel({ id }) {
  const {temp, name, weather, iconCode} = useSelector((state) => {
    return state.locations.locations.find((day) => day.id === id).currentWeather
  })

  return (
    <div className="weather-panel row d-flex justify-content-center w-75 border">
      <div className="d-flex justify-content-around text-center"> 
        <div className="cur-weather-text d-flex flex-column justify-content-center">
          <div className="weather-degree">{temp}°</div>
          <div className="weather-city">{name}</div>
          <div className="weather-condition">{weather}</div>
        </div>
        <Image
          src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
          alt={`${weather} icon`}
          width={100}
          height={100}
          className="cur-weather-icon"
        />
        
      </div>
      <WeatherDetails id={id} />
    </div>
  )
}