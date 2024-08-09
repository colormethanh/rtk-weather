import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import Panel from "./Panel";

export default function WeatherPanel() {
  const weatherData = useSelector((state) => state.locations.locations);
  
  const panels = weatherData.map((weather) => {
    return <Panel key={uuidv4()} currentWeather={weather.currentWeather} fiveDayWeather={weather.fiveDayWeather} />
  })

  return (
    <section className="container">
      <div
        className="col weather-panels text-center d-flex flex-column-reverse align-items-center"
      >
        {panels}
      </div>
    </section>
    
  )
}