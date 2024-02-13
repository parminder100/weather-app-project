"use client";
import {SessionProvider} from "next-auth/react";

const AuthProvider = ({children}) =>{
    return <SessionProvider basePath="/weather360/api/auth">{children}</SessionProvider>
}
export default AuthProvider;