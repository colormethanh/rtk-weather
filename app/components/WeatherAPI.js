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
  const {lon, lat} = lonLatData;
  const weatherData = {}
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${APIKEY}`
  const data = await fetchData(url);
  weatherData.name = data.name;
  weatherData.temp = data.main?.temp;
  weatherData.description = data?.weather[0]?.description;
  weatherData.iconCode = data.weather[0]?.icon;
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
  let days = [];

  // Slice every chunks of 8 items from data array and append to days
  for (let i = 0; i < data.length; i += 8) {
    const chunk = data.slice(i, i + 8);
    days.push(chunk);
  };

  // Re-assign days to be an array of objects
  days = days.map((dayArr) => {
    return dayArr.reduce((accumulator, itm, dayIndex) => {
      // Total temp, pressure, humidity to be averaged later
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
        accumulator.temp = getRoundedAverage(accumulator.temp);
        accumulator.pressure = getRoundedAverage(accumulator.pressure);
        accumulator.humidity = getRoundedAverage(accumulator.humidity);
      };
      return accumulator;
    }, {"temp": 0, "pressure": 0, "humidity": 0,  "weather": "", "iconCode": "", "day":""})
  })
  return days;
};

const getWeather = async function (cityName, latLon = null) {
  let latLonData;

  // If city name is not empty getLonLat data via apiCall else create latLonObject 
  if (cityName !== "") {
    latLonData = await getLatLonData(cityName);
    if (Object.keys(latLonData).length === 0) {};
  } else {
    latLonData = {lat: latLon.lat, lon: latLon.lon}
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