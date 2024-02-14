import dynamic from 'next/dynamic';
import haze_weather_icon from "../../../public/asset/img/haze_weather_icon.svg";
import smoke_weather_icon from "../../../public/asset/img/smoke_weather_icon.svg";
import clear_sky_weather_icon from "../../../public/asset/img/clear_sky_weather_icon.svg";
import clouds_weather_icon from "../../../public/asset/img/clouds_weather_icon.svg";
import rain_weather_icon from "../../../public/asset/img/rain_weather_icon.svg";
import snow_weather_icon from "../../../public/asset/img/snow_weather_icon.svg";
import { hideWeatherDataSkeleton, setHourlyForecast, showWeatherDataSkeleton } from "@/app/Redux/Action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchHourlyForecast } from "@/app/Services/FetchWeatherApi/FetchWeatherApi";
import HourlyForecastSkeleton from '../Skeleton/HourlyForecastSkeleton/HourlyForecastSkeleton';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Image from 'next/image';
import "../HourlyForecast/HourlyForecast.css";

const HourlyForecast = () =>{
    const dispatch = useDispatch();
    const hourlyForecastData = useSelector((state)=>state.hourlyForecast);
    const isShowingWeatherSkeleton = useSelector(state=>state.showWeatherDataSkeleton);
    const city = useSelector((state)=>state.weatherData?.name) || 'Delhi';
    const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

    useEffect(()=>{
        const getHourlyForecast = async() =>{
            try{
                const data = await FetchHourlyForecast(city);
                dispatch(setHourlyForecast(data));
                dispatch(showWeatherDataSkeleton());
                // console.log(data);
            }
            catch(error){
                console.error('Error fetching hourly forecast', error);
            }
        }
        getHourlyForecast();

        setTimeout(()=>{
            dispatch(hideWeatherDataSkeleton());
        },[]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[city]);

    // console.log(hourlyForecastData);

    const convertTemperatureKelvinToCelsius = (kelvin) =>{
        return Math.floor(kelvin - 273.15);
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
          // Initialize Owl Carousel here after the component mounts
          $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            dots: false,
            items: 5,
          });
        }
    }, [hourlyForecastData]);

    const getWeatherImages = (weatherCondition) =>{
        const weatherImage = {
            'Haze': haze_weather_icon,
            'Fog': haze_weather_icon,
            'Mist': haze_weather_icon,
            'Smoke': smoke_weather_icon ,
            'Clear':clear_sky_weather_icon,
            'Clouds':clouds_weather_icon,
            'Rain':rain_weather_icon,
            'Snow': snow_weather_icon,
        }
        return weatherImage[weatherCondition];
    }

    const getFormattedTime = (time) =>{
        const date = new Date(time * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const ampm = hours >= 12 ? 'PM' : 'AM';

        const formatedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
        return formatedTime;
    }

    const owlCarouselOptions = {
        loop: true,
        margin: 10,
        dots: false,
        items: 5,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 5, // Display 1 item on smaller screens
            },
            600: {
                items: 3, // Display 3 items on screens between 600px and 900px
            },
            900: {
                items: 5, // Display 5 items on screens larger than 900px
            }
        },
    };
    return(
        <>
            <div className='bg-[#40326a] rounded-[24px] p-[20px]'>
                <h1 className='text-[30px] text-[#fff] mb-[20px]'>Hourly Forecast</h1>
                <OwlCarousel className="owl-theme" {...owlCarouselOptions}>
                    {
                        isShowingWeatherSkeleton && (
                            <HourlyForecastSkeleton />
                        )
                    }
                    {
                        !isShowingWeatherSkeleton && hourlyForecastData.list && hourlyForecastData.list.map((hourlyForecast,index)=>(
                            <div key={index} className="item border-[1px] border-[#846ae3] rounded-[50px] text-center">
                                <div className='p-[10px]'>
                                    <p>{getFormattedTime(hourlyForecast.dt)}</p>
                                    <Image
                                        className='w-full max-w-[50px]'
                                        width={0}
                                        height={0}
                                        src={getWeatherImages(hourlyForecast.weather[0]?.main)}
                                        alt="weather-icon"
                                        priority
                                    />
                                    <p>{convertTemperatureKelvinToCelsius(hourlyForecast.main.temp)} °C</p>
                                </div>
                            </div>
                        ))
                    }
                </OwlCarousel>
            </div>
        </>
    )
}
export default HourlyForecast;