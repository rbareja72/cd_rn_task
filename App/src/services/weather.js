import { create } from 'apisauce';
import { WEATHER_API_KEY } from './../config/constants';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const api = create({
  baseURL: BASE_URL,
});

export const fetchWeather = (lat, lon) => {
  return api.get(
    '/onecall',
    {
      appid: WEATHER_API_KEY,
      lat,
      lon,
      units: 'metric',
    }
  ).then(response => Promise.resolve(response.data))
    .catch(error => Promise.reject(error));
};
