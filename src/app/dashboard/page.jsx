"use client"

import React from 'react'
import Link from 'next/link';

import { useAuthContext } from '@/context/authenticationContext'


const page = () => {

    const { session, signOut } = useAuthContext();

    if (!session) {
        return (
            <Link href={'/sign-in'}>Please sign in</Link>
        )
    }

    console.log(session);

    return (
        <div><h1>Welcome to Dashboard</h1><button onClick={() => signOut()}>Logout</button></div>

    )
}

export default page