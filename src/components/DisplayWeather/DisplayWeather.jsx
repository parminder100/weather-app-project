import Header from "@/components/Header/Header";
import { FetchWeatherApi } from "../../app/Services/FetchWeatherApi/FetchWeatherApi";
import { setWeatherData } from "@/app/Redux/Action";
import { useDispatch, useSelector } from "react-redux";

const DisplayWeather = () =>{
    // const defaultCity = "delhi";
    // const defaultWeatherData = await FetchWeatherApi(defaultCity);
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
    return(
        <>
            <Header/>
            {/* {
                <p>{defaultWeatherData.name}</p>
            } */}
            {defaultWeatherData &&
                <>
                    <p>{defaultWeatherData.name}</p>
                    {defaultWeatherData.weather.map((weather)=>(
                        <div key={weather.id}>
                            <p>{weather.description}</p>
                        </div>
                    ))}
                </>
            }
        </>
    )
}
export default DisplayWeather;