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
);

export const showWeatherDataSkeleton = () =>(
    {
        type: 'SHOW_WEATHERDATA_SKELETON'
    }
);

export const hideWeatherDataSkeleton = () =>(
    {
        type: 'HIDE_WEATHERDATA_SKELETON'
    }
);

export const setNewsData = (data) =>(
    {
        type: 'SET_NEWS_DATA',
        payload: data,
    }
)