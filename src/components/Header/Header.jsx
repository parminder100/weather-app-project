"use client";
import { useState, useEffect, useRef } from "react";
import { signOut } from 'next-auth/react';
import { FetchWeatherApi, FetchCountries, FecthWeatherForCountries } from "@/app/Services/FetchWeatherApi/FetchWeatherApi";
import { useDispatch, useSelector } from "react-redux";
import { setCountriesData, setHourlyForecast, setSelectedCountryWeatherData, setUVIndex, setWeatherData } from "@/app/Redux/Action";
import { setWeeklyForecast } from "@/app/Redux/Action";
import Image from 'next/image'
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from 'next/link'

const Header = () =>{
    const [searchCity, setSearchCity] = useState("");
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const dropdownRef = useRef(null);
    const CountriesData = useSelector(state => state.countriesData);
    console.log(CountriesData);
    const router = useRouter();
    const {data:session, status} = useSession();
    console.log(session);

    const theme = useTheme();
    const dispatch = useDispatch();

    const handleChange = (event) =>{
        // setSearchCity(event.target.value);
        const inputValue = event.target.value;
        setSearchCity(inputValue);
        const filtered = CountriesData.filter((country) =>
            country.name.common.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredCountries(filtered);
    }

    const handleKeyPress = async(event) =>{
        if(event.key === 'Enter'){
            const weather = await FetchWeatherApi(searchCity);
            dispatch(setWeatherData(weather));
            dispatch(setWeeklyForecast(weather));
            dispatch(setHourlyForecast(weather));
            dispatch(setUVIndex(weather.uvIndex));
            setSearchCity("");
            console.log(weather);

            setShowSearchBar(false);
        }
    }

    const handleSearchBar = () =>{
        setShowSearchBar(!showSearchBar);
    }

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push("/loginpage");
    }

    const handleDropdown = () =>{
        setShowDropdown(true); // Toggle the dropdown state
        setFilteredCountries(CountriesData); // Reset the filtered countries list
        console.log('Dropdown state:', showDropdown);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(()=>{
        const fetchCountryData = async() =>{
            try{
                const country = await FetchCountries();
                dispatch(setCountriesData(country));
                setFilteredCountries(country);
            }
            catch(error){
                console.error('Error fetching countrie', error);
            }
        }
        fetchCountryData();
    },[]);

    const handleCountryClick = async (country) => {
        try {
            const weatherData = await FecthWeatherForCountries(country.name.common);
            dispatch(setSelectedCountryWeatherData(weatherData));
            dispatch(setWeatherData(weatherData));
            setShowDropdown(false);
            setShowSearchBar(false);
            setSearchCity("");
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };
    return(
        <>
            <header className="p-[10px] flex items-center bg-[#000] fixed w-full top-[0px] z-[1000]">
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Image className="!w-[50px] h-[50px]" 
                                width={0} 
                                height={0} 
                                src="/asset/img/registered_logo.png" 
                                alt="registered_logo" 
                                layout="responsive"
                            />
                        </Grid>
                        <Grid item xs={10} className="flex items-center justify-end">
                            <ul className="flex flex-row gap-[42px] items-center text-[#fff]"
                                style={{fontFamily: theme.typography.fontFamily}}
                                >
                                <li>
                                    <div className="relative">
                                        <input type="text"
                                            value={searchCity}
                                            onChange={handleChange}
                                            onKeyPress={handleKeyPress}
                                            onClick={handleDropdown}
                                            className={`border-[1px] border-[#000] text-[#000] 
                                            pl-[15px] outline-none rounded-[8px] transition-all duration-700 
                                            ${showSearchBar ? 'w-[200px] opacity-[1]' : 'w-[0px] opacity-[0]'}`}
                                        />
                                        <FontAwesomeIcon 
                                            className={`absolute right-[5px] cursor-pointer top-[4px] transition-all duration-700
                                            ${showSearchBar ? 'text-[#000]':'text-[#fff]'}`}
                                            icon={faSearch} 
                                            onClick={handleSearchBar}
                                        />
                                        {showDropdown && (
                                            <div ref={dropdownRef} className="absolute top-[30px] h-[300px] overflow-auto left-0 z-[1000] bg-white border rounded shadow">
                                                {/* Dropdown content goes here */}
                                                {
                                                    filteredCountries.length === 0 ? (
                                                        <p className="block px-4 
                                                            py-2 text-gray-800"
                                                            >
                                                            Country not available
                                                        </p>
                                                    ):(
                                                        
                                                        filteredCountries.map((country, index) => (
                                                            <a key={index} className="block px-4 py-2 
                                                                text-gray-800 cursor-pointer hover:bg-gray-200"
                                                                onClick={() => handleCountryClick(country)} 
                                                                >
                                                                {country.name.common}
                                                            </a>
                                                        ))
                                                    )
                                                }
                                            </div>
                                        )}
                                    </div>
                                </li>
                                <li>
                                    <Link href={'/weather'} className="text-[#fff] no-underline">Home</Link>
                                </li>
                                <li>
                                    <Link href={'/aboutus'} className="text-[#fff] no-underline">About us</Link>
                                </li>
                                <li>
                                    <Link href={'/news'} className="text-[#fff] no-underline">News</Link>
                                </li>
                                <li>
                                    <Link href={'/contactus'} className="text-[#fff] no-underline">Contact us</Link>
                                </li>
                                <li>Welcome, {session?.user?.username}</li>
                                {/* <li>{session?.user?.email}</li> */}
                                <li>
                                    <button onClick={handleSignOut} className="text-[#fff] cursor-pointer bg-[#ff0000] 
                                        px-[8px] py-[5px] rounded-[8px]"
                                        >
                                        Sign Out
                                    </button>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </Container>
            </header>
        </>
    )
}
export default Header;