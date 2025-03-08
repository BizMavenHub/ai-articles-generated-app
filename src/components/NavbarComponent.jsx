"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Menu, X } from "lucide-react"

const NavbarComponent = () => {
  let isLoggedIn = false;
  const [isCollapsed, setCollapsed] = useState(false);

  const Nav_links = () => {
    return (
      <div className={`flex flex-col space-y-4 bg-indigo-600 w-full p-4 text-center transition-all`}>


        {isLoggedIn ? (
          <>
            <div className="flex items-center justify-center space-x-4">
              <div className="profile w-12 aspect-square rounded-full bg-white"></div> {/* Profile Picture Change to Image tag */}
            </div>
            <Link href="/" className="hover:text-indigo-200">
              Home
            </Link>
            <Link href="#about" className="hover:text-indigo-200">
              About Us
            </Link>
            <Link href="#pricing" className="hover:text-indigo-200">
              Pricing
            </Link>
            <Link href="#" className="hover:text-indigo-200">
              Feedback
            </Link>
            <Link
              href="#"
              className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium"
            >
              Dashboard
            </Link>

          </>

        ) : (
          <>
            <Link href="/" className="hover:text-indigo-200">
              Home
            </Link>
            <Link href="#about" className="hover:text-indigo-200">
              About Us
            </Link>
            <Link href="#pricing" className="hover:text-indigo-200">
              Pricing
            </Link>
            <Link href="#" className="hover:text-indigo-200">
              Feedback
            </Link>
            <Link
              href="sign-in"
              className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-700 hover:text-white transition duration-150 ease-in"
            >
              Sign In
            </Link>
            <Link
              href="sign-up"
              className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-700 hover:text-white transition duration-150 ease-in"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    );
  };

  const BeforeLogin = () => {
    return (
      <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <div className="font-bold text-xl">
          <Link href="/">AI Writer</Link>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-indigo-200">
            Home
          </Link>
          <Link href="#about" className="hover:text-indigo-200">
            About Us
          </Link>
          <Link href="#pricing" className="hover:text-indigo-200">
            Pricing
          </Link>
          <Link href="#" className="hover:text-indigo-200">
            Feedback
          </Link>
          <Link
            href="/sign-in"
            className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-700 hover:text-white transition duration-150 ease-in"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-700 hover:text-white transition duration-150 ease-in"
          >
            Get Started
          </Link>
        </div>
        <div className="md:hidden">
          {/* Mobile menu button would go here */}
          <button
            className="text-white p-2 hover:bg-indigo-700 rounded-md transition duration-100 ease-in"
            onClick={() => setCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <X size={24} /> : <Menu size={24} />}
          </button>
          {isCollapsed && (
            <div className="absolute left-0 top-16 w-full transform transition-transform duration-300 ease-in-out" >
              <Nav_links />
            </div>
          )}
        </div>
      </nav >
    );
  };

  const AfterLogin = () => {
    return (
      <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <div className="font-bold text-xl">
          <Link href="/">AI Writer</Link>
        </div>
        <div className="hidden md:flex space-x-12 items-center">
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-indigo-200">
              Home
            </Link>
            <Link href="#about" className="hover:text-indigo-200">
              About Us
            </Link>
            <Link href="#pricing" className="hover:text-indigo-200">
              Pricing
            </Link>
            <Link href="#" className="hover:text-indigo-200">
              Feedback
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="#"
              className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium"
            >
              Dashboard
            </Link>
            <div className="profile w-10 aspect-square rounded-full bg-white"></div>
          </div>
        </div>
        <div className="md:hidden">
          {/* Mobile menu button would go here */}
          <button
            className="text-white p-2 hover:bg-indigo-700 rounded-md transition duration-100 ease-in"
            onClick={() => setCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <X size={24} /> : <Menu size={24} />}
          </button>
          {isCollapsed && (
            <div className="absolute left-0 top-16 w-full transform transition-transform duration-300 ease-in-out" >
              <Nav_links />
            </div>
          )}
        </div>
      </nav>
    );
  };

  return isLoggedIn ? <AfterLogin /> : <BeforeLogin />;
};

export default NavbarComponent;
