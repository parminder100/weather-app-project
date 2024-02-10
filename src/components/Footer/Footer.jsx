import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import "../Footer/Footer.css"

const Footer = () =>{
    return(
        <>
            <footer className='bg-[#a09c9c] p-[20px] flex items-center justify-[center]'>
                <Container>
                    <Grid container spacing={2} className="items-center">
                        <Grid item xs={6}>
                            <div>
                                <p className="flex">© 2024. All rights reserved. Developed with
                                <span className="heart"></span> by Parminder Singh</p>
                            </div>
                        </Grid>
                        <Grid item xs={6} className="flex justify-end">
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