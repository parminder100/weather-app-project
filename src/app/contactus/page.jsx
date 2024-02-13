"use client";
import Header from "@/components/Header/Header";
import { useEffect } from "react";
import contactus1 from "../../../public/asset/img/contactus1.png";
import contactus2 from "../../../public/asset/img/contactus2.png";
import { Provider } from "react-redux";
import store from "../Redux/Store";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobile } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation";
import Footer from "@/components/Footer/Footer";

const ContactUs = () =>{
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
            <section className="pt-[70px] pb-[70px] !bg-[#352E64]">
                <Container>
                    <Grid container spacing={2} className="max-sm:!flex-col">
                        <Grid item xs={6} className="max-sm:!max-w-[100%]">
                            <div className="pt-[120px] mb-[50px] relative">
                                <div className="bg-[#000] p-[20px] rounded-[10px] max-lg:h-[694px] h-[500px] rounded-r-[0px]">
                                    <h3 className="text-[28px] text-[#fff]">contact Information</h3>
                                    <p className="text-[18px] mb-[50px] text-[#c9c9c9]">Say something to start a live chat!</p>
                                    <div className="flex flex-row items-center gap-[20px] text-[#fff] mb-[20px]">
                                        <FontAwesomeIcon icon={faMobile} />
                                        <p>+1012 3456 789</p>
                                    </div>
                                    <div className="flex flex-row items-center gap-[20px] text-[#fff] mb-[20px]">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                        <p>demo@gmail.com</p>
                                    </div>
                                    <div className="flex flex-row items-center gap-[20px] text-[#fff]">
                                        <FontAwesomeIcon icon={faMapMarker} />
                                        <p>132 Dartmouth Street Boston,<br /> Massachusetts 02156 United States</p>
                                    </div>
                                    <Image
                                        src={contactus1}
                                        alt="contactus1"
                                        width={0}
                                        height={0}
                                        className="!w-[180px] h-[183px] absolute right-[0px] bottom-[0px]"
                                     />
                                     <Image
                                        src={contactus2}
                                        alt="contactus2"
                                        width={0}
                                        height={0}
                                        className="!w-[138px] h-[138px] absolute right-[84px] bottom-[46px]"
                                     />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6} className="!mt-[120px] max-sm:!mt-[0px] mb-[50px] max-sm:!pl-[16px] !pl-[0px] max-sm:max-w-[100%]">
                            <div className="bg-[#9a9898] p-[20px] rounded-[10px] max-lg:h-[694px] h-[500px] rounded-l-sm">
                                <form>
                                    <Grid container spacing={2} className="row">
                                        <Grid item xs={6} className="max-lg:max-w-[100%]">
                                            <div>
                                                <label className="mb-[10px] block">First Name</label>
                                                <input className="border outline-none px-[20px] h-[40px] rounded-[8px] border-[#dee2e6]" type="text" placeholder="Enter first name" />
                                            </div>
                                        </Grid>
                                        <Grid item xs={6} className="col-sm-6 mb-5 max-lg:max-w-[100%]">
                                            <div>
                                                <label className="mb-[10px] block">Last Name</label>
                                                <input className="border outline-none px-[20px] h-[40px] rounded-[8px] border-[#dee2e6]" type="text" placeholder="Enter last name" />
                                            </div>
                                        </Grid>
                                        <Grid item xs={6} className="col-sm-6 mb-5 max-lg:max-w-[100%]">
                                            <div>
                                                <label className="mb-[10px] block">Email</label>
                                                <input className="border outline-none px-[20px] h-[40px] rounded-[8px] border-[#dee2e6]" type="email" placeholder="Enter email" />
                                            </div>
                                        </Grid>
                                        <Grid item xs={6} className="col-sm-6 mb-5 max-lg:max-w-[100%]">
                                            <div>
                                                <label className="mb-[10px] block">Phone Number</label>
                                                <input className="border outline-none px-[20px] h-[40px] rounded-[8px] border-[#dee2e6]" type="number" placeholder="Enter phone number" />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} className="col-sm-12 mb-5 max-lg:max-w-[100%]">
                                            <div>
                                                <label className="mb-[10px] block">Message</label>
                                                <textarea className="border w-full outline-none px-[20px] h-[60px] rounded-[8px] border-[#dee2e6]" rows="3" placeholder="Write your message"></textarea>
                                            </div>
                                        </Grid>
                                        <div className="flex w-full justify-end mt-[70px]">
                                            <button className="bg-[#000] text-[#fff] px-[25px] py-[10px] rounded-[8px]">Submit</button>
                                        </div>
                                    </Grid>
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </section>
            <Footer />
        </>
    )
}
export default ContactUs;