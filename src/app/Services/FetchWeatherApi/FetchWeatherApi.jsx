export const FetchWeatherApi = async(city) =>{
    const apiKey = process.env.NEXT_PUBLIC_NEXT_APP_API_KEY;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`);
    const data = await response.json();
    return data;
}