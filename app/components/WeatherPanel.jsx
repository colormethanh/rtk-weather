import { useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import Panel from "./Panel";
import { pushLocation, setDefaultLocation } from "../store/slices/locations";

export default function WeatherPanel() {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.locations);
  const currentLocation  = useSelector((state) => state.locations.currentLocation);
  
  useEffect(() => {
    // Check for currentLocation and defaultLocation and dispatch to redux
    currentLocation && dispatch(pushLocation(currentLocation));
    const defaultLocation = JSON.parse(localStorage.getItem("RTKWEATHER_DEFAULTLOCATION"));
    if (defaultLocation) {
      dispatch(setDefaultLocation(defaultLocation));
      dispatch(pushLocation(defaultLocation));
    }
  }, [currentLocation, dispatch])

  return (
    <section className="container">
      <div className="col weather-panels text-center d-flex flex-column-reverse align-items-center">
        {locations.map(location => 
          <Panel key={uuidv4()} weatherDetails={location}/>
        )}
      </div>
    </section>
  )
}