import { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";

import { UserContext } from "../context/UserContext";

const Navigation = () => {
  const [toggle, setToggle] = useState(false);

  const navRef = useRef();

  const { isLoggedIn, disconnect } = useContext(UserContext);

  const navigation = [
    { title: "Activate Pass", path: "/activate-pass" },
    { title: "Dashboard", path: "/dashboard" },
    { title: "Create project", path: "/dashboard/new" },
  ];

  const handleToggle = () => setToggle((prev) => !prev);

  useEffect(() => {
    const body = document.body;

    const customBodyStyle = ["overflow-hidden", "lg:overflow-visible"];
    // Disable scrolling
    if (toggle) body.classList.add(...customBodyStyle);
    // Enable scrolling
    else body.classList.remove(...customBodyStyle);

    // Sticky strick
    const customStyle = ["sticky-nav", "fixed", "border-b"];
    window.onscroll = () => {
      if (window.scrollY > 80) navRef.current.classList.add(...customStyle);
      else navRef.current.classList.remove(...customStyle);
    };
  }, [toggle]);

  return (
    <nav ref={navRef} className='bg-white w-full top-0 z-20'>
      <div className='items-center px-4 max-w-screen-xl mx-auto lg:flex lg:px-8'>
        <div className='flex items-center justify-between py-3 lg:py-4 lg:block'>
          <Link href='/'>
            <a className='mx-auto text-xl font-black leading-none text-gray-900 select-none'>
              Home<span className='text-purple-500'>.</span>
            </a>
          </Link>
          <div className='lg:hidden'>
            <button
              className='text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border'
              onClick={handleToggle}>
              {toggle ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  viewBox='0 0 20 20'
                  fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 8h16M4 16h16'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-between flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto ${toggle ? "h-screen pb-20 overflow-auto pr-4" : "hidden"
            }`}>
          {!isLoggedIn ? (
            <div>
              <ul className='flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row'>
                <li className='mt-8 lg:mt-0 mb-8 lg:mb-0'>
                  <Link href='/login'>
                    <a
                      className='py-3 px-4 text-center text-white bg-purple-500 hover:bg-purple-700 rounded-md shadow block lg:inline'
                      onClick={handleToggle}>
                      Login
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <ul className='flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row'>
                <li className='mt-8 lg:mt-0 mb-8 lg:mb-0'>
                  <button
                    className='py-3 px-4 text-center text-white bg-purple-500 hover:bg-purple-700 rounded-md shadow block lg:inline'
                    onClick={disconnect}>
                    Disconnect
                  </button>
                </li>
              </ul>
            </div>
          )}
          <div className='flex-1'>
            <ul className='justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0'>
              {navigation.map((item, idx) => (
                <li key={idx} className='text-gray-600 hover:text-indigo-600'>
                  <Link href={item.path}>
                    <a onClick={handleToggle}>{item.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
