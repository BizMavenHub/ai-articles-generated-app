"use client";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Import Components
import NavbarComponent from "@/components/NavbarComponent";
import FooterComponent from "@/components/FooterComponent";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authenticationContext";

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
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-12 py-7 rounded-md">
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
        className="py-20 bg-indigo-600 text-white min-h-screen px-4 md:px-8 lg:px-16 flex flex-col md:flex-row justify-around items-center">
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

      {/* Features Section */}
      <section id="features" className="py-20 flex justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center gap-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Key Features
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Our platform provides all the tools you need to create, edit, and
              optimize your content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Feature 1 */}
            <div className="flex flex-col gap-4 p-6 border rounded-lg bg-card shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">AI-Powered Generation</h3>
              <p className="text-muted-foreground">
                Create high-quality articles with advanced AI technology that
                understands your needs.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Multiple writing styles</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Tone customization</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Keyword optimization</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col gap-4 p-6 border rounded-lg bg-card shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Advanced Editing</h3>
              <p className="text-muted-foreground">
                Powerful editing tools to refine and perfect your content.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Markdown support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Real-time preview</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Version history</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col gap-4 p-6 border rounded-lg bg-card shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Audience Targeting</h3>
              <p className="text-muted-foreground">
                Create content tailored to your specific audience demographics.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Audience presets</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Industry-specific content</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Readability analysis</span>
                </li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col gap-4 p-6 border rounded-lg bg-card shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">SEO Optimization</h3>
              <p className="text-muted-foreground">
                Boost your search rankings with built-in SEO tools.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Keyword research</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Meta description generation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Content structure optimization</span>
                </li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="flex flex-col gap-4 p-6 border rounded-lg bg-card shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Time-Saving Workflows</h3>
              <p className="text-muted-foreground">
                Cut your content creation time by up to 80% with streamlined
                processes.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Content calendar integration</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Batch article generation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Reusable content templates</span>
                </li>
              </ul>
            </div>

            {/* Feature 6 */}
            <div className="flex flex-col gap-4 p-6 border rounded-lg bg-card shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Analytics & Insights</h3>
              <p className="text-muted-foreground">
                Track performance and optimize your content strategy with
                detailed analytics.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Content performance metrics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Audience engagement tracking</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Improvement recommendations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-primary-foreground flex justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center gap-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Transform Your Content Strategy?
            </h2>
            <p className="max-w-[700px] md:text-xl">
              Join thousands of content creators who are saving time and
              producing better content.
            </p>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="px-8">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterComponent />
    </main>
  );
}
