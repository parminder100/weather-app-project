"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import "../Login/Login.css";

const Login = () =>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const router = useRouter();

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            const res = await signIn('credentials', {
                username,
                password, 
                redirect:false
            });

            if(res.error){
                setError('Invalid Credentials');
                return;
            }
            router.replace("/weather");
        }
        catch(error){
            console.log(error);
        }
    }
    return(
        <>
            <section>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} className="flex items-center justify-center !pt-[150px]">
                            <div className='bg-[#fff] p-[20px] w-full max-w-[400px] border-[1px] border-[#fff] rounded-[8px]'>
                                <h1 className='text-[27px] mb-[30px] font-[600] text-center'>Welcome back</h1>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                    <div className='mb-[10px]'>
                                        <label className='block mb-[10px] text-[14px]'>Username:</label>
                                        <input 
                                            type="text"
                                            className='username-input border-[1px] 
                                            border-[#d1d1d1] rounded-[5px] px-[45px]
                                            h-[40px] w-full outline-none placeholder:text-[#797979]
                                            placeholder:text-[15px]'
                                            placeholder='John Doe'
                                            onChange={(e)=>setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className='mb-[10px]'>
                                        <label className='block mb-[10px] text-[14px]'>Password:</label>
                                        <input 
                                            type="password" 
                                            className='password-input border-[1px] border-[#d1d1d1] 
                                            rounded-[5px] px-[45px] h-[40px] w-full outline-none placeholder:text-[#797979]
                                            placeholder:text-[15px]' 
                                            placeholder='Minimum 8 characters'
                                            onChange={(e)=>setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <button className='login_btn outline-none'>Login</button>
                                    </div>
                                    <div className='mt-2 text-center'>
                                        <Link className="text-[#000] no-underline" href={'/'}>
                                            Don&apos;t have an account? <span className="underline">Register</span>
                                        </Link>
                                    </div>
                                    {
                                        error && (
                                            <p className="text-[15px] text-[red]">
                                                {error}
                                            </p>
                                        )
                                    }
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </section>
            {/* <div className="grid place-items-center h-screen">
                <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                    <h1 className="text-xl font-bold my-4">Login</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input 
                            type="text" 
                            placeholder="Email" 
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="password" 
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">Login</button>
                        {
                            error && (
                                <div className="bg-red-500 text-white w-fit 
                                    text-sm py-1 px-3 rounded-md mt-2"
                                    >
                                    {error}
                                </div>
                            )
                        }
                        <Link className="text-sm mt-3 text-right" href={'/'}>
                            Don't have an account? <span className="underline">Register</span>
                        </Link>
                    </form>
                </div>
            </div> */}
        </>
    )
}
export default Login;