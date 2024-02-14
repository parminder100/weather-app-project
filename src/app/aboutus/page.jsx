"use client";
import Header from "@/components/Header/Header";
import { Provider } from "react-redux";
import ourmission from "../../../public/asset/img/ourmission.jpg";
import ourvision from "../../../public/asset/img/ourvision.jpg";
import ourcorevalues from "../../../public/asset/img/ourcorevalues.jpg";
import { useEffect } from "react";
import store from "../Redux/Store";
import Image from 'next/image';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Footer from "@/components/Footer/Footer";
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation";

const AboutUs = () =>{
    const { data: session, status } = useSession();

    useEffect(()=>{
        if(status === 'loading' || (!session && status !== 'authenticated')){
            redirect("/loginpage");
        }
    },[session, status]);
    return(
        <>
            <Provider store={store}>
                <Header />
            </Provider>
            <section className="pt-[50px] pb-[40px] bg-[#fff]">
                <div className="bg-[url('/weather360/asset/img/aboutus.jpg')] max-sm:h-[382px] h-[300px] w-full relative">
                    <Container className="absolute top-[30px] flex flex-col items-center">
                        <Grid container spacing={2}>
                            <Grid item xs={12} className="max-w-[1140px] mt-[30px] mx-auto text-center">
                                <h2 className="text-[32px] font-[600] mb-[30px]">About Us</h2>
                                <p>At Weather24, we are dedicated to providing accurate and reliable 
                                    weather information to individuals, businesses, and communities. 
                                    Our mission is to empower people with the knowledge they need to 
                                    make informed decisions, stay safe, and plan their activities 
                                    based on reliable weather forecasts.
                                </p>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
                <Container className="mt-[50px]">
                    <Grid container spacing={2} className="max-sm:!flex-col">
                        <Grid item xs={6} className="mb-[30px] max-sm:!max-w-[100%]">
                            <Image className="w-full" 
                                width={0}
                                height={0}
                                src={ourmission} 
                                alt="our-mission"
                            />
                        </Grid>
                        <Grid item xs={6} className="mb-[30px] max-sm:!max-w-[100%]">
                            <h2 className="text-[32px] font-[600] mb-[30px]">Our Mission</h2>
                            <p>At Weather24, our mission is to provide individuals, 
                                businesses, and communities with accurate and timely 
                                weather information. We believe that access to 
                                reliable weather forecasts is essential for making 
                                informed decisions, staying safe, and planning activities 
                                effectively. We strive to deliver the most precise and 
                                up-to-date weather data, ensuring that our users can 
                                trust the information we provide.
                            </p>
                            <p>
                                Through our mission, we aim to empower our users by equipping them 
                                with the knowledge they need to navigate weather conditions with 
                                confidence. Whether it is planning a weekend getaway, organizing 
                                outdoor events, or managing day-to-day operations, we are committed 
                                to helping individuals and organizations make informed choices based 
                                on reliable weather forecasts.
                            </p>
                        </Grid>
                        <Grid item xs={6} className="mb-[30px] max-sm:!max-w-[100%]">
                            <h2 className="text-[32px] font-[600] mb-[30px]">Our Vision</h2>
                            <p>Our vision for Weather24 is to be the leading provider of weather 
                                information globally, serving as a trusted source for accurate 
                                forecasts and comprehensive weather insights. We aim to empower
                                individuals and organizations across various sectors with the 
                                knowledge they need to plan effectively, mitigate risks, and 
                                adapt to weather-related challenges.
                            </p>
                            <p>
                                We envision a future where Weather24 plays a crucial role in improving 
                                safety, optimizing operations, and supporting decision-making processes 
                                in areas such as agriculture, transportation, energy, construction, and 
                                emergency management. We strive to be at the forefront of technological
                                advancements in the field of meteorology, ensuring that our users benefit 
                                from the latest innovations in weather forecasting.
                            </p>
                        </Grid>
                        <Grid item xs={6} className="mb-[30px] max-sm:!max-w-[100%]">
                            <Image
                                className="w-full"
                                src={ourvision}
                                alt="our-vision"
                                width={0}
                                height={0}
                             />
                        </Grid>
                        <Grid item xs={6} className="max-sm:!max-w-[100%] max-sm:order-1">
                            <Image
                                className="w-full !h-[350px] object-cover"
                                src={ourcorevalues}
                                alt="our-core-values"
                                width={0}
                                height={0}
                             />
                        </Grid>
                        <Grid item xs={6} className="max-sm:!max-w-[100%]">
                            <h2 className="text-[32px] font-[600] mb-[30px]">Our Core Values</h2>
                            <p>We understand the importance of dependability 
                                when it comes to weather forecasts. Our team 
                                of meteorologists and data scientists works 
                                diligently to ensure that our users can rely 
                                on our services to make crucial decisions, 
                                whether it is planning outdoor activities, 
                                managing agricultural operations, or optimizing 
                                logistics.
                            </p>
                            <p>
                                We embrace innovation and leverage advanced technologies to 
                                enhance the accuracy and usability of our weather services. 
                                We continuously explore new forecasting techniques, data 
                                analysis methods, and visualization tools to deliver the 
                                most comprehensive and insightful weather information to our 
                                users.
                            </p>
                        </Grid>
                    </Grid>
                </Container>
            </section>
            <Footer />
        </>
    )
}
export default AboutUs;