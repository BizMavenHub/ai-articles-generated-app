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
      <div className="w-full flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <h1 className="text-3xl text-center font-bold">Welcome to AI Content Generator</h1>
          </div>

          <SignUpForm />

        </div>
      </div>
    </div>
  )
}

export default page

