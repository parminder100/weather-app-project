export const setWeatherData = (data) => ({
    type: "SET_WEATHER_DATA",
    payload: data,
});

export const setWeeklyForecast = (data) =>({
    type: 'SET_WEEKLY_DATA',
    payload: data,
});

export const setHourlyForecast = (data) =>(
    {
        type: 'SET_HOURLY_DATA',
        payload: data,
    }
);

export const setUVIndex = (data) =>(
    {
        type: 'SET_UV_INDEX',
        payload: data,
    }
)