"use client"
import DisplayWeather from "@/components/DisplayWeather/DisplayWeather";
import { Provider } from "react-redux";
import store from "@/app/Redux/Store";
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/Theme/Theme";

const Landing = () =>{
    return(
        <>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <DisplayWeather />
                </Provider>
            </ThemeProvider>
        </>
    )
}
export default Landing;