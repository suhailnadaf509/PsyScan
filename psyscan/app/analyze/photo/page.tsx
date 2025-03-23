"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Camera, Upload, RefreshCw, ArrowLeft } from "lucide-react"
import { EmotionResults } from "@/components/emotion-results"

export default function PhotoAnalysisPage() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight)

        const imageDataUrl = canvasRef.current.toDataURL("image/png")
        setCapturedImage(imageDataUrl)

        // Stop the camera stream
        const stream = videoRef.current.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
        videoRef.current.srcObject = null
      }
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const resetCapture = () => {
    setCapturedImage(null)
    setAnalysisComplete(false)
    setProgress(0)
  }

  const analyzeImage = () => {
    setIsAnalyzing(true)

    // Simulate analysis progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setIsAnalyzing(false)
        setAnalysisComplete(true)
      }
    }, 150)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Photo & Video Analysis
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Card className="overflow-hidden border-blue-200 dark:border-blue-800">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-white">
                <h2 className="text-xl font-semibold">Capture or Upload</h2>
                <p className="text-sm text-blue-100">Take a photo or upload an image for emotion analysis</p>
              </div>
              <CardContent className="p-6">
                {!capturedImage ? (
                  <div className="space-y-4">
                    <div className="aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                      <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover" />
                      <canvas ref={canvasRef} className="hidden" />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={startCamera}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Start Camera
                      </Button>

                      <Button onClick={capturePhoto} variant="outline" className="border-blue-500 text-blue-600">
                        Take Photo
                      </Button>

                      <Button
                        onClick={triggerFileInput}
                        variant="outline"
                        className="border-indigo-500 text-indigo-600"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                      <img
                        src={capturedImage || "/placeholder.svg"}
                        alt="Captured"
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {!analysisComplete ? (
                        <>
                          <Button
                            onClick={analyzeImage}
                            disabled={isAnalyzing}
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                          >
                            {isAnalyzing ? (
                              <>
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                              </>
                            ) : (
                              "Analyze Image"
                            )}
                          </Button>

                          <Button onClick={resetCapture} variant="outline" className="border-gray-300 text-gray-600">
                            Reset
                          </Button>
                        </>
                      ) : (
                        <Button onClick={resetCapture} variant="outline" className="border-gray-300 text-gray-600">
                          Analyze Another Image
                        </Button>
                      )}
                    </div>

                    {isAnalyzing && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Analyzing image...</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress
                          value={progress}
                          className="h-2 bg-blue-100"
                          indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-500"
                        />
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            {analysisComplete ? (
              <Card className="border-indigo-200 dark:border-indigo-800">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
                  <h2 className="text-xl font-semibold">Analysis Results</h2>
                  <p className="text-sm text-indigo-100">Your emotional well-being assessment</p>
                </div>
                <CardContent className="p-6">
                  <EmotionResults />
                </CardContent>
              </Card>
            ) : (
              <Card className="border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
                  <h2 className="text-xl font-semibold">How It Works</h2>
                  <p className="text-sm text-indigo-100">Understanding the photo analysis process</p>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                        1
                      </div>
                      <div>
                        <h3 className="font-medium text-indigo-700 dark:text-indigo-300">Capture a Clear Image</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Take a photo with your face clearly visible in good lighting.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                        2
                      </div>
                      <div>
                        <h3 className="font-medium text-indigo-700 dark:text-indigo-300">AI Analysis</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Our AI analyzes facial expressions, micro-expressions, and visual cues.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium text-indigo-700 dark:text-indigo-300">Get Your Results</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Receive a detailed analysis of your emotional state and well-being score.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-indigo-100 p-4 dark:bg-indigo-900/50">
                      <p className="text-sm text-indigo-700 dark:text-indigo-300">
                        <strong>Privacy Note:</strong> Your images are processed securely and are not stored
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

