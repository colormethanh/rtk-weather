import { Sparklines, SparklinesLine, SparklinesReferenceLine } from "react-sparklines";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function Graphs ({id}) {

  // returns and an array of objects representing a weather for one day
  const fiveDayWeather = useSelector((state) => {
    return state.locations.locations.find((day) => day.id === id).fiveDayWeather
  })

  // Reduce five day weather to only an object of temp, humidity, pressure arrays.  
  const graphData = fiveDayWeather.reduce((accum, day) => {
    accum.temp ? accum.temp.push(day.temp) : accum.temp = [day.temp];
    accum.humidity ? accum.humidity.push(day.humidity) : accum.humidity = [day.humidity];
    accum.pressure ? accum.pressure.push(day.pressure) : accum.pressure = [day.pressure];
    return accum;
  }, {});

  // create graph components from temp, humidity, and pressure arrays
  const graphs = Object.keys(graphData).map((graph) => {
    // calculate the average of the values array
    const average = graphData[graph].reduce((sum, cur) => sum + cur, 0) / graphData[graph].length; 
    const roundedAverage = Math.ceil(average * 100) / 100;

    return (
      <div className="col-xs-12 col-sm-4 d-flex flex-column" key={uuidv4()}>
        {graph.toUpperCase()}
        <Sparklines data={graphData[graph]}>
          <SparklinesLine color="blue" />
          <SparklinesReferenceLine type="avg" />
        </Sparklines>
        <span> Avg: {roundedAverage} </span>
      </div>
    )
  })

  return (
    <div className="five-day-panel row text-center">
      {graphs}
    </div>
  )
}