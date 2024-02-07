import Header from "@/components/Header/Header";
import { FetchUvIndex, FetchWeatherApi } from "../../app/Services/FetchWeatherApi/FetchWeatherApi";
import { setUVIndex, setWeatherData } from "@/app/Redux/Action";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import "../DisplayWeather/DisplayWeather.css";
import Image from 'next/image';
import WeeklyForecast from "../WeeklyForecast/WeeklyForecast";
import HourlyForecast from "../HourlyForecast/HourlyForecast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { faWater } from '@fortawesome/free-solid-svg-icons';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";
import Footer from "../Footer/Footer";

const DisplayWeather = () =>{
    const defaultWeatherData = useSelector(state => state.weatherData);  // Use useSelector to get data from Redux store
    const uvIndexData = useSelector(state=>state.uvIndex);

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

    const fetchuv = async() =>{
        try{
            if(defaultWeatherData && defaultWeatherData.coord){
                const uvindex = await FetchUvIndex(defaultWeatherData.coord.lat, defaultWeatherData.coord.lon);
                console.log("UV Index response:", uvindex);
                dispatch(setUVIndex(uvindex.value));
            }
        }
        catch(error){
            console.error('Error fetching uv index', error);
        }
    }

    useEffect(()=>{
        fetchuv();
    },[uvIndexData,fetchuv]);

    console.log(uvIndexData);

    // Convert temperature from kelvin to celsius
    const convertTemperatureKelvinToCelsius = (kelvin) =>{
        return Math.floor(kelvin - 273.15);
    }

    // Get local weather images based on weather
    const getWeatherImages = (weatherCondition) =>{
        const weatherImages = {
            'Haze': '/asset/img/haze_weather_icon.svg',
            'Fog': '/asset/img/haze_weather_icon.svg',
            'Mist': '/asset/img/haze_weather_icon.svg',
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
            <section className="display_weather_section pt-[100px] pb-[80px]">
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            {
                                defaultWeatherData && (
                                    <>
                                    <div className="weather-bg w-full pb-[24px] mb-[30px]">
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
                                    <Grid container spacing={2} className="mb-[30px]">
                                        <Grid item xs={6}>
                                            <div className="bg-[#37265e] border-[1px] border-[#5d47a1] rounded-[20px] p-[20px]">
                                                <div className="flex flex-row gap-[10px] items-center mb-[10px]">
                                                    <FontAwesomeIcon icon={faWind} className="text-[#9d91b5]" />
                                                    <h1 className="text-[#9d91b5] text-[18px] font-[600]">Wind</h1>
                                                </div>
                                                <p className="text-[30px] text-[#fff]">{Math.floor(defaultWeatherData.wind.speed)} Km/h</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="bg-[#37265e] border-[1px] border-[#5d47a1] rounded-[20px] p-[20px]">
                                                <div className="flex flex-row gap-[20px] items-center mb-[10px]">
                                                    <FontAwesomeIcon icon={faWater} className="text-[#9d91b5]" />
                                                    <FontAwesomeIcon icon={faTint} className="text-[#9d91b5] ml-[-27px] mt-[5px]" />
                                                    <h1 className="text-[#9d91b5] text-[18px] ml-[-8px] font-[600]">Humidity</h1>
                                                </div>
                                                <p className="text-[30px] text-[#fff]">{Math.floor(defaultWeatherData.main.humidity)} %</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            {uvIndexData && (
                                                <div className="bg-[#37265e] border-[1px] border-[#5d47a1] rounded-[20px] p-[20px]">
                                                    <div className="flex flex-row gap-[20px] items-center mb-[10px]">
                                                        <FontAwesomeIcon icon={faSun} className="text-[#9d91b5]" />
                                                        <h1 className="text-[#9d91b5] text-[18px] font-[600]">UV Index</h1>
                                                    </div>
                                                    <p className="text-[30px] text-[#fff]">{uvIndexData}</p>
                                                </div>
                                            )}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="bg-[#37265e] border-[1px] border-[#5d47a1] rounded-[20px] p-[20px]">
                                                <div className="flex flex-row gap-[20px] items-center mb-[10px]">
                                                    <FontAwesomeIcon icon={faTemperatureLow} className="text-[#9d91b5]" />
                                                    <h1 className="text-[#9d91b5] text-[18px] font-[600]">Feels Like</h1>
                                                </div>
                                                <p className="text-[30px] text-[#fff]">{defaultWeatherData.main.feels_like}</p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    </>
                                )
                            }
                            <HourlyForecast />
                        </Grid>
                        <Grid item xs={6}>
                            <WeeklyForecast />
                        </Grid>
                    </Grid>
                </Container>
            </section>
            <Footer />
        </>
    )
}
export default DisplayWeather;