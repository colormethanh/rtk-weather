import {v4 as uuidv4} from "uuid";
import DayBox from "./DayBox";

export default function FiveDayWeather({ fiveDayWeather }) {

  return (
    <div className="five-day-panel row flex-column flex-md-row text-center">
      { fiveDayWeather.map(day => 
        <DayBox key={uuidv4()} day={day} />)
      }
    </div>
  );
}