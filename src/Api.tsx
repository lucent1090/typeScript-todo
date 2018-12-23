import config from './config/config'

type Weather = {
  temp?: number,
  description?: string,
};

export type WeatherValidResult = {
  valid: boolean,
  result: Weather,
};

export type WeatherInvalidResult = {
  valid: boolean,
  error: string,
};

export type WeatherApiResult = WeatherValidResult | WeatherInvalidResult;

const TAIPEI_CITY_ID = '1668341';
const EXCEED_LIMIT_CALLS = 429;

function getWeatherApi(cityId: string): string {
  const url = `${config.weather}weather?id=${cityId}&APPID=${config.appId}&units=metric`;
  return encodeURI(url);
};

function checkStatue(response: any): Promise<any> {
  return new Promise((resolve, reject) => {
    if(!response.ok) {
      reject({valid: false, error: response.statusText});
    }

    resolve(response);
  });
};

function checkWeatherResponse(data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    if(data.cod === EXCEED_LIMIT_CALLS) {
      reject({valid: false, error: 'exceed limit of calls'});
    }

    resolve(data);
  });
};

function getWeatherApiResult(data: any): Promise<any> {
  return new Promise((resolve) => {
    const temp = data.main.temp;
    const description = data.weather[0].description;

    resolve({
      valid: true,
      result: {
        temp,
        description
      }
    });
  });
};

function readTaipeiWeather(): Promise<WeatherApiResult> {
  const endpoint = getWeatherApi(TAIPEI_CITY_ID);
  return fetch(endpoint)
    .then(checkStatue)
    .then(response => { return response.json(); })
    .then(checkWeatherResponse)
    .then(getWeatherApiResult);
};

export default { readTaipeiWeather };