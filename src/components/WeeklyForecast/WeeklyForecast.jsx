import { useState, useEffect } from "react";
import { FetchWeeklyForecast } from "@/app/Services/FetchWeatherApi/FetchWeatherApi";
import { setWeeklyForecast } from "@/app/Redux/Action";
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image';
import "../WeeklyForecast/WeeklyForecast.css";

const WeeklyForecast = () =>{
    // const [weeklyForecast, setWeeklyForecast] = useState([]);
    const dispatch = useDispatch();
    const weeklyForecast = useSelector((state)=>state.weeklyForecast);
    const city = useSelector((state)=>state.weatherData?.name) || 'Delhi';

    useEffect(()=>{
        const getWeeklyForecast = async()=>{
            try{
                const data = await FetchWeeklyForecast(city);
                // setWeeklyForecast(data);
                dispatch(setWeeklyForecast(data));
                console.log(data);
            }
            catch(error){
                console.error('Error fetching weekly data', error);
            }
        }
        getWeeklyForecast();
    },[city])

    const getWeatherImages = (weatherCondition) =>{
        const weatherImage = {
            'Haze': '/asset/img/haze_weather_icon.svg',
            'Smoke': '/asset/img/smoke_weather_icon.svg',
            'Clear':'/asset/img/clear_sky_weather_icon.svg',
            'Clouds':'/asset/img/clouds_weather_icon.svg',
            'Rain':'/asset/img/rain_weather_icon.svg',
            'Snow': '/asset/img/snow_weather_icon.svg',
        }
        return weatherImage[weatherCondition]
    }

    console.log(weeklyForecast.list);

    const convertTemperatureKelvinToCelsius = (kelvin) =>{
        return Math.floor(kelvin - 273.15);
    }

    const getDayName = (index) =>{
        if(index === 0){
            return 'Today';
        }

        const today =  new Date();
        today.setDate(today.getDate() + index);
        console.log(today);

        return today.toLocaleDateString('en-Us',{weekday: 'long'});
    } 
    return(
        <>
            <div className="bg-[#40326a] p-[30px] rounded-[24px]">
                <h1 className="text-[#fff] text-[30px] font-[600]">Weekly Forecast</h1>
                {
                    weeklyForecast.list && weeklyForecast.list.slice(0,7).map((forecast,index)=>(
                        <>
                            <div className="weekly-data" key={index}>
                                <div className="flex flex-row justify-between items-center text-[#fff]">
                                    <p>{getDayName(index)}</p>
                                    <Image
                                        className="w-full max-w-[100px]" 
                                        src={getWeatherImages(forecast.weather[0]?.main)}
                                        width={0}
                                        height={0}
                                        alt="weather-icon"
                                    />
                                    <p>{forecast.weather[0]?.main}</p>
                                    <p>{convertTemperatureKelvinToCelsius(forecast.main.temp)} °C</p>
                                </div>
                                <div className="data-divider"></div>
                            </div>
                        </>
                    ))
                }
            </div>
        </>
    )
}
export default WeeklyForecast;