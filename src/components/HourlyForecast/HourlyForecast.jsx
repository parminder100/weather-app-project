import dynamic from 'next/dynamic';
import { setHourlyForecast } from "@/app/Redux/Action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchHourlyForecast } from "@/app/Services/FetchWeatherApi/FetchWeatherApi";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Image from 'next/image';
import "../HourlyForecast/HourlyForecast.css";

const HourlyForecast = () =>{
    const dispatch = useDispatch();
    const hourlyForecastData = useSelector((state)=>state.hourlyForecast);
    const city = useSelector((state)=>state.weatherData?.name) || 'Delhi';
    const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

    useEffect(()=>{
        const getHourlyForecast = async() =>{
            try{
                const data = await FetchHourlyForecast(city);
                dispatch(setHourlyForecast(data));
                console.log(data);
            }
            catch(error){
                console.error('Error fetching hourly forecast', error);
            }
        }
        getHourlyForecast();
    },[city]);

    console.log(hourlyForecastData);

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
            'Haze': '/asset/img/haze_weather_icon.svg',
            'Fog': '/asset/img/haze_weather_icon.svg',
            'Mist': '/asset/img/haze_weather_icon.svg',
            'Smoke': '/asset/img/smoke_weather_icon.svg',
            'Clear':'/asset/img/clear_sky_weather_icon.svg',
            'Clouds':'/asset/img/clouds_weather_icon.svg',
            'Rain':'/asset/img/rain_weather_icon.svg',
            'Snow': '/asset/img/snow_weather_icon.svg',
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
            // Add responsive configurations if needed
        },
    };
    return(
        <>
            <div className='bg-[#40326a] rounded-[24px] p-[20px]'>
                <h1 className='text-[30px] text-[#fff] mb-[20px]'>Hourly Forecast</h1>
                <OwlCarousel className="owl-theme" {...owlCarouselOptions}>
                    {
                        hourlyForecastData.list && hourlyForecastData.list.map((hourlyForecast,index)=>(
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