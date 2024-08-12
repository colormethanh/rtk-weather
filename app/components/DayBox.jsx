import Image from "next/image";
import {v4 as uuidv4} from "uuid";
import { useEffect, useState } from "react";

export default function DayBox({ day }) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div key={uuidv4()} className={`five-day-box col d-flex flex-column align-items-center justify-content-between ${width <= 763 && "border-bottom"} `}> 
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
  );
}