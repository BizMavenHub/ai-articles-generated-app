import React from "react"
import SignInForm from "@/components/SignInForm"

export const metadata = {
  title: "AI Content Generator | Login",
  description: "Generate high-quality content with AI",
};

function page() {

  return (
    <div className="flex min-h-screen bg-[#f1f3f6]">
      {/* Left side - Form */}
      <div className="w-full flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <h1 className="text-3xl text-center font-bold">Welcome back!</h1>
          </div>

          <SignInForm />

        </div>
      </div>
    </div>
  )
}

export default page