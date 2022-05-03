import React from 'react'

export default function Dashboard({ data }) {

    console.log("DDDDDDDDDDDDDDDDDDDddd",data)

    return (
        <div>
            <p>YOur projects</p>
            <div>
                {
                    data && (
                        <>
                            {data.name}
                            {data.description}
                        </>
                    )
                }
            </div>

        </div>
    )
}
