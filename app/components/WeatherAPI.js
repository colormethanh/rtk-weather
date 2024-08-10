import { v4 as uuidv4 } from 'uuid';

const APIKEY = "deecee58f4daa55a503c09ae97c1d3ab";
const fetchData = async (url) => {
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}

const getLatLonData = async function (cityName) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKEY}`;
  const data = await fetchData(url);

  if(data.length === 0) return {};

  const {name, lat, lon} = data[0];

  return {name, lat, lon};
};

const getCurrentWeatherData = async function (lonLatData, unit="imperial") {
  const {lon, lat, name,} = lonLatData;
  const returnData = {}
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${APIKEY}`
  const data = await fetchData(url);
  returnData.name = data.name;
  returnData.temp = data.main.temp;
  const {description, icon} = data.weather[0];
  const weatherData = {...returnData, weather: description, iconCode: icon};
  return weatherData; 
};

const getFiveDayWeatherData = async function (lonLatData, units="imperial") {
  const {lon, lat, name = ""} = lonLatData;

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${APIKEY}`;
  const data = await fetchData(url);
  
  // todo: refactor formatFiveDayData function
  return formatFiveDayData(data.list);
};

const getRoundedAverage = value => Math.ceil((value / 8) * 100) / 100;


const formatFiveDayData = function (data) {
  let dateSeparatedArr = [];

  // Slice every chunks of 8 items from data array and append to dateSeperatedArr
  for (let i = 0; i < data.length; i += 8) {
    const chunk = data.slice(i, i + 8);
    dateSeparatedArr.push(chunk);
  }

  
  /**
   * Formatting logic:
   * Now that we have an array where each day is an index inside an array,
   * the goal now is to reduce each index in the day ARRAY to be a single day OBJECT
   * on every loop we += item temp to the temp of the accumulator (which is an obj), to be averaged later
   * The first index of the day is used to get the day of the week and weather condition
   * The last index of the day is used to calculated the average temp of that day
   * 
   * from: dateSeparatedArray = [[day1data, day1data, day1data], [day2data, day2data], ...]
   * to: dateSeparatedArray  = [{day1Obj}, {day2Obj}, ...]
   */
  dateSeparatedArr = dateSeparatedArr.map((dayArr) => {
    return dayArr.reduce((accumulator, itm, dayIndex) => {
      accumulator.temp += itm.main.temp;
      accumulator.pressure += itm.main.pressure;
      accumulator.humidity += itm.main.humidity;

      // get Day of week, weather icon, and weather condition
      if (dayIndex === 0) {
        const datesStrings = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const date = new Date(itm.dt_txt);
        const dayOfWk = date.getDay();
        accumulator.day = datesStrings[dayOfWk];
        accumulator.weather = itm.weather[0].description;
        accumulator.iconCode = itm.weather[0].icon;
      };

      // if item is last item of day calc avg temp;
      if (dayIndex === 7) {
        // const avgTemp = accumulator.temp / 8;
        
        // const roundedTemp = Math.ceil(avgTemp * 100) / 100;
        accumulator.temp = getRoundedAverage(accumulator.temp);
        accumulator.pressure = getRoundedAverage(accumulator.pressure);
        accumulator.humidity = getRoundedAverage(accumulator.humidity);
      };
      return accumulator;
    }, {"temp": 0, "pressure": 0, "humidity": 0,  "weather": "", "iconCode": "", "day":""})
  })
  return dateSeparatedArr;
};

const getWeather = async function (cityName = "", latLon = null) {
  let latLonData;
  if (cityName) {
    latLonData = await getLatLonData(cityName);

    if (Object.keys(latLonData).length === 0) {
      return {}
    }
  } else {
    latLonData = {lat: latLon.latitude, lon: latLon.longitude}
  }
  const currentWeatherData = await getCurrentWeatherData(latLonData);
  const FiveDayWeatherData = await getFiveDayWeatherData(latLonData);

  return {
    id: uuidv4(),
    name: currentWeatherData.name,
    latLon: latLonData,
    currentWeather: currentWeatherData,
    fiveDayWeather: FiveDayWeatherData,
  } 
}

export { getWeather }