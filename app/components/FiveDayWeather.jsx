import {v4 as uuidv4} from "uuid";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function FiveDayWeather({ fiveDayWeather }) {

  const dayBoxes = fiveDayWeather.map((day) => {
    return <div key={uuidv4()} className="five-day-box col"> 
        <div className="weather-condition-sm">{day.weather}</div>
        <div className="weather-degree-sm">{day.temp}°</div>
        <Image
          src={`https://openweathermap.org/img/wn/${day.iconCode}@2x.png`}
          alt={`${day.weather} icon`}
          className="cur-weather-icon"
          width={50} height={50}
        />
        <div className="weather-day">{day.day}</div>
      </div> 
  });

  return (
    <div className="five-day-panel row flex-column flex-md-row text-center">
      {dayBoxes}
    </div>
  )
}