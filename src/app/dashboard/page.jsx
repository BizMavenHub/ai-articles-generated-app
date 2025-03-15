"use client"

import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuthContext } from '@/context/authenticationContext';


const page = () => {
    const router = useRouter();

    const { session, signOut } = useAuthContext();

    const handleSignOut = async () => {
        await signOut()
        router.push('/sign-in');
    }

    if (!session) {
        return (
            <Link href={'/sign-in'}>Please sign in</Link>
        )
    }

    console.log(session.user);

    return (
        <div><h1>Welcome to Dashboard</h1><button onClick={handleSignOut}>Logout</button></div>

    )
}

export default page