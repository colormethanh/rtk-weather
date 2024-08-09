import { Sparklines, SparklinesLine } from "react-sparklines";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function Graphs ({id}) {
  const fiveDayWeather = useSelector((state) => {
    return state.locations.locations.find((day) => day.id === id).fiveDayWeather
  })

  const graphData = {};

  fiveDayWeather.forEach(day => {
    graphData.temp ? graphData.temp.push(day.temp) : graphData.temp = [day.temp];
    graphData.humidity ? graphData.humidity.push(day.humidity) : graphData.humidity = [day.humidity];
    graphData.pressure ? graphData.pressure.push(day.pressure) : graphData.pressure = [day.pressure];
  })

  const graphs = Object.keys(graphData).map((graph) => {
    return (
      <div className="col-xs-12 col-sm-4 d-flex flex-column" key={uuidv4()}>
        {graph}
        <Sparklines data={graphData[graph]}>
          <SparklinesLine color="blue" />
        </Sparklines>
      </div>
    )
  })

  return (
    <div className="five-day-panel row text-center">
      {graphs}
    </div>
  )
}