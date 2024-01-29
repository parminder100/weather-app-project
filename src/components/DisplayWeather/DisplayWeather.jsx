import Header from "@/components/Header/Header";
import { FetchWeatherApi } from "../../app/Services/FetchWeatherApi/FetchWeatherApi";
import { setWeatherData } from "@/app/Redux/Action";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import "../DisplayWeather/DisplayWeather.css";
import Image from 'next/image';
import WeeklyForecast from "../WeeklyForecast/WeeklyForecast";

const DisplayWeather = () =>{
    const defaultWeatherData = useSelector(state => state.weatherData);  // Use useSelector to get data from Redux store

    const dispatch = useDispatch();

    // Fetch default weather data for Delhi when the component is rendered
    const fetchDefaultWeather = async () => {
        const defaultCity = 'delhi';
        const defaultWeather = await FetchWeatherApi(defaultCity);
        dispatch(setWeatherData(defaultWeather));
    };

    // Check if defaultWeatherData is undefined and fetch default data
    if (!defaultWeatherData) {
        fetchDefaultWeather();
    }
    console.log(defaultWeatherData);

    // Convert temperature from kelvin to celsius
    const convertTemperatureKelvinToCelsius = (kelvin) =>{
        return Math.floor(kelvin - 273.15);
    }

    // Get local weather images based on weather
    const getWeatherImages = (weatherCondition) =>{
        const weatherImages = {
            'Haze': '/asset/img/haze_weather_icon.svg',
            'Smoke': '/asset/img/smoke_weather_icon.svg',
            'Clear':'/asset/img/clear_sky_weather_icon.svg',
            'Clouds':'/asset/img/clouds_weather_icon.svg',
            'Rain':'/asset/img/rain_weather_icon.svg',
            'Snow': '/asset/img/snow_weather_icon.svg',
        }
        return weatherImages[weatherCondition];
    }
    return(
        <>
            <Header/>
            <section className="pt-[100px]">
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            {
                                defaultWeatherData && (
                                    <div className="weather-bg w-full pb-[24px]">
                                        <div className="flex flex-row gap-[50px] justify-between items-start">
                                            <div className="ml-[30px] pt-[40px]">
                                                <p className="text-[#fff] font-[500] text-[100px]">{convertTemperatureKelvinToCelsius(defaultWeatherData.main.temp)} °C</p>
                                                <div className="flex flex-row items-center gap-[20px]">
                                                    <p className="text-[25px] text-[#EBEBF5] opacity-[0.6]">H:{convertTemperatureKelvinToCelsius(defaultWeatherData.main.temp_max)} °C</p>
                                                    <p className="text-[25px] text-[#EBEBF5] opacity-[0.6]">L:{convertTemperatureKelvinToCelsius(defaultWeatherData.main.temp_min)} °C</p>
                                                </div>
                                            </div>
                                            <div>
                                                <Image className="w-full min-w-[200px]"
                                                    width={0}
                                                    height={0}
                                                    src={getWeatherImages(defaultWeatherData.weather[0]?.main)}
                                                    alt="weather_icon"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-between text-[18px] text-[#fff] ml-[30px] mr-[30px] mt-[20px]">
                                            <p>{defaultWeatherData.name}, {defaultWeatherData.sys.country}</p>
                                            <p>{defaultWeatherData.weather[0].main}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </Grid>
                        <Grid item xs={6}>
                            <WeeklyForecast />
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </>
    )
}
export default DisplayWeather;