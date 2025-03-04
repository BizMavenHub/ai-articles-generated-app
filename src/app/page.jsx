import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Import Components
import NavbarComponent from "@/components/NavbarComponent";
import FooterComponent from "@/components/FooterComponent";

export default function Home() {
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
            AI—effortless, fast, and engaging.
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
            src="./hero.svg"
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
            src="./about-us.svg"
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

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 px-4 md:px-8 lg:px-16 min-h-screen flex items-center"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Pricing
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Choose a plan that fits your needs—whether you're a blogger,
            marketer, or business owner, we have flexible pricing options to
            help you create high-quality content effortlessly
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="border rounded-lg p-8 flex flex-col h-full">
              <h3 className="text-xl font-bold mb-2">Free Plan</h3>
              <div className="text-3xl font-bold mb-4">
                $0{" "}
                <span className="text-sm text-gray-500 font-normal">
                  /Month
                </span>
              </div>
              <p className="text-gray-600 mb-6 h-[4rem]">
                Perfect for individuals who need essential features to get
                started. Includes access to core tools and limited support.
              </p>
              <ul className="space-y-5 mb-8">
                <li className="flex items-start">
                  <div className="bg-indigo-600 rounded-full p-1 mr-2 mt-1">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <span>Generate up to 3 articles / day</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-600 rounded-full p-1 mr-2 mt-1">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <span>Basic grammar check</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-600 rounded-full p-1 mr-2 mt-1">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <span>Basic SEO suggestions</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-600 rounded-full p-1 mr-2 mt-1">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <span>Limited AI writing styles</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-600 rounded-full p-1 mr-2 mt-1">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <span>Limited Reword & Improve</span>
                </li>
              </ul>
              <div className="items-end float-end">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 h-14 rounded-md w-full">
                  Choose Plan
                </Button>
              </div>
            </div>

            {/* Base Plan */}
            <div className="bg-indigo-600 text-white rounded-lg p-8 flex flex-col h-full">
              <h3 className="text-xl font-bold mb-2">Base Plan</h3>
              <div className="text-3xl font-bold mb-4">
                $5.99{" "}
                <span className="text-sm text-indigo-200 font-normal">
                  /Month
                </span>
              </div>
              <p className="text-indigo-100 mb-6 h-[4rem]">
                Excellent for businesses who need more features to grow.
                Includes all access to core tools support.
              </p>
              <ul className="space-y-5 mb-8">
                <li className="flex items-start">
                  <div className="bg-white rounded-full p-1 mr-2 mt-1">
                    <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                  </div>
                  <span>Generate up to 15 articles / day</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white rounded-full p-1 mr-2 mt-1">
                    <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                  </div>
                  <span>Advanced grammar check</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white rounded-full p-1 mr-2 mt-1">
                    <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                  </div>
                  <span>Enhanced SEO Optimization</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white rounded-full p-1 mr-2 mt-1">
                    <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                  </div>
                  <span>Advanced Writing Styles</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white rounded-full p-1 mr-2 mt-1">
                    <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                  </div>
                  <span>Unlimited Reword & Improve</span>
                </li>
              </ul>
              <div className="items-end float-end">
                <Button className="bg-white hover:bg-gray-100 text-indigo-600 py-6 rounded-md w-full">
                  Choose Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterComponent />
    </main>
  );
}
