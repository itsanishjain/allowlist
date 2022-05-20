import React from "react";

const RegisterUserList = ({ users }) => (
  <div className="bg-gradient-to-r from-purple-200  p-8 rounded-md">
    {users?.map((user, index) => (
      <div key={index}>
        <p className=" flex justify-between items-center  space-y-4">
          <span>{index + 1}</span>
          <span>{user}</span>
        </p>
      </div>
    ))}
  </div>
);

export default RegisterUserList;
