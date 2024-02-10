"use client";
import Header from "@/components/Header/Header";
import store from "@/app/Redux/Store";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { FetchNewsApi } from "@/app/Services/FetchNewsApi/FetchNewsApi";
import { hideWeatherDataSkeleton, setNewsData, showWeatherDataSkeleton } from "@/app/Redux/Action";
import Image from 'next/image';
import { useEffect } from "react";
import NewsSkeleton from "../Skeleton/NewsSkeleton/NewsSkeleton";
import Footer from "../Footer/Footer";

const News = () =>{
    const weatherNewsData = useSelector(state=>state.newsData);
    const isShowingWeatherSkeleton = useSelector(state=>state.showWeatherDataSkeleton);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchWeatherNews = async() =>{
            try{
                const weatherNews = await FetchNewsApi();
                dispatch(setNewsData(weatherNews));
                setTimeout(() => {
                    dispatch(hideWeatherDataSkeleton());
                }, 3000);
                console.log(weatherNews);
            }
            catch(error){
                console.error("Error fetching weather news:", error);
            }
        }
        if(!weatherNewsData){
            dispatch(showWeatherDataSkeleton());
            fetchWeatherNews();
        }
    },[weatherNewsData]);


    console.log(weatherNewsData);
    return(
        <>
            <Provider store={store}>
                <Header />
            </Provider>
            <section className="pt-[100px] pb-[30px]">
                <Container>
                    <Grid container spacing={2}>
                        {isShowingWeatherSkeleton && (
                            Array.from({ length: 10 }).map((_, index) => (
                                <Grid item xs={6} key={index}>
                                    <NewsSkeleton />
                                </Grid>
                            ))
                        )}
                        {
                            !isShowingWeatherSkeleton && weatherNewsData && weatherNewsData.news.map((news, index)=>(
                                <Grid item xs={6} key={index} className="mb-[20px]">
                                    {
                                        news.image ? (
                                            <Image 
                                                className="w-full !h-[390px]"
                                                width={0}
                                                height={0}
                                                src={news.image}
                                                alt={news.title}
                                                layout="responsive"
                                            />
                                        ):(
                                            <p>Image is not available</p>
                                        )
                                    }
                                    <p className="mt-[10px] font-[600]">{news.publish_date}</p>
                                    <p className="mt-[10px]">{news.title}</p>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Container>
            </section>
            <Footer />
        </>
    )
}
export default News;