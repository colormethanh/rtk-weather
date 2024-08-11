import { useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import Panel from "./Panel";
import { pushLocation, setDefaultLocation } from "../store/slices/locations";

export default function WeatherPanel() {
  const weatherData = useSelector((state) => state.locations.locations);
  const currentLocation  = useSelector((state) => state.locations.currentLocation);
  const defaultLocation = useSelector((state) => state.locations.defaultLocation);

  const dispatch = useDispatch();
  
  // Create panels from state
  const panels =  weatherData.map((weather) => {
      return <Panel key={uuidv4()} id={weather.id} />
    })
  
  useEffect(() => {
    currentLocation && dispatch(pushLocation(currentLocation));
    const storedLocation = JSON.parse(localStorage.getItem("RTKWEATHER_DEFAULTLOCATION"));
    if (storedLocation) {
      dispatch(setDefaultLocation(storedLocation));
      dispatch(pushLocation(storedLocation));
    }
  }, [currentLocation, dispatch])


  return (
    <section className="container">
      <div className="col weather-panels text-center d-flex flex-column-reverse align-items-center">
        {panels}
      </div>
    </section>
    
  )
}