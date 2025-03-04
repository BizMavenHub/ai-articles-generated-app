import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-around  min-h-screen">
        <div className="md:w-1/2 mb-10 md:mb-0 w-3/4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
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
      <footer className="bg-black text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-4">Name & Logo</h3>
            <div className="flex justify-center space-x-6">
              <Link href="#" aria-label="Facebook">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
              <Link href="#" aria-label="Instagram">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
              <Link href="#" aria-label="Reddit">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="sr-only">Reddit</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm6 9c0-.793-.652-1.436-1.45-1.436-.337 0-.672.118-.942.336-1.091-.863-2.559-1.376-4.127-1.425l.912-2.8 2.94.72c.058.538.498.944 1.03.944.57 0 1.034-.47 1.034-1.05 0-.58-.464-1.05-1.034-1.05-.392 0-.754.23-.93.584l-3.307-.806c-.099-.025-.201-.005-.283.05-.082.056-.137.147-.149.246l-1.015 3.12c-1.531.07-2.96.586-4.022 1.445-.27-.218-.605-.336-.942-.336-.798 0-1.45.643-1.45 1.436 0 .512.273.985.708 1.24-.043.177-.065.36-.065.545 0 2.587 2.955 4.692 6.599 4.692 3.644 0 6.599-2.104 6.599-4.692 0-.185-.022-.368-.065-.545.435-.255.708-.728.708-1.24zm-10.726.515c0-.534.43-.968.96-.968.53 0 .96.434.96.968 0 .535-.43.968-.96.968-.53 0-.96-.434-.96-.968zm5.43 2.909c-.73.732-1.89 1.088-3.52 1.088-1.628 0-2.789-.356-3.519-1.088-.101-.101-.101-.265 0-.366.101-.101.264-.101.365 0 .629.629 1.676.925 3.154.925 1.477 0 2.524-.296 3.154-.925.101-.101.264-.101.365 0 .101.101.101.265 0 .366zm-.285-1.941c-.53 0-.96-.434-.96-.968 0-.535.43-.968.96-.968.53 0 .96.434.96.968 0 .535-.43.968-.96.968z" />
                  </svg>
                </div>
              </Link>
              <Link href="#" aria-label="GitHub">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
              <Link href="#" aria-label="Twitter">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            <Link href="/" className="hover:text-indigo-400">
              Home
            </Link>
            <Link href="#about" className="hover:text-indigo-400">
              About Us
            </Link>
            <Link href="#pricing" className="hover:text-indigo-400">
              Pricing
            </Link>
            <Link href="#" className="hover:text-indigo-400">
              Feedback
            </Link>
            <Link href="#" className="hover:text-indigo-400">
              Policy Privacy
            </Link>
            <Link href="#" className="hover:text-indigo-400">
              Term and Condition
            </Link>
          </div>

          <div className="text-center text-sm text-gray-400">
            <p>Copyright © 2024 AIWriterApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
