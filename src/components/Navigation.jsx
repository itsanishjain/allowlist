import React from "react";
import Link from "next/link";

const Navigation = () => (
  <div className='space-x-4'>
    <Link href='/'>
      <a>name not decied yet</a>
    </Link>

    <Link href='/login'>
      <a>Login</a>
    </Link>

    <Link href='/protected'>
      <a>Protected</a>
    </Link>

    <Link href='/dashboard/new'>
      <a>Create Project</a>
    </Link>

    <Link href='/dashboard/'>
      <a>Dashboard</a>
    </Link>

    <Link href='/users/2S5k5ROPPfzagQ7NnBuk'>Public link</Link>
    <Link href='/dashboard/2S5k5ROPPfzagQ7NnBuk/settings'>Update project</Link>
  </div>
);

export default Navigation;
