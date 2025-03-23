import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Mic, MessageSquare, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
      <header className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-white p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="url(#logo-gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <defs>
                    <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2a8 8 0 0 0-8 8c0 1.5.5 2.5 1.5 3.5L12 20l6.5-6.5c1-1 1.5-2 1.5-3.5a8 8 0 0 0-8-8z" />
                  <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold">PsyScan</h1>
            </div>
            <nav className="flex space-x-4">
              <Link href="/dashboard" className="hover:text-pink-200">
                Dashboard
              </Link>
              <Link href="/about" className="hover:text-pink-200">
                About
              </Link>
              <Link href="/contact" className="hover:text-pink-200">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-pink-600">
            Your Mental Wellness Companion
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
            Track and understand your emotional well-being through photos, voice, and conversation. Get personalized
            insights to help you on your wellness journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white">
              Get Started
            </Button>
            <Button
              variant="outline"
              className="border-violet-500 text-violet-600 hover:bg-violet-50 dark:border-violet-400 dark:text-violet-400 dark:hover:bg-violet-950"
            >
              Learn More
            </Button>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/analyze/photo">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-800">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-bold text-blue-700 dark:text-blue-300">Photo & Video Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Upload photos or record videos to analyze your facial expressions and body language.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/analyze/voice">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-900/30 dark:to-fuchsia-900/30 border-purple-200 dark:border-purple-800">
              <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 p-4">
                <Mic className="h-8 w-8 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-bold text-purple-700 dark:text-purple-300">Voice Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Record voice memos to analyze your tone, speech patterns, and emotional cues.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/analyze/chat">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/30 border-pink-200 dark:border-pink-800">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-bold text-pink-700 dark:text-pink-300">Chat Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Chat with our AI to analyze your text responses for signs of depression or anxiety.
                </p>
              </CardContent>
            </Card>
          </Link>
        </section>

        <section className="mt-16">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-pink-600">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-gray-700 dark:text-gray-300">
              Our AI analyzes multiple inputs to provide a comprehensive assessment of your emotional well-being.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <Camera className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Capture</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload photos, record videos, or voice memos, or chat with our AI.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Analyze</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our AI analyzes your inputs for emotional patterns and cues.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                <BarChart3 className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Score</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive a depression and anxiety score based on the analysis.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Insights</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get personalized insights and recommendations for your well-being.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-violet-600 to-fuchsia-600 py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">PsyScan</h2>
              <p className="text-sm text-violet-200">Your mental health analysis tool</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-sm text-violet-200 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-violet-200 hover:text-white">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-sm text-violet-200 hover:text-white">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-violet-200">
            &copy; {new Date().getFullYear()} PsyScan. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

