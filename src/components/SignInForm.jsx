"use client";

import React from "react";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";

import { useAuthContext } from "@/context/authenticationContext";
import { useRouter } from "next/navigation";

import supabase from "@/lib/supabaseClient";

const SignInForm = () => {
  const router = useRouter();
  const { signInWithEmailPassword } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!email || !password) {
        setError("Please fill all the fields");
        return;
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email address");
        return;
      }

      const result = await signInWithEmailPassword(email, password);

      if (!result.success) {
        setError(result.message);
        setLoading(false);
        return;
      }

      await supabase.auth.setSession(result);

      setError(null);
      setLoading(false);

      setEmail("");
      setPassword("");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithOAuth = async (provider) => {
    try {
      setLoading(true);

      const { data, error: loginError } = await supabase.auth.signInWithOAuth({
        provider: provider,
      });

      if (loginError) {
        setError(error.message);
        return;
      }

      await supabase.auth.setSession(data);

      setError(null);
      setWarning(null);
      setLoading(false);

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4942e4]"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#4942e4] text-white p-1.5 rounded-md">
            <Mail size={16} />
          </button>
        </div>
      </div>

      <div className="mb-2">
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4942e4]"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#4942e4] text-white p-1.5 rounded-md">
            <Lock size={16} />
          </button>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <button
          type="button"
          className="text-sm text-[#4942e4] hover:underline">
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-[#4942e4] text-white py-3 rounded-md hover:bg-[#3835b0] transition duration-300">
        Sign In Now
      </button>

      <div>{error && <p className="text-red-500 text-sm mt-2">{error}</p>}</div>

      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm">OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <button
        type="button"
        onClick={() => handleSignInWithOAuth("google")}
        className="w-full mb-3 flex items-center justify-center border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition duration-300">
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
        Continue with Google
      </button>

      <button
        type="button"
        onClick={() => handleSignInWithOAuth("github")}
        className="w-full flex items-center justify-center bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-300">
        <svg className="w-5 h-5 mr-2" fill="white" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
        Continue with GitHub
      </button>

      <div className="mt-8 text-center flex justify-center items-center space-x-2">
        <p className="text-sm">Don't have an account? </p>
        <Link
          href={"/sign-up"}
          className="text-[#4942e4] font-medium hover:underline">
          Create now!
        </Link>
      </div>

      <div className="flex justify-center">
        <Link
          href="/"
          className="text-[#4942e4] my-3 font-medium hover:underline">
          Back
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
