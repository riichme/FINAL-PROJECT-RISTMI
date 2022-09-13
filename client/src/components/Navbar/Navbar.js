// Import All needed dependencies
import React from "react";
import Dropdown from "./Dropdown";
import swal from 'sweetalert';
import { useDispatch, useSelector } from "react-redux";
import { ButtonCircle } from "upkit";
import { Link, useNavigate } from "react-router-dom";

// Import Actions
import { set_null } from "../../app/Features/Counter/actions";
import { clearItem } from "../../app/Features/Cart/actions";
import { setCategory, setKeyword, setPage } from "../../app/Features/Product/actions";

// Import logo image
import edulogo from '../../assets/logos/edulogo.png'

const Navbar = ({ modal }) => {
  // Initial the useDispatch and useSelector from redux
  
  // Dispatch an action, so that it triggers a global state change
  const dispatch = useDispatch();

  // useNavigate is used for going to another page
  const navigate = useNavigate();

  // useSelector is function to read value from the global state and then return that result
  const auth = useSelector((state) => state.auth)
  const counter = useSelector(state => state.counter);

  // If we click button home, this function is called
  const handleClickToHome = () => {
    navigate('/');
    dispatch(set_null());
    dispatch(setCategory(""));
    dispatch(setPage(1));
    dispatch(clearItem());
  };

  // If we press key enter after input search keyword, this function is called
  const handlePressEnterToSearch = (e) => {
    e.key === 'Enter' && (
      dispatch(setKeyword(e.target.value))
    ) 
  }

  return (
    <>
      <nav className="fixed w-full flex flex-wrap items-center justify-between px-2 py-3 bg-[#149BFC] mb-3">
        <div className="container lg:px-20 xs:px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
            <a href="https://eduwork.id" rel="noreferrer" className="flex items-center" target="_blank">
                  <img src={edulogo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                  <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Edustore</span>
              </a>
            <div
              className="lg:hidden text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent outline-none focus:outline-none"
              type="button"
            >
              <div className="flex">
                <div className="relative cursor-pointer">
                  {
                    // If we're already logged in
                    auth.user !== null ? (
                      // If we have chosen products to cart
                      // Go to page checkout
                      counter.cartCount !== 0 ? (
                        <Link to='/checkout'>
                              <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                              {
                                // If we have cart items
                                // Showing the cart count
                                counter.cartCount !== 0 && (
                                  <span className="top-0 left-6 absolute w-7 h-7 pl-2 bg-red-600 border-2 border-white dark:border-gray-800 rounded-full text-white">{counter.cartCount}</span>
                                )
                              }
                        </Link>
                      ) 
                        : 
                        // If we don't choose any item
                        // Give error message and prevent going to checkout
                      ( 
                        
                        <div onClick={() => {
                          swal("No Items Chosen", "Please Pick Your Item First!", {
                              icon: "error",
                          });
                        }}>
                          <svg
                          className="w-9 h-9 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        { 
                          // If we have cart items
                          // Showing the cart count
                          counter.cartCount !== 0 && (
                            <span className="top-0 left-6 absolute w-7 h-7 pl-2 bg-red-600 border-2 border-white dark:border-gray-800 rounded-full text-white">{counter.cartCount}</span>
                          )
                        }
                        </div>
                      )
                    ) 
                      : 
                      // If we're not yet logged in
                      // Showing Login Modal after click cart
                    (
                      <div onClick={() => modal(true)}>
                        <svg
                        className="w-9 h-9 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        { 
                          // If we have cart items
                          // Showing the cart count
                          counter.cartCount !== 0 && (
                            <span className="top-0 left-6 absolute w-7 h-7 pl-2 bg-red-600 border-2 border-white dark:border-gray-800 rounded-full text-white">{counter.cartCount}</span>
                          )
                        }
                      </div>
                    )
                  }
                </div>
                { 
                  // If we're not yet logged in
                  // Showing Login Modal after click account
                  auth.user === null ? (
                    <svg onClick={() => modal(true)} className="cursor-pointer w-9 h-9 text-white ml-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  ) 
                    : 
                  // If we're already logged in
                  // Go direct to page account
                  (
                    <Link to="/account">
                        <div className="cursor-pointer w-9 h-9  ml-10">
                            <ButtonCircle 
                              color='blue' 
                              icon={auth.user !== null && auth.user.full_name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()} 
                              size="large"
                            />
                        </div>
                    </Link>
                  )
                }
              </div>
            </div>
          </div>
          <div
            className="lg:flex flex-grow items-center"
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="nav-item">
                <p onClick={handleClickToHome} className="cursor-pointer px-3 py-2 flex items-center text-md font-semibold text-white hover:opacity-75">
                  Home
                </p>
              </li>
              <li className="nav-item ">
                <Dropdown />
              </li>
            </ul>
            <div className="relative flex w-full sm:w-7/12 md:w-5/12 px-4 flex-wrap items-stretch lg:ml-auto">
              <div className=" relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  onKeyDown={handlePressEnterToSearch}
                  type="text"
                  id="email-adress-icon"
                  className="block pl-10 w-[18rem] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
              </div>
            </div>
            <div
              className="xs:hidden lg:flex cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent outline-none focus:outline-none"
              type="button"
            >
              
              <div className="flex">
                <div className="relative cursor-pointer">
                { 
                  // If we're already logged in
                  auth.user !== null ? (
                    // If we have chosen products to cart
                    // Go to page checkout
                    counter.cartCount !== 0 ? (
                      <Link to='/checkout'>
                          <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                          { 
                            // If we have cart items
                            // Showing the cart count 
                            counter.cartCount !== 0 && (
                              <span className="top-0 left-6 absolute w-7 h-7 pl-2 bg-red-600 border-2 border-white dark:border-gray-800 rounded-full text-white">{counter.cartCount}</span>
                            )
                          }
                      </Link>
                    ) 
                      : 
                    // If we don't choose any item
                    // Give error message and prevent going to checkout
                    (
                      <div onClick={() => {
                        swal("No Items Chosen", "Please Pick Your Item First!", {
                            icon: "error",
                        });
                    }}>
                        <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        { 
                          // If we have cart items
                          // Showing the cart count 
                          counter.cartCount !== 0 && (
                            <span className="top-0 left-6 absolute w-7 h-7 pl-2 bg-red-600 border-2 border-white dark:border-gray-800 rounded-full text-white">{counter.cartCount}</span>
                          )
                        }
                    </div>
                    )
                  ) 
                    : 
                  // If we're not yet logged in
                  // Showing Login Modal after click cart
                  (
                    <div onClick={() => modal(true)}>
                        <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        { 
                          // If we have cart items
                          // Showing the cart count 
                          counter.cartCount !== 0 && (
                            <span className="top-0 left-6 absolute w-7 h-7 pl-2 bg-red-600 border-2 border-white dark:border-gray-800 rounded-full text-white">{counter.cartCount}</span>
                          )
                        }
                    </div>
                  )
                }
                </div>
                { 
                  // If we're not yet logged in
                  // Showing Login Modal after click account
                  auth.user === null ? (
                      <svg onClick={() => modal(true)} className="cursor-pointer w-9 h-9 text-white ml-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  ) 
                    : 
                  // If we're already logged in
                  // Go direct to page account
                  (
                    <Link to="/account">
                        <div className="cursor-pointer w-9 h-9  ml-10">
                            <ButtonCircle 
                              color='blue'
                              // make initial of account name 
                              icon={auth.user !== null && auth.user.full_name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()} 
                              size="large"/>
                        </div>
                    </Link>
                  )
                } 
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
