"use client";
import { useState, useEffect, useRef } from "react";
import registered_logo from "../../../public/asset/img/registered_logo.png"
import { signOut } from 'next-auth/react';
import { FetchWeatherApi, FetchCountries, FetchWeatherForCountries } from "@/app/Services/FetchWeatherApi/FetchWeatherApi";
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
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from 'next/link'

const Header = () =>{
    const [searchCity, setSearchCity] = useState("");
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showMobileSearchBar, setShowMobileSearchBar] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileDropdown, setShowMobileDropdown] = useState(false);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [filteredMobileCountries, setFilteredMobileCountries] = useState([]);
    const [toggleSidebar, setToggleSidebar] = useState(false);

    const dropdownRef = useRef(null);
    const mobileDropdownRef = useRef(null);
    const CountriesData = useSelector(state => state.countriesData);
    // console.log(CountriesData);
    const router = useRouter();
    const {data:session, status} = useSession();
    // console.log(session);

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

    const handleMobileChange = (event) =>{
        // setSearchCity(event.target.value);
        const inputValue = event.target.value;
        setSearchCity(inputValue);
        const filtered = CountriesData.filter((country) =>
            country.name.common.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredMobileCountries(filtered);
    }

    const handleKeyPress = async(event) =>{
        if(event.key === 'Enter'){
            const weather = await FetchWeatherApi(searchCity);
            dispatch(setWeatherData(weather));
            dispatch(setWeeklyForecast(weather));
            dispatch(setHourlyForecast(weather));
            dispatch(setUVIndex(weather.uvIndex));
            setSearchCity("");
            // console.log(weather);

            setShowSearchBar(false);
        }
    }

    const handleMobileKeyPress = async(event) =>{
        if(event.key === 'Enter'){
            const weather = await FetchWeatherApi(searchCity);
            dispatch(setWeatherData(weather));
            dispatch(setWeeklyForecast(weather));
            dispatch(setHourlyForecast(weather));
            dispatch(setUVIndex(weather.uvIndex));
            setSearchCity("");
            // console.log(weather);

            setShowMobileSearchBar(false);
        }
    }

    const handleSearchBar = () =>{
        setShowSearchBar(!showSearchBar);
    }

    const handleMobileSearchBar = () =>{
        setShowMobileSearchBar(!showMobileSearchBar);
    }

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push("/loginpage");
    }

    const handleDropdown = () =>{
        setShowDropdown(true); // Toggle the dropdown state
        if(!showDropdown){
            setFilteredCountries(CountriesData); // Reset the filtered countries list
        }
        // console.log('Dropdown state:', showDropdown);
    }

    const handleMobileDropdown = () =>{
        setShowMobileDropdown(true); // Toggle the dropdown state
        if(!showMobileDropdown){
            setFilteredMobileCountries(CountriesData); // Reset the filtered countries list
        }
        // console.log('Dropdown state:', showMobileDropdown);
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

    useEffect(() => {
        function handleMobileClickOutside(event) {
            if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
                setShowMobileDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleMobileClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleMobileClickOutside);
        };
    }, []);

    useEffect(()=>{
        const fetchCountryData = async() =>{
            try{
                const country = await FetchCountries();
                // console.log(country);
                dispatch(setCountriesData(country));
                setFilteredCountries(country);
            }
            catch(error){
                console.error('Error fetching countrie', error);
            }
        }
        fetchCountryData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        const fetchCountryMobileData = async() =>{
            try{
                const country = await FetchCountries();
                // console.log(country);
                dispatch(setCountriesData(country));
                setFilteredMobileCountries(country);
            }
            catch(error){
                console.error('Error fetching countrie', error);
            }
        }
        fetchCountryMobileData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleCountryClick = async (country) => {
        // console.log(country.name.common);
        try {
            const weatherData = await FetchWeatherForCountries(country.name.common);
            // console.log(weatherData);
            dispatch(setSelectedCountryWeatherData(weatherData));
            dispatch(setWeatherData(weatherData));
            setShowDropdown(false);
            setShowSearchBar(false);
            setToggleSidebar(false);
            setSearchCity("");
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleMobileCountryClick = async (country) => {
        // console.log(country.name.common);
        try {
            const weatherData = await FetchWeatherForCountries(country.name.common);
            // console.log(weatherData);
            dispatch(setSelectedCountryWeatherData(weatherData));
            dispatch(setWeatherData(weatherData));
            setShowMobileDropdown(false);
            setShowMobileSearchBar(false);
            setToggleSidebar(false);
            setSearchCity("");
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleSidebar = () =>{
        setToggleSidebar(!toggleSidebar);
    }

    const handleSibebarBackground = () =>{
        setToggleSidebar(false);
    }
    return(
        <>
            <header className="p-[10px] flex items-center bg-[#000] fixed w-full top-[0px] z-[1000]">
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Image className="!w-[50px] h-[50px]" 
                                width={0} 
                                height={0} 
                                src={registered_logo}
                                alt="registered_logo"
                            />
                        </Grid>
                        <Grid item xs={10} className="flex items-center justify-end max-md:hidden">
                            <ul className="flex flex-row gap-[42px] max-lg:text-[14px] max-lg:gap-[20px] items-center text-[#fff]"
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
                                            <div ref={dropdownRef} className="absolute top-[30px] h-[300px] overflow-auto left-0 z-[100000] bg-white border rounded shadow">
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
                                                                text-gray-800 no-underline cursor-pointer hover:bg-gray-200"
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
                        <Grid item xs={10} className="max-lg:hidden lg:hidden max-md:block max-md:flex max-md:items-center max-md:justify-end">
                            <FontAwesomeIcon icon={faBars}  
                                className="max-md:text-[#fff] max-md:cursor-pointer max-md:text-[30px]"
                                onClick={handleSidebar}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </header>
            {/* Sidebar Background */}
            <div className={`${toggleSidebar ? "max-md:bg-black max-md:opacity-65" : ""} max-md:block max-md:fixed max-md:top-[0px] max-md:w-screen max-md:h-screen max-lg:hidden lg:hidden`}
                onClick={handleSibebarBackground}
            ></div>
            {/* Sidebar */}
            <div 
                className={`transition-transform duration-1000 ease-in-out transform ${toggleSidebar ? 'translate-x-[0%]':'translate-x-[-101%]'} max-md:block max-lg:hidden lg:hidden max-md:z-[1000] 
                max-md:p-[20px] max-md:h-screen max-md:w-[84%] 
                max-md:bg-[#fff] max-md:fixed max-md:top-[0px]`}
                >
                <div className="flex justify-end">
                    <FontAwesomeIcon icon={faClose} 
                        className="text-[#000] text-[20px]"
                        onClick={handleSidebar}
                    />
                </div>
                <ul className="flex flex-col gap-[42px] items-center max-md:items-start text-[#000]"
                    style={{fontFamily: theme.typography.fontFamily}}
                    >
                    <li>
                        <div className="relative">
                            <input type="text"
                                value={searchCity}
                                onChange={handleMobileChange}
                                onKeyPress={handleMobileKeyPress}
                                onClick={handleMobileDropdown}
                                className={`border-[1px] border-[#000] text-[#000] 
                                pl-[15px] outline-none rounded-[8px] transition-all duration-700 
                                ${showMobileSearchBar ? 'w-[200px] opacity-[1]' : 'w-[0px] opacity-[0]'}`}
                            />
                            <FontAwesomeIcon 
                                className={`absolute right-[5px] cursor-pointer top-[4px] transition-all duration-700
                                ${showMobileSearchBar ? 'lg:text-[#000] max-md:text-[#000]':'lg:text-[#fff] max-md:text-[#000]'}`}
                                icon={faSearch} 
                                onClick={handleMobileSearchBar}
                            />
                            {showMobileDropdown && (
                                <div ref={mobileDropdownRef} className="absolute top-[30px] h-[300px] overflow-auto left-0 z-[1000] bg-white border rounded shadow">
                                    {/* Dropdown content goes here */}
                                    {
                                        filteredMobileCountries.length === 0 ? (
                                            <p className="block px-4 
                                                py-2 text-gray-800"
                                                >
                                                Country not available
                                            </p>
                                        ):(
                                            
                                            filteredMobileCountries.map((country, index) => (
                                                <a key={index} className="block px-4 py-2 
                                                    text-gray-800 no-underline cursor-pointer hover:bg-gray-200"
                                                    onClick={() => handleMobileCountryClick(country)} 
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
                        <Link href={'/weather'} className="text-[#000] no-underline">Home</Link>
                    </li>
                    <li>
                        <Link href={'/aboutus'} className="text-[#000] no-underline">About us</Link>
                    </li>
                    <li>
                        <Link href={'/news'} className="text-[#000] no-underline">News</Link>
                    </li>
                    <li>
                        <Link href={'/contactus'} className="text-[#000] no-underline">Contact us</Link>
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
            </div>
        </>
    )
}
export default Header;