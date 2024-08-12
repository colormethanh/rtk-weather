import { v4 as uuidv4 } from "uuid";
import Graph from "./Graph";

export default function Graphs ({ fiveDayWeather }) {
  // Reduce five day weather to an object {temp: [], humidity:[], pressure:[]}.  
  const graphData = fiveDayWeather.reduce((accum, day) => {
    accum.temp ? accum.temp.push(day.temp) : accum.temp = [day.temp];
    accum.humidity ? accum.humidity.push(day.humidity) : accum.humidity = [day.humidity];
    accum.pressure ? accum.pressure.push(day.pressure) : accum.pressure = [day.pressure];
    return accum;
  }, {});

  return (
    <div className="five-day-panel row text-center">
      {Object.keys(graphData).map(key => 
        <Graph key={uuidv4()} data={graphData[key]} name={key} />
      )}
    </div>
  )
}