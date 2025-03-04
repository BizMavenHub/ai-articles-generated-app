import React from "react";
import Link from "next/link";

const NavbarComponent = () => {
  const isLoggedIn = false;

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
            href="#"
            className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium"
          >
            Login
          </Link>
          <Link
            href="#"
            className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium"
          >
            Get Started
          </Link>
        </div>
        <div className="md:hidden">
          {/* Mobile menu button would go here */}
          <button className="text-white">Menu</button>
        </div>
      </nav>
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
          <button className="text-white">Menu</button>
        </div>
      </nav>
    );
  };

  return isLoggedIn ? <AfterLogin /> : <BeforeLogin />;
};

export default NavbarComponent;
