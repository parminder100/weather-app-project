import Login from "@/components/Login/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const LoginPage = async() =>{
    const session = await getServerSession(authOptions);

    if(session){
        redirect("/weather");
    }

    return(
        <>
            <Login />
        </>
    )
}
export default LoginPage;