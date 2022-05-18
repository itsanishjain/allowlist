import React from 'react'

const RegisterUserList = ({ users }) => {
    console.log(users)
    return (
        <div>
            <p>Registered Users:</p>
            {
                users.map((user, index) => (
                    <p key={index}>{index}: {user}</p>
                ))
            }
        </div>

    )
}

export default RegisterUserList