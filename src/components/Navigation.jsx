import Link from 'next/link'
import React from 'react'

export default function Navigation() {
    return (
        <div className='space-x-4'>
            <Link href="/">
                <a>Home</a>
            </Link>

            <Link href="/login">
                <a>Login</a>
            </Link>

            <Link href="/protected">
                <a>Protected</a>
            </Link>

            <Link href="/dashboard/new">
                <a>Create Project</a>
            </Link>

        </div>
    )
}
