import Register from "../components/Register/Register";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if(session){
    redirect("/weather");
  }
  return (
    <>
      <Register />
    </>
  )
}
