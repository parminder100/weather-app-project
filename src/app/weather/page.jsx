import Landing from "../Pages/Landing/Landing";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Page = async() =>{
    const session = await getServerSession(authOptions);
    if(!session){
        redirect('/')
    }
    return(
        <>
            <Landing />
        </>
    )
}
export default Page;