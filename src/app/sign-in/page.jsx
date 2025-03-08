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
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-16 justify-center">
        <div className="max-w-md mx-auto w-full">

          <div className="flex items-center mb-8">
            <h1 className="text-2xl font-bold">App Name</h1>
          </div>

          <h2 className="text-xl font-bold mb-8">Login into your account</h2>

          <SignInForm />

        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#f1f3f6] items-center justify-center p-12">
        <img
          src="./login-illustration.svg"
          alt="Login illustration"
          className="max-w-full h-auto max-h-[80vh]"
        />
      </div>
    </div>
  )
}

export default page