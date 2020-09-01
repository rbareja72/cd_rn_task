import {
  FETCH_WEATHER_CLEAR_API_STATE,
  FETCH_WEATHER_ERROR,
  FETCH_WEATHER_PROGRESS,
  FETCH_WEATHER_SUCCESS,
} from '../types';
import { fetchCurrentWeather, fetchForecast } from '../services/weather';

export const fetchWeatherAction = (lat, long) => dispatch => {
  dispatch({ type: FETCH_WEATHER_PROGRESS });
  Promise.all([
    fetchCurrentWeather(lat, long),
    fetchForecast(lat, long),
  ]).then(([current, forecast]) => {
    dispatch({ type: FETCH_WEATHER_SUCCESS, payload: { current, forecast } });
  }).catch((error) => {
    dispatch({ type: FETCH_WEATHER_ERROR, payload: error });
  });
};

export const clearApiState = () => ({
  type: FETCH_WEATHER_CLEAR_API_STATE,
});
