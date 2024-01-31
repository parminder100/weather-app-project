import { createStore } from "redux";

// Initial State
const initialState = {
  weatherData: null,
  weeklyForecast: [],
  hourlyForecast:[],
  uvIndex:null,
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
  return state;
};

// Create Redux Store
const store = createStore(searchedReducer);

export default store;