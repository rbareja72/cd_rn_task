import {
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_ERROR,
  FETCH_WEATHER_CLEAR_API_STATE,
  FETCH_WEATHER_PROGRESS,
} from './../types';
import en from '../config/en';
const INITIAL_API_STATE = {
  isSuccess: false,
  isError: false,
  message: '',
};
const INITIAL_STATE = {
  apiState: {
    ...INITIAL_API_STATE,
  },
  currentTemp: null,
  city: null,
  fiveDays: [],
  loading: false,
};

function MainReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        apiState: {
          ...state.apiState,
          isSuccess: true,
          message: en.success,
        },
        currentTemp: action.payload.current && action.payload.current.main.temp,
        city: action.payload.current && action.payload.current.name,
        fiveDays: action.payload.forecast.daily && action.payload.forecast.daily.map(temp => temp.temp.day).slice(0, 5),
        loading: false,
      };
    case FETCH_WEATHER_ERROR:
      return {
        ...state,
        apiState: {
          ...state.apiState,
          isSuccess: true,
          message: en.success,
        },
        loading: false,
      };
    case FETCH_WEATHER_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_WEATHER_CLEAR_API_STATE:
      return {
        ...state,
        apiState: {
          ...INITIAL_API_STATE,
        },
      };
    default:
      return state;
  }
}

export default MainReducer;
