import { createStore } from "redux";

// Initial State
const initialState = {
  weatherData: null,
  weeklyForecast: [],
  hourlyForecast:[],
  uvIndex:null,
  showWeatherDataSkeleton: true,
  newsData:null,
  countriesData: [],
  selectedCountryWeatherData: [],
};

// Reducer
const searchedReducer = (state = initialState, action) => {
  if (action.type === "SET_WEATHER_DATA") {
    console.log("Redux State updated:", { ...state, weatherData: action.payload });
    return { ...state, weatherData: action.payload };
  }
  else if(action.type === 'SET_WEEKLY_DATA'){
    console.log("Redux State updated:", { ...state, weeklyForecast: action.payload });
    return{...state, weeklyForecast:action.payload}
  }
  else if(action.type === 'SET_HOURLY_DATA'){
    return{...state, hourlyForecast:action.payload}
  }
  else if(action.type === 'SET_UV_INDEX'){
    console.log("Redux State updated:", { ...state, uvIndex: action.payload });
    return{...state, uvIndex:action.payload}
  }
  else if(action.type === 'SHOW_WEATHERDATA_SKELETON'){
    return{...state, showWeatherDataSkeleton:true }
  }
  else if(action.type === 'HIDE_WEATHERDATA_SKELETON'){
    return{...state, showWeatherDataSkeleton:false }
  }
  else if(action.type === 'SET_NEWS_DATA'){
    console.log("Redux State updated:", { ...state, newsData: action.payload });
    return{...state, newsData:action.payload }
  }
  else if(action.type === 'SET_COUNTRIES_DATA'){
    console.log("Redux State updated:", { ...state, countriesData: action.payload });
    return{...state, countriesData:action.payload}
  }
  else if (action.type === 'SET_SELECTED_COUNTRY_WEATHER_DATA') {
    console.log("Redux State updated:", { ...state, selectedCountryWeatherData: action.payload });
    return { ...state, selectedCountryWeatherData: action.payload }
  }
  return state;
};

// Create Redux Store
const store = createStore(searchedReducer);

export default store;