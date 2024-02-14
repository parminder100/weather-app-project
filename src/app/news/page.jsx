"use client";
import News from "@/components/News/News";
import { Provider } from "react-redux";
import store from "../Redux/Store";
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation";
import { useEffect } from "react";

const   NewsPage = () =>{
    const { data: session, status } = useSession();
    
    useEffect(()=>{
        if(status === 'loading' || (!session && status !== 'authenticated')){
            redirect("/loginpage");
        }
    },[session, status]);
    return(
        <>
            <Provider store={store}>
                <News />
            </Provider>
        </>
    )
}
export default NewsPage;