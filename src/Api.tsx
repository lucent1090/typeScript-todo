import config from './config/config';

interface Weather {
  temp: number | null;
  description: string | null;
}

interface WeatherValidResult {
  result: Weather;
}

interface WeatherInvalidResult {
  error: string;
}

type WeatherApiResult = WeatherValidResult | WeatherInvalidResult;

const TAIPEI_CITY_ID = '1668341';
const EXCEED_LIMIT_CALLS = 429;

function getWeatherApi(cityId: string): string {
  const url = `${config.weatherApi}?id=${cityId}&APPID=${
    config.appId
  }&units=metric`;
  return encodeURI(url);
}

function checkStatue(response: any): Promise<any> {
  if (!response.ok) {
    return Promise.reject({ error: response.statusText });
  }

  return Promise.resolve(response);
}

function checkWeatherResponse(data: any): Promise<any> {
  if (data.cod === EXCEED_LIMIT_CALLS) {
    return Promise.reject({ error: 'exceed limit of calls' });
  }

  let temp = null;
  if (data.main && data.main.temp) {
    temp = data.main.temp;
  }

  let description = null;
  if (data.weather && data.weather[0] && data.weather[0].description) {
    description = data.weather[0].description;
  }

  return Promise.resolve({
    result: {
      temp,
      description
    }
  });
}

function readTaipeiWeather(): Promise<WeatherApiResult> {
  const endpoint = getWeatherApi(TAIPEI_CITY_ID);
  return fetch(endpoint)
    .then(checkStatue)
    .then(response => {
      return response.json();
    })
    .then(checkWeatherResponse);
}

export default { readTaipeiWeather };
