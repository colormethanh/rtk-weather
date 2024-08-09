import FiveDayWeather from "./FiveDayWeather";

export default function WeatherDetails ({fiveDayWeather}) {

  return (
      <>
        <div className="d-flex justify-content-evenly mb-3">
          <a data-bs-toggle="collapse" href="#collapseFiveDay" role="button" aria-expanded="false" aria-controls="collapseExample">
            Five Day Forecast
          </a>
          <a data-bs-toggle="collapse" href="#collapseGraphs" role="button" aria-expanded="false" aria-controls="collapseExample">
            Link with href
          </a>
        </div>
        <div className="collapse" id="collapseFiveDay">
          <div className="card card-body mb-3">
            <FiveDayWeather fiveDayWeather={fiveDayWeather} />
          </div>
        </div>
        <div className="collapse" id="collapseGraphs">
          <div className="card card-body mb-3">
            Weather Graphs collapse
          </div>
        </div>
      </>
  )
} 