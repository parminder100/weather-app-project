export const setWeatherData = (data) => ({
    type: "SET_WEATHER_DATA",
    payload: data,
});

export const setWeeklyForecast = (data) =>({
    type: 'SET_WEEKLY_DATA',
    payload: data,
})