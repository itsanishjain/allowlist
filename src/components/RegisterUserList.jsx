import React from "react";

const RegisterUserList = ({ users }) => (
  <div>
    <p>Registered Users:</p>
    {users.map((user, index) => (
      <p key={index}>
        {index}: {user}
      </p>
    ))}
  </div>
);

export default RegisterUserList;
