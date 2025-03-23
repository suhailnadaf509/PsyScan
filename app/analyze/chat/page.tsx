"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, RefreshCw } from "lucide-react"
import { EmotionResults } from "@/components/analysis/emotion-results"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hi there! I'm here to chat with you. How are you feeling today?",
    sender: "bot",
    timestamp: new Date(),
  },
]

const botResponses = [
  "Can you tell me more about that?",
  "How long have you been feeling this way?",
  "What do you think might be contributing to these feelings?",
  "Have you noticed any changes in your sleep or appetite recently?",
  "Do you have anyone you can talk to about these feelings?",
  "What activities usually help you feel better?",
  "On a scale of 1-10, how would you rate your mood today?",
  "Have you tried any relaxation techniques or mindfulness practices?",
  "Is there anything specific that's been on your mind lately?",
  "How have your energy levels been recently?",
]

export default function ChatAnalysisPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")
    setMessageCount((prev) => prev + 1)

    // Simulate bot response after a short delay
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newBotMessage])
    }, 1000)

    // Check if we've reached enough messages for analysis
    if (messageCount >= 4) {
      // Enable the analyze button
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const startAnalysis = () => {
    setIsAnalyzing(true)

    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisComplete(true)
    }, 3000)
  }

  const resetChat = () => {
    setMessages(initialMessages)
    setMessageCount(0)
    setAnalysisComplete(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600">
            Chat Analysis
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Card className="overflow-hidden border-pink-200 dark:border-pink-800">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 text-white">
                <h2 className="text-xl font-semibold">Chat with AI</h2>
                <p className="text-sm text-pink-100">Have a conversation to analyze your emotional state</p>
              </div>
              <CardContent className="p-0">
                <div className="flex h-[500px] flex-col">
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              message.sender === "user"
                                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                            }`}
                          >
                            <p>{message.content}</p>
                            <p className="mt-1 text-right text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                    <div className="flex space-x-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        className="border-pink-200 dark:border-pink-800"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <p className="text-sm text-gray-500">
                        {messageCount < 5
                          ? `Send ${5 - messageCount} more messages for analysis`
                          : "Ready for analysis"}
                      </p>

                      {messageCount >= 5 && !analysisComplete && (
                        <Button
                          onClick={startAnalysis}
                          disabled={isAnalyzing}
                          variant="outline"
                          className="border-pink-500 text-pink-600"
                        >
                          {isAnalyzing ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            "Analyze Conversation"
                          )}
                        </Button>
                      )}

                      {analysisComplete && (
                        <Button onClick={resetChat} variant="outline" className="border-gray-300 text-gray-600">
                          Start New Chat
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            {analysisComplete ? (
              <Card className="border-rose-200 dark:border-rose-800">
                <div className="bg-gradient-to-r from-rose-500 to-red-500 p-4 text-white">
                  <h2 className="text-xl font-semibold">Analysis Results</h2>
                  <p className="text-sm text-rose-100">Your emotional well-being assessment</p>
                </div>
                <CardContent className="p-6">
                  <EmotionResults />
                </CardContent>
              </Card>
            ) : (
              <Card className="border-rose-200 dark:border-rose-800 bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/30 dark:to-red-900/30">
                <div className="bg-gradient-to-r from-rose-500 to-red-500 p-4 text-white">
                  <h2 className="text-xl font-semibold">How It Works</h2>
                  <p className="text-sm text-rose-100">Understanding the chat analysis process</p>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-300">
                        1
                      </div>
                      <div>
                        <h3 className="font-medium text-rose-700 dark:text-rose-300">Have a Conversation</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Chat naturally with our AI about how you're feeling and what's on your mind.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-300">
                        2
                      </div>
                      <div>
                        <h3 className="font-medium text-rose-700 dark:text-rose-300">AI Analysis</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Our AI analyzes your language patterns, word choice, and emotional expressions.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-300">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium text-rose-700 dark:text-rose-300">Get Your Results</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Receive a detailed analysis of your emotional state and well-being score.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-rose-100 p-4 dark:bg-rose-900/50">
                      <p className="text-sm text-rose-700 dark:text-rose-300">
                        <strong>Privacy Note:</strong> Your conversation is processed securely and is not stored
                        permanently. We prioritize your privacy and data security.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

