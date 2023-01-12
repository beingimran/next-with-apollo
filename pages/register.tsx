import { useState } from "react";
import { useMutation } from '@apollo/client';
import Link from "next/link";
import {REGISTER_MUTATION} from '../graphql/mutations';
import {usernameValid,passwordValid} from '../utils/inputValidate'
import { useRouter } from "next/router";

export default function Register(){

    const router = useRouter();

    const [registerInfo, setRegisterInfo] = useState({
        username: "",
        password: "",
        usernameValid: false,
        passwordValid: false,
        verified: false,
        registerFailed: false
    });

    const [register, { loading, error, data }] = useMutation(
        REGISTER_MUTATION,
        {
            onCompleted: ({ register }) => {
                console.log(register)
                if(register?.status === '201'){
                    // Created
                    const user = register.user;
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('username', user.username);
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('loginTime', String(new Date().getTime()));
                    setRegisterInfo({ ...registerInfo, verified: true });
                }else if(register?.status === '409'){
                    // Rejected
                    setRegisterInfo({ ...registerInfo, registerFailed: true });
                    
                }
            }
        }
    );

    const handleChange = (e:any) => {
        const newRegisterInfo = { ...registerInfo };
        const value = e.target.value;

        switch (e.target.name){
            case "username":
                newRegisterInfo.username = value;
                // Update if username valid changes
                if(!newRegisterInfo.usernameValid){
                    if(usernameValid(value)){
                        newRegisterInfo.usernameValid = true;
                    }
                }else {
                    if(!usernameValid(value)){
                        newRegisterInfo.usernameValid = false;
                    }
                }
                break;
            case "password":
                newRegisterInfo.password = value;
                // Update if password valid changes
                if(!newRegisterInfo.passwordValid){
                    if(passwordValid(value)){
                        newRegisterInfo.passwordValid = true;
                    }
                }else {
                    if(!passwordValid(value)){
                        newRegisterInfo.passwordValid = false;
                    }
                }
                break;
            default:
                break;
        }
        // setState
        setRegisterInfo(newRegisterInfo);
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        // Debounce, and prevent invalid input
        if(loading || !registerInfo.usernameValid || !registerInfo.passwordValid){
            return;
        }

        await register({
            variables: {
                // Send encrypted password
                registerUserInput: { username: registerInfo.username, password: registerInfo.password }
            }
        });
    };

    /* User is verified, redirect to main page */
    if(registerInfo.verified){
        router.push("/");
    }
    return (
 <section className='h-full gradient-form bg-gray-200 md:h-screen'>
      <div className='container py-12 px-6 h-full'>
        <div className=' flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
          <div className=''>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap g-0'>
                <div className='px-4 md:px-0'>
                  <div className='md:p-12 md:mx-6'>
                    <div className='text-center'>
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        Register
                      </h4>
                    </div>
                    <form>
                      <p className='mb-4'>
                        Please Sign Up if you do not have an account
                      </p>
                      <div className='mb-4'>
                        <input
                          type='username'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Your Username'
                          name='username' onChange={handleChange}
                        />
                        { registerInfo.usernameValid ? null : <small>4-12 letters, numbers or _.</small> }
                      </div>
                      <div className='mb-4'>
                        <input
                          type='password'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Password'
                          name='password' onChange={handleChange}
                        />
                        { registerInfo.passwordValid ? null : <small>Must be the same as above.</small> }
                        
                      </div>
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-green inline-block px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='button' onClick={handleSubmit}
                        >
                          Sign Up
                        </button>
                        <p>
                        </p>
                      </div>
                      <div className='flex items-center justify-between pb-6'>
                        <p className='mb-0 mr-2'>Do you have an account?</p>
                        <button
                          type='button'
                          className='inline-block px-6 py-2 border-2 border-green-600 text-green-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'>
                            {/* <Link href={'/login'}>Log in</Link> */}
                          Log In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
    
    );
};