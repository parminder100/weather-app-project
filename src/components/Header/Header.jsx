"use client";
import { useState } from "react";
import { FetchWeatherApi } from "@/app/Services/FetchWeatherApi/FetchWeatherApi";
import { useDispatch } from "react-redux";
import { setWeatherData } from "@/app/Redux/Action";
import Image from 'next/image'
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () =>{
    const [searchCity, setSearchCity] = useState("");
    const [showSearchBar, setShowSearchBar] = useState(false);

    const theme = useTheme();
    const dispatch = useDispatch();

    const handleChange = (event) =>{
        setSearchCity(event.target.value);
    }

    const handleKeyPress = async(event) =>{
        if(event.key === 'Enter'){
            const weather = await FetchWeatherApi(searchCity);
            dispatch(setWeatherData(weather));
            setSearchCity("");
            console.log(weather);

            setShowSearchBar(false);
        }
    }

    const handleSearchBar = () =>{
        setShowSearchBar(!showSearchBar);
    }
    return(
        <>
            <header className="p-[10px] flex items-center bg-[#000]">
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Image width={50} height={50} src="/asset/img/registered_logo.png" alt="registered_logo" />
                        </Grid>
                        <Grid item xs={8} className="flex items-center justify-end">
                            <ul className="flex flex-row gap-[45px] items-center text-[#fff]"
                                style={{fontFamily: theme.typography.fontFamily}}
                                >
                                <li>
                                    <div className="relative">
                                        <input type="text"
                                            value={searchCity}
                                            onChange={handleChange}
                                            onKeyPress={handleKeyPress}
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
                                    </div>
                                </li>
                                <li>Home</li>
                                <li>About us</li>
                                <li>News</li>
                                <li>Contact us</li>
                            </ul>
                        </Grid>
                    </Grid>
                </Container>
            </header>
        </>
    )
}
export default Header;