import React from "react";
import Image from "next/image";

import hero from "../src/images/AllowlistFinalNFT.png";
import astronaut from "../src/images/astronaut.png";
import robot from "../src/images/robot.png";
import avtar1 from "../src/images/anish-bhai.png";
import avtar2 from "../src/images/ayush-bhai.jpg";
import Link from "next/link";
import Head from "next/head";

const App = () => (
  <div>
    <Head>
      <title>Allowlist</title>
      <meta property="og:title" content="Allowlist" />
      <meta property="og:description" content="A tool that allows creator to get whitelisting for their upcoming project" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/AllowlistNFT.jpg" />
      <meta property="og:url" content="https://www.allowlist.live/" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.allowlist.live/" />
      <meta property="twitter:title" content="Allowlist" />
      <meta property="twitter:description" content="A tool that allows creator to get whitelisting for their upcoming project" />
      <meta property="twitter:image" content="https://user-images.githubusercontent.com/43033153/170791310-c476115b-4073-48c5-8240-b31a99894648.jpg" />

    </Head>
    <section className='px-2 py-20 bg-white md:px-0'>
      <div className='container items-center max-w-6xl px-8 mx-auto xl:px-5'>
        <div className='flex flex-wrap items-center sm:-mx-3'>
          <div className='w-full md:w-1/2 md:px-3'>
            <div className='w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-7 sm:pr-5 lg:pr-0 md:pb-0'>
              <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl'>
                <span className='block xl:inline'>Allowlist</span>
              </h1>
              <p className='mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl'>
                A tool that allows creator to get whitelisting for their
                upcoming project
              </p>
              <div className='relative flex flex-col sm:flex-row sm:space-x-4'>
                <Link href='/activate-pass' passHref>
                  <a className='flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-orange-500 rounded-md sm:mb-0 hover:bg-orange-700 sm:w-auto'>
                    Buy Our NFT
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5 ml-1'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'>
                      <line x1='5' y1='12' x2='19' y2='12'></line>
                      <polyline points='12 5 19 12 12 19'></polyline>
                    </svg>
                  </a>
                </Link>
                <a
                  href='https://youtu.be/QssdpvEeokk'
                  target='_blank'
                  rel="noreferrer"
                  className='flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600'>
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className='w-full md:w-1/2'>
            <div className='w-full h-auto overflow-hidden object-cover'>
              <Image src={hero} alt='hero image' />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className='w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24'>
      <div className='box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16'>
        <div className='box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10'>
          <Image
            src={astronaut}
            className='p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 '
            width='300px'
            height='300px'
            alt='image'
          />
        </div>

        <div className='box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none'>
          <h2 className='m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl'>
            Roadmap
          </h2>
          <p className='pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg'>
            We&apos;re going to create a slew of tools to assist
            creators/artists in obtaining the finest possible allowlist for
            their projects.
          </p>
          <ul className='p-0 m-0 leading-6 border-0 border-gray-300 space-y-2'>
            <li className='box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex'>
              <span className='inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-orange-500 rounded-full'>
                <span className='text-sm font-bold'>✓</span>
              </span>
              Using Twitter and Discord to authorize
              <br />
              projects so that users can&apos;t spam their allowlist
            </li>
            <li className='box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex'>
              <span className='inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-orange-500 rounded-full'>
                <span className='text-sm font-bold'>✓</span>
              </span>
              Filtering users with multiple accounts automatically
              <br />
              by keeping track of their transaction activities
            </li>
            <li className='box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex'>
              <span className='inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-orange-500 rounded-full'>
                <span className='text-sm font-bold'>✓</span>
              </span>
              Adding support for multiple wallets to the login process
            </li>
          </ul>
        </div>
      </div>
      {/* <div className='box-border flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16'>
        <div className='box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32'>
          <h2 className='m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl'>
            Automated Tasks
          </h2>
          <p className='pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-10 lg:text-lg'>
            Save time and money with our revolutionary services. We are the
            leaders in the industry.
          </p>
          <ul className='p-0 m-0 leading-6 border-0 border-gray-300'>
            <li className='box-border relative py-1 pl-0 text-left text-gray-500 border-solid'>
              <span className='inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-orange-500 rounded-full'>
                <span className='text-sm font-bold'>✓</span>
              </span>
              Automated task management
            </li>
            <li className='box-border relative py-1 pl-0 text-left text-gray-500 border-solid'>
              <span className='inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-orange-500 rounded-full'>
                <span className='text-sm font-bold'>✓</span>
              </span>
              Detailed analytics for your data
            </li>
            <li className='box-border relative py-1 pl-0 text-left text-gray-500 border-solid'>
              <span className='inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-orange-500 rounded-full'>
                <span className='text-sm font-bold'>✓</span>
              </span>
              Some awesome integrations
            </li>
          </ul>
        </div>
        <div className='box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2'>
          <Image
            src={robot}
            className='pl-4 sm:pr-10 xl:pl-10 lg:pr-32'
            width='300px'
            height='300px'
            alt='image'
          />
        </div>
      </div> */}
    </section>
    <section className='w-full py-12 bg-white lg:py-24 '>
      <div className='max-w-6xl px-12 mx-auto text-center'>
        <div className='space-y-12 md:text-center'>
          <div className='max-w-3xl mb-20 space-y-5 sm:mx-auto sm:space-y-4'>
            <h2 className='relative text-4xl font-extrabold tracking-tight sm:text-5xl'>
              Our Awesome Team
            </h2>
            <p className='text-xl text-gray-500'>
              We take pride in the people we work with. This is because we all
              collectively help each other become more awesome every day.
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2'>
          <div className='w-full border border-gray-200 rounded-lg shadow-sm'>
            <div className='flex flex-col items-center justify-center p-10'>
              <Image
                className='w-32 h-32 mb-6 rounded-full'
                src={avtar1}
                alt='image'
              />
              <h2 className='text-lg font-medium'>Anish Jain</h2>
              <p className='font-medium text-blue-500'>
                Backend Dev and Founder
              </p>
              <p className='text-gray-400'>Believes in learning and building</p>
            </div>

            <div className='flex border-t border-gray-200 divide-x divide-gray-200'>
              <a
                href='https://twitter.com/itsanishjain'
                className='flex-1 block p-5 text-center text-blue-500 transition duration-200 ease-out hover:bg-gray-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6 mx-auto fill-current'
                  viewBox='0 0 24 24'>
                  <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
                </svg>
              </a>
              <a
                href='https://github.com/itsanishjain'
                className='flex-1 block p-5 text-center text-gray-500 transition duration-200 ease-out hover:bg-gray-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6 mx-auto fill-current'
                  viewBox='0 0 24 24'>
                  <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default App;
