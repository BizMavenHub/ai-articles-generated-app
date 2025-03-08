import React from "react"
import Image from "next/image";

import SignUpForm from "@/components/SignUpForm"

export const metadata = {
  title: "AI Content Generator | Sign Up",
  description: "Generate high-quality content with AI",
};

const page = () => {
  return (
    <div className="flex min-h-screen bg-[#f1f3f6]">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-16 justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="flex space-x-0.5 mr-2">
            </div>
            <h1 className="text-2xl font-bold">App Name</h1>
          </div>

          <h2 className="text-xl font-bold mb-8">Create your account</h2>

          <SignUpForm />

        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#f1f3f6] items-center justify-center p-12">
        <Image
          src="/login-illustration.svg"
          alt="Signup illustration"
          width={600}
          height={400}
          priority
          className="max-w-full h-auto max-h-[80vh]"
        />
      </div>
    </div>
  )
}

export default page

