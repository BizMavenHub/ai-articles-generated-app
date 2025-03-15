"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

// Import Components
import NavbarComponent from "@/components/NavbarComponent";
import FooterComponent from "@/components/FooterComponent";

import { useRouter } from "next/navigation";
import { useAuthContext } from '@/context/authenticationContext'

export default function Home() {

  const { session } = useAuthContext();

  const router = useRouter();

  if (session) {
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <NavbarComponent />

      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-around  min-h-screen">
        <div className="md:w-1/2 mb-10 md:mb-0 w-3/4">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6">
            Bringing AI-generated creativity to your screen.
          </h1>
          <p className="text-lg mb-8 text-gray-700">
            Instantly create high-quality content with the power of
            AI-effortless, fast, and engaging.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-7 rounded-md">
              Get Started Now
            </Button>
            <Button
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-12 py-7 rounded-md"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="">
          <Image
            src="/hero.svg"
            alt="Person creating content with AI"
            width={600}
            height={200}
            priority
          />
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-indigo-600 text-white min-h-screen px-4 md:px-8 lg:px-16 flex flex-col md:flex-row justify-around items-center"
      >
        <div className="">
          <Image
            src="/about-us.svg"
            alt="Team collaboration"
            width={800}
            height={400}
          />
        </div>
        <div className="md:w-1/3">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">About Our App</h2>
          <p className="text-xl leading-relaxed">
            Unlock the power of AI-driven content creation with our advanced
            writing tool. Whether you're crafting blog posts, social media
            captions, or marketing copy, our AI seamlessly generates
            high-quality content in seconds. Say goodbye to writer's block and
            hello to effortless creativity—designed to save you time while
            delivering engaging and professional results. Experience the future
            of writing today!
          </p>
        </div>
      </section>

      {/* Footer */}
      <FooterComponent />
    </main>
  );
}
