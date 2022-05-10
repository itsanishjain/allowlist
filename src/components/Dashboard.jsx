import React from 'react'

export default function Dashboard({ data }) {

    console.log("DDDDDDDDDDDDDDDDDDDddd", data)

    return (
        <div>
            <p>YOur projects</p>
            <div>
                {
                    data && (
                        <>
                            <p>{data.name}</p>
                            {data.description}
                        </>
                    )
                }
            </div>
            <hr />
        </div>
    )
}
