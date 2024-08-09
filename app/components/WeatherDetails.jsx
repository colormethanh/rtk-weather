import FiveDayWeather from "./FiveDayWeather";
import { useSelector } from "react-redux";
import Graphs from "./Graphs";


export default function WeatherDetails ({ id }) {
  const weatherData = useSelector((state) => {
    return state.locations.locations.find((day) => day.id === id)
  })

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
        <div className="collapse" id={`collapseFiveDay-${id}`}>
          <div className="card card-body mb-3">
            <FiveDayWeather id={id}/>
          </div>
        </div>
        <div className="collapse" id={`collapseGraphs-${id}`}>
          <div className="card card-body mb-3">
            <Graphs id={id} />
          </div>
        </div>
      </>
  )
} 