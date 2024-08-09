import {v4 as uuidv4} from "uuid";
import Image from "next/image";

export default function FiveDayWeather({fiveDayWeather}) {

  const dayBoxes = fiveDayWeather.map((day) => {
    return <div key={uuidv4()} class="five-day-box col"> 
        <div class="weather-condition-sm">{day.weather}</div>
        <div class="weather-degree-sm">{day.temp}°</div>
        <Image
          src={`https://openweathermap.org/img/wn/${day.iconCode}@2x.png`}
          alt={`${day.weather} icon`}
          class="cur-weather-icon"
          width={50} height={50}
        />
        <div class="weather-day">{day.day}</div>
      </div> 
  });

  return (
    <div class="five-day-panel row flex-column flex-md-row text-center">
      {dayBoxes}
    </div>
  )
}