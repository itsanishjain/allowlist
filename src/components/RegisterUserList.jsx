import React from "react";

const RegisterUserList = ({ users }) => (
  <div className="max-w-xl mx-auto">
    <div className='bg-gradient-to-r from-orange-200 p-8 rounded-md'>
      {users?.map((user, index) => (
        <div key={index}>
          <p className='flex items-center justify-between'>
            <span className="text-md">{index + 1}.</span>
            <span className="text-md">{user}</span>
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default RegisterUserList;
