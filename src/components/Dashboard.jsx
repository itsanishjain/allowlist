import Link from "next/link";
import React from "react";
import Image from "next/image";

const Dashboard = ({ data }) => (
  <div className='m-8 mx-auto max-w-xl px-2'>
    <div
      className='flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 
        dark:hover:bg-gray-700'>
      {/* GOLDEN CODE */}
      <div className='w-full h-96 md:h-auto md:w-48'>
        <Image
          src={data.profileImage}
          alt='hero image'
          width='100%'
          height='100%'
          layout='responsive'
        />
      </div>

      <div className='flex flex-col justify-between p-4 leading-normal'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {data.name}
        </h5>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {data.description}
        </p>
        <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
          <Link href={`/${data.id}`}>
            <a className="bg-gradient-to-r from-orange-400 to-orange-600 p-2 block text-white rounded-sm text-center">Public Page</a>
          </Link>
          <Link href={`/dashboard/${data.id}/settings`}>
            <a className="bg-gradient-to-r from-orange-400 to-orange-600 p-2 block text-white rounded-sm text-center">Settings</a>
          </Link>
        </div>
      </div>
    </div>
    <hr />
  </div>
);

export default Dashboard;
