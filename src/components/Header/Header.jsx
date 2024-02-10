"use client";
import { useState } from "react";
import { signOut } from 'next-auth/react';
import { FetchWeatherApi } from "@/app/Services/FetchWeatherApi/FetchWeatherApi";
import { useDispatch } from "react-redux";
import { setHourlyForecast, setUVIndex, setWeatherData } from "@/app/Redux/Action";
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
    const router = useRouter();
    const {data:session, status} = useSession();
    console.log(session);

    const theme = useTheme();
    const dispatch = useDispatch();

    const handleChange = (event) =>{
        setSearchCity(event.target.value);
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
                                <li>
                                    <Link href={'/'} className="text-[#fff] no-underline">Home</Link>
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