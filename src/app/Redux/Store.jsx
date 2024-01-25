import { createStore } from "redux";

// Initial State
const initialState = {
  weatherData: null,
};

// Reducer
const searchedReducer = (state = initialState, action) => {
  if (action.type === "SET_WEATHER_DATA") {
    console.log("Redux State updated:", { ...state, weatherData: action.payload });
    return { ...state, weatherData: action.payload };
  }
  return state;
};

// Create Redux Store
const store = createStore(searchedReducer);

export default store;