import FiveDayWeather from "./FiveDayWeather";
import { useSelector, useDispatch } from "react-redux";
import { setDefaultLocation } from "../store/slices/locations";
import Graphs from "./Graphs";
import Modal from "./Modal";


export default function WeatherDetails ({ id }) {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => {
    return state.locations.locations.find((day) => day.id === id)
  });

  if (!weatherData) return <h1> Could not find weather data </h1>


  return (
      <>
        <div className="d-flex justify-content-evenly mb-3">
          <a data-bs-toggle="collapse" href={`#collapseFiveDay-${id}`} role="button" aria-expanded="false" aria-controls={`collapseFiveDay-${id}`}>
            Five Day Forecast
          </a>
          <a data-bs-toggle="collapse" href={`#collapseGraphs-${id}`} role="button" aria-expanded="false" aria-controls={`collapseGraphs-${id}`}>
            Five Day Graphs
          </a>
        </div>
        <div className="accordion" id={`accordion-${id}`}>
          <div className="collapse" id={`collapseFiveDay-${id}`} data-bs-parent={`#accordion-${id}`}>
            <div className="card card-body mb-3">
              <FiveDayWeather id={id} />
            </div>
          </div>
          <div className="collapse" id={`collapseGraphs-${id}`} data-bs-parent={`#accordion-${id}`}>
            <div className="card card-body mb-3">
              <Graphs id={id} />
            </div>
          </div>
        </div>
      <div className="text-start"> 
      <Modal
        action={() =>{
          localStorage.setItem("RTKWEATHER_DEFAULTLOCATION", JSON.stringify(weatherData))
          dispatch(setDefaultLocation(weatherData))
        }} 
        text={"set Default"}
        title={"Set as default location?"}
        body={`Would you like to set "${weatherData.name}" location as your default location?`}
        closeText="No"
        submitText="Yes please!"
      />        
      </div>
      </>
  )
} 