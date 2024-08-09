import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import Panel from "./Panel";

export default function WeatherPanel() {
  const weatherData = useSelector((state) => state.locations.locations);
  
  const panels = weatherData.map((weather) => {
    return <Panel key={uuidv4()} currentWeather={weather.currentWeather} />
  })

  return (
    <section className="container">
      <div id="weather-panel-container" className="row">
        <div
          className="col weather-panel text-center d-flex flex-column-reverse align-items-center"
        >
          {panels}
        </div>
      </div>
    </section>
    
  )
}