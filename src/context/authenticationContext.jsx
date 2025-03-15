"use client"

import { useState, useEffect, createContext, useContext } from "react";
import supabase from "@/lib/supabaseClient";

const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    // Sign Up
    const signUpWithEmailPassword = async (username, email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username
                    // avatar_url: "https://example.com/avatar.jpg"
                }
            }
        })

        if (error) {
            console.log("There is an error: " + error.message);
            return { success: false, message: error.message };
        }

        return { success: true, message: "User created successfully", user: data.user };
    }

    // Sign In
    const signInWithEmailPassword = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })

            if (error) {
                console.log("There is an error: " + error.message);
                return { success: false, message: error.message };
            }

            return { success: true, message: "User signed in successfully", user: data.user };
        } catch (error) {
            console.log("There is an error: " + error.message);
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    // Sign Out
    const signOut = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.log("There is an error: " + error.message);
            return { success: false, message: error.message };
        }

        setSession(null)
    }

    return (
        <AuthContext.Provider value={{ session, signUpWithEmailPassword, signInWithEmailPassword, signOut }}>
            {children}
        </AuthContext.Provider >
    )
}

export const useAuthContext = () => { return useContext(AuthContext) };

