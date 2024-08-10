import { useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import Panel from "./Panel";
import { useDispatch } from "react-redux";
import { pushLocation } from "../store/slices/locations";

export default function WeatherPanel() {
  const weatherData = useSelector((state) => state.locations.locations);
  
  const currentLocation  = useSelector((state) => state.locations.currentLocation);
  const dispatch = useDispatch();
  
  // Create panels from state
  const panels = weatherData.map((weather) => {
    return <Panel key={uuidv4()} id={weather.id} />
  })
  
  useEffect(() => {
    currentLocation && dispatch(pushLocation(currentLocation));
  }, [currentLocation, dispatch])


  return (
    <section className="container">
      <div className="col weather-panels text-center d-flex flex-column-reverse align-items-center">
        {panels}
      </div>
    </section>
    
  )
}