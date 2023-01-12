import { useState } from "react";
import Link from "next/link";
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from "../graphql/mutations";
import { useRouter } from "next/router";


export default function Login() {
    const router = useRouter();
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
        verified: false,
        loginFailed: false
    });

    const [login, { loading, error }] = useMutation(
        LOGIN_MUTATION,
        {
            onCompleted: ({ login }) => {
                if(login?.status === '200'){
                    // Authenticated
                    const user = login.user;
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('username', user.username);
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('loginTime', String(new Date().getTime()));
                    setLoginInfo({ ...loginInfo,  verified: true });
                }else if(login?.status === '401'){
                    // Rejected
                    setLoginInfo({ ...loginInfo, loginFailed: true });
                }
            }
        }
    );

    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        if(e.target.name === 'username') {
            setLoginInfo({ ...loginInfo, username: e.target.value });
        }else {
            setLoginInfo({ ...loginInfo, password: e.target.value });
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Debounce, and prevent empty input
        if(loading || !loginInfo.username || !loginInfo.password){
            return;
        }

        await login({
            variables: {
                // Send encrypted password
                loginUserInput: { username: loginInfo.username, password: loginInfo.password}
            }
        });
    };

    /* User is verified, redirect to main page */
    if(loginInfo.verified){
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
                        </div>
                        <div className='mb-4'>
                          <input
                            type='password'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Password'
                            name='password' onChange={handleChange}
                          />
                        </div>
                        <div className='text-center pt-1 mb-12 pb-1'>
                          <button
                            className='bg-green inline-block px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                            type='button' onClick={handleSubmit}
                          >
                           Login
                          </button>
                          <p>
                          </p>
                        </div>
                        <div className='flex items-center justify-between pb-6'>
                          <p className='mb-0 mr-2'>Do you have an account?</p>
                          <button
                            type='button'
                            className='inline-block px-6 py-2 border-2 border-green-600 text-green-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'>
                              <Link href={'/register'}>Register</Link>
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