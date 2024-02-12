import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import "../Footer/Footer.css"

const Footer = () =>{
    return(
        <>
            <footer className='bg-[#a09c9c] max-sm:p-[15px] p-[20px] flex items-center justify-[center]'>
                <Container>
                    <Grid container spacing={2} className="items-center max-sm:!flex-col">
                        <Grid item xs={6} className="max-sm:!max-w-[100%] max-lg:!pl-[0px]">
                            <div>
                                <p className="flex max-md:text-[10px] max-md:font-[600] max-lg:text-[12px]">© 2024. All rights reserved. Developed with
                                <span className="heart"></span> by Parminder Singh</p>
                            </div>
                        </Grid>
                        <Grid item xs={6} className="flex justify-end max-sm:!max-w-[100%]">
                            <a href="https://openweathermap.org" className='text-[#fff] no-underline' target="_blank">
                                Powered by
                                <Image 
                                    className='!w-[100px]'
                                    width={0} 
                                    height={0} 
                                    src="/asset/img/openWeather_logo.png" 
                                    alt="openWeather_logo" 
                                    layout="responsive"
                                />
                            </a>
                        </Grid>
                    </Grid>
                </Container>
            </footer>
        </>
    )
}
export default Footer;