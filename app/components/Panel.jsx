import Image from "next/image";
import { Sparklines, SparklinesLine } from "react-sparklines";

export default function Panel({currentWeather, fiveDayWeather}) {
  const {temp, name, weather, iconCode} = currentWeather;
  const tempsArray = fiveDayWeather.map(day => {
    return day.temp
  })

  return (
    <div
      className="cur-weather-panel row mb-3 d-flex justify-content-center w-75 border "
    >
      <div className="d-flex flex-row justify-content-around text-center"> 
        <div className="cur-weather-text d-flex flex-column justify-content-center">
          <div className="weather-degree">{temp}°</div>
          <div className="weather-city">{name}</div>
          <div className="weather-condition">{weather}</div>
        </div>
        {/* <Image
          src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
          alt={`${weather} icon`}
          width={100}
          height={100}
          className="cur-weather-icon"
        /> */}
        <div style={{width: "100px", height:"61.8px"}}>
          <Sparklines data={tempsArray} height={100} width={100}>
            <SparklinesLine color="blue" />
          </Sparklines>

        </div>
      </div>
    </div>
  )
}