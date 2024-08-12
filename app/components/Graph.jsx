import { v4 as uuidv4 } from "uuid";
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from "react-sparklines";

export default function Graph({ data, name }) {
  // calculate the rounded average of the values array
  const average = data.reduce((sum, cur) => sum + cur, 0) / data.length; 
  const roundedAverage = Math.ceil(average * 100) / 100;

  return (
    <div className="col-xs-12 col-sm-4 d-flex flex-column" key={uuidv4()}>
        {name.toUpperCase()}
        <Sparklines data={data}>
          <SparklinesLine color="blue" />
          <SparklinesReferenceLine type="avg" />
        </Sparklines>
        <span> Avg: {roundedAverage} </span>
    </div>
  )
}