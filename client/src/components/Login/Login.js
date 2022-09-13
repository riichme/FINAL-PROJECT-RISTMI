// Import All needed dependencies
import React from "react";
import swal from 'sweetalert';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import Validation Rules
import { rules } from "./Validation";

// Import API Login
import { loginUser } from "../../app/api/auth";

// Import Action
import { userLogin } from "../../app/Features/Auth/actions";

const Login = ({showModal, setModal, setRegister}) => {
    // Initial the useDispatch from redux
    // Dispatch an action, so that it triggers a global state change
    const dispatch = useDispatch();

    // useNavigate is used for going to another page
    const navigate = useNavigate();

    // Hooks for managing form 
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
      } = useForm();

    // If click button submit of login form
    const handleSubmitForm = async (fromData) => {
      // Get data from api
      const { data } = await loginUser(fromData);
      // If error
      if (data.error) {
          setError("password", {
            type: "invalidCredential",
            message: data.message,
          });
      } 
      // If success
      else {
        // Get data user and token
        const { user, token } = data;
        swal("Login Success!", "", "success");
        // Trigger dispatch of userLogin action
        dispatch(userLogin({ user, token }));
        // Store auth data to local storage
        localStorage.getItem("auth");
        // Unmount Modal
        setModal(false);
        // Go to Home
        navigate('/');
      }
    }

    return (
      <>
        {
          // If Login modal is active, render that
          showModal ? (
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex justify-end p-2">
                        <button onClick={() => setModal(!showModal)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(handleSubmitForm)} className="w-[22rem] px-6 pb-3 space-y-3 lg:px-8 sm:pb-6 xl:pb-8" action="#">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Welcome to <span className='text-[#149BFC]'>EDUSTORE</span></h3>
                        <h1 className='text-[55px] font-bold'>Login</h1>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                            <input {...register("email", rules.email)}  type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" />
                            {errors.email && (
                                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email?.message}</p>
                              )}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                            <input {...register("password", rules.password)} type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                            {errors.password && (
                                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password?.message}</p>
                              )}
                        </div>
                        <div className="float-right justify-between">
                            <p className="cursor-pointer text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</p>
                        </div>
                          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <button onClick={() => setRegister(true)} type="button" className="text-blue-700 hover:underline dark:text-blue-500">Create account</button>
                        </div>
                    </form>
                </div>
                </div>
              </div>
              {/* Opacity */}
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null
        }
      </>
    )
}

export default Login;