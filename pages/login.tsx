import { useState } from "react";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations";
import { useRouter } from "next/router";
import Header from "../components/header";

export default function Login() {
  const router = useRouter();
  const [state, setState] = useState({
    error:false
  })
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
    verified: false,
    loginFailed: false,
  });

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login }) => {
      if (login?.status === "200") {
        // Authenticated
        const user = login.user;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("username", user.username);
        localStorage.setItem("token", user.token);
        localStorage.setItem("loginTime", String(new Date().getTime()));
        setLoginInfo({ ...loginInfo, verified: true });
      } else if (login?.status === "401") {
       setState({
        error:true
       })
        setLoginInfo({ ...loginInfo, loginFailed: true });
      }
    },
  });

  const handleChange = (e: { target: { name: string; value: any } }) => {
    if (e.target.name === "username") {
      setLoginInfo({ ...loginInfo, username: e.target.value });
    } else {
      setLoginInfo({ ...loginInfo, password: e.target.value });
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Debounce, and prevent empty input
    if (loading || !loginInfo.username || !loginInfo.password) {
      return;
    }

    await login({
      variables: {
        // Send encrypted password
        loginUserInput: {
          username: loginInfo.username,
          password: loginInfo.password,
        },
      },
    });
  };

  /* User is verified, redirect to main page */
  if (loginInfo.verified) {
    router.push("/");
  }

  return (<>
  <Header></Header>
    <section className="h-full screen-h gradient-form md:h-full bg-gray-800 md:h-screen">
      <div className="container py-12 px-6 h-full">
        <div className=" flex justify-center items-center flex-wrap md:h-full g-6 text-gray-800">
          <div className="">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="lg:flex lg:flex-wrap g-0">
                <div className="px-4 md:px-0">
                  <div className="md:p-12 md:mx-6">
                    <div className="text-center">
                      <h4 className="text-xl font-semibold mt-1 mb-12 pb-1 ">
                        Login
                      </h4>
                    </div>
                    <form>
                      <p className="mb-4">
                        Please Sign Up if you do not have an account
                      </p>
                      <div className="mb-4">
                        <input
                          type="username"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Your Username"
                          name="username"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="password"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Password"
                          name="password"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="text-center pt-1 mb-12 pb-1">
                        <button
                          className="bg-green inline-block px-6 py-2.5 hover:text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-black hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                          type="button"
                          onClick={handleSubmit}
                        >
                          Login
                        </button>
                        <p></p>
                      </div>
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Do you have an account?</p>
                        <button
                          type="button"
                          className="inline-block px-6 py-2 border-2 border-black text-black font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                        >
                          <Link href={"/register"}>Register</Link>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {state.error ?  <div
          id="toast-default"
          className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Fire icon</span>
          </div>
          <div className="ml-3 text-sm font-normal">User Don't exist</div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-default"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>:null}
      </div>
    </section>
    </>
  );
}
