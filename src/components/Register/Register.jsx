"use client";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Modal from 'bootstrap/js/dist/modal';
// import { signIn } from 'next-auth/react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  const handleUsernameChange = (value) =>{
    setUsername(value);
    setUsernameError('');
  }

  const handleEmailChange = (value) =>{
    setEmail(value);
    setEmailError('');
  }

  const handlePasswordChange = (value) =>{
    setPassword(value);
    setPasswordError('');
  }

  useEffect(() => {
    if (showModal) {
      const myModal = new Modal(document.getElementById('registrationModal'));
      myModal.show();
      setTimeout(() => {
        myModal.hide();
        setShowModal(false);
      }, 1000);
    }
  }, [showModal]);

  const validateInputs = () =>{
    let valid = true;

    // Username validation
    if(username.length < 8){
      setUsernameError('Username must be at least 8 characters');
      valid = false;
    }
    else{
      setUsernameError('');
    }

    // Email validation using a simple regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      setEmailError('Invalid email address');
      valid = false;
    }
    else{
      setEmailError('');
    }

    // Password validation using a regex pattern
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordRegex.test(password)){
      setPasswordError('Password must be at least 8 characters and include one special character, one lowercase letter, one uppercase letter, and one number');
      valid = false;
    }
    else{
      setPasswordError('');
    }
    return valid;
  }

  const handleRegister = async () => {
    if(!validateInputs()){
      // If inputs are not valid, don't proceed with registration
      return;
    }

    
    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username}),
      });

      const responseData = await resUserExists.json();
      console.log("Response data from api/userExists:", responseData);

      const {user} = responseData;

      if(user){
          setError("User already exists.");
          return;
      }

      const response = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      
      if (response.ok) {
        // Handle successful registration
        console.log('Registration successful');
        
        // Signin/Login page
        // setTimeout(async()=>{
        //   await signIn( { username, email, password });
        // },[1000]);

        setShowModal(true);
        setTimeout(() => {
          setShowModal(false); // Hide the modal after 5 seconds
        }, 1000);
        router.push("/loginpage");
      } else {
        // Handle registration failure
        const errorData = await response.json();
        console.error('Registration failed:', errorData.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <section>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} className="flex items-center justify-center !pt-[150px]">
            <div className='bg-[#fff] p-[20px] w-full max-w-[400px] border-[1px] border-[#fff] rounded-[8px]'>
              <form>
                <h1 className='text-[27px] mb-[30px] font-[600] text-center'>Let&apos;s go!</h1>
                <div className='mb-[10px]'>
                  <label className='block mb-[10px] text-[14px]'>Username:</label>
                  <input type="text" 
                    className='username-input border-[1px] 
                      border-[#d1d1d1] rounded-[5px] px-[45px]
                      h-[40px] w-full outline-none placeholder:text-[#797979]
                      placeholder:text-[15px]'
                      placeholder='John Doe'
                    value={username} 
                    onChange={(e) => handleUsernameChange(e.target.value)} 
                  />
                  {
                    usernameError &&
                    <p className='text-[15px] text-[red]'>{usernameError}</p>
                  }
                </div>
                <div className='mb-[10px]'>
                  <label className='block mb-[10px] text-[14px]'>Email:</label>
                  <input type="email" 
                    className='email-input border-[1px] border-[#d1d1d1] 
                    rounded-[5px] px-[45px] h-[40px] w-full outline-none placeholder:text-[#797979]
                    placeholder:text-[15px]'
                    placeholder='example@site.com'
                    value={email} 
                    onChange={(e) => handleEmailChange(e.target.value)} 
                  />
                  {
                    emailError &&
                    <p className='text-[15px] text-[red]'>{emailError}</p>
                  }
                </div>
                <div className='mb-[20px]'>
                  <label className='block mb-[10px] text-[14px]'>Password:</label>
                  <input type="password"
                    className='password-input border-[1px] border-[#d1d1d1] 
                    rounded-[5px] px-[45px] h-[40px] w-full outline-none placeholder:text-[#797979]
                    placeholder:text-[15px]' 
                    placeholder='Minimum 8 characters'
                    value={password} 
                    onChange={(e) => handlePasswordChange(e.target.value)} 
                  />
                  {
                    passwordError &&
                    <p className='text-[15px] text-[red]'>{passwordError}</p>
                  }
                </div>
                <div>
                  <button className='register_btn outline-none' type="button" 
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                </div>
                <div className='mt-2 text-center'>
                  <Link 
                    className='text-[#000] no-underline'
                    href={'/loginpage'}
                    >
                    Already registered? Log in
                  </Link>
                </div>
              </form>
              <div className={`modal fade ${showModal ? 'show' : ''}`} id="registrationModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
                <div className="modal-dialog">
                  <div className="modal-content !text-[#008000] !font-[600]">
                    <div className="modal-body !px-[15px] !py-[6px]">
                      Registration successful!.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Register;
