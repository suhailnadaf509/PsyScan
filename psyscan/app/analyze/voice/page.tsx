"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Mic, Square, RefreshCw, ArrowLeft, Play, Pause } from "lucide-react";
import { EmotionResults } from "@/components/text_result";

export default function VoiceAnalysisPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setIsPlaying(false);
    setAnalysisComplete(false);
    setProgress(0);
  };

  const analyzeAudio = () => {
    setIsAnalyzing(true);

    // Simulate analysis progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }
    }, 150);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-fuchsia-50 dark:from-purple-950 dark:to-fuchsia-950">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-fuchsia-600">
            Voice Analysis
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Card className="overflow-hidden border-purple-200 dark:border-purple-800">
              <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 p-4 text-white">
                <h2 className="text-xl font-semibold">Record Your Voice</h2>
                <p className="text-sm text-purple-100">
                  Speak naturally for at least 30 seconds for best results
                </p>
              </div>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-100 to-fuchsia-100 p-8 dark:from-purple-900/30 dark:to-fuchsia-900/30">
                    {isRecording ? (
                      <div className="flex flex-col items-center">
                        <div className="mb-4 h-24 w-24 animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 flex items-center justify-center">
                          <Mic className="h-12 w-12 text-white" />
                        </div>
                        <div className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                          {formatTime(recordingTime)}
                        </div>
                      </div>
                    ) : audioUrl ? (
                      <div className="flex w-full flex-col items-center">
                        <audio
                          ref={audioRef}
                          src={audioUrl}
                          onEnded={() => setIsPlaying(false)}
                          className="hidden"
                        />
                        <div className="mb-4 flex items-center space-x-4">
                          <Button
                            onClick={togglePlayback}
                            className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 p-0"
                          >
                            {isPlaying ? (
                              <Pause className="h-6 w-6" />
                            ) : (
                              <Play className="h-6 w-6" />
                            )}
                          </Button>
                          <div className="text-purple-700 dark:text-purple-300">
                            {formatTime(recordingTime)}
                          </div>
                        </div>
                        <div className="w-full rounded-full bg-purple-100 h-2 dark:bg-purple-900/50">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="mb-4 h-24 w-24 rounded-full bg-gradient-to-r from-purple-200 to-fuchsia-200 flex items-center justify-center dark:from-purple-800 dark:to-fuchsia-800">
                          <Mic className="h-12 w-12 text-purple-500 dark:text-purple-300" />
                        </div>
                        <div className="text-sm text-purple-700 dark:text-purple-300">
                          Tap record to start
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center">
                    {!audioUrl ? (
                      isRecording ? (
                        <Button
                          onClick={stopRecording}
                          variant="destructive"
                          className="bg-gradient-to-r from-red-500 to-pink-500"
                        >
                          <Square className="mr-2 h-4 w-4" />
                          Stop Recording
                        </Button>
                      ) : (
                        <Button
                          onClick={startRecording}
                          className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600"
                        >
                          <Mic className="mr-2 h-4 w-4" />
                          Start Recording
                        </Button>
                      )
                    ) : !analysisComplete ? (
                      <>
                        <Button
                          onClick={analyzeAudio}
                          disabled={isAnalyzing}
                          className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600"
                        >
                          {isAnalyzing ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            "Analyze Voice"
                          )}
                        </Button>

                        <Button
                          onClick={resetRecording}
                          variant="outline"
                          className="border-gray-300 text-gray-600"
                        >
                          Reset
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={resetRecording}
                        variant="outline"
                        className="border-gray-300 text-gray-600"
                      >
                        Record Another Sample
                      </Button>
                    )}
                  </div>

                  {isAnalyzing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Analyzing voice patterns...</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress
                        value={progress}
                        className="h-2 bg-purple-100"
                        indicatorClassName="bg-gradient-to-r from-purple-500 to-fuchsia-500"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            {analysisComplete ? (
              <Card className="border-fuchsia-200 dark:border-fuchsia-800">
                <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 p-4 text-white">
                  <h2 className="text-xl font-semibold">Analysis Results</h2>
                  <p className="text-sm text-fuchsia-100">
                    Your emotional well-being assessment
                  </p>
                </div>
                <CardContent className="p-6">
                  <EmotionResults />
                </CardContent>
              </Card>
            ) : (
              <Card className="border-fuchsia-200 dark:border-fuchsia-800 bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/30 dark:to-pink-900/30">
                <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 p-4 text-white">
                  <h2 className="text-xl font-semibold">How It Works</h2>
                  <p className="text-sm text-fuchsia-100">
                    Understanding the voice analysis process
                  </p>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900 dark:text-fuchsia-300">
                        1
                      </div>
                      <div>
                        <h3 className="font-medium text-fuchsia-700 dark:text-fuchsia-300">
                          Record Your Voice
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Speak naturally for at least 30 seconds about how your
                          day is going.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900 dark:text-fuchsia-300">
                        2
                      </div>
                      <div>
                        <h3 className="font-medium text-fuchsia-700 dark:text-fuchsia-300">
                          AI Analysis
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Our AI analyzes tone, pitch, speech patterns, and
                          vocal energy.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900 dark:text-fuchsia-300">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium text-fuchsia-700 dark:text-fuchsia-300">
                          Get Your Results
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Receive a detailed analysis of your emotional state
                          and well-being score.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-fuchsia-100 p-4 dark:bg-fuchsia-900/50">
                      <p className="text-sm text-fuchsia-700 dark:text-fuchsia-300">
                        <strong>Privacy Note:</strong> Your voice recordings are
                        processed securely and are not stored permanently. We
                        prioritize your privacy and data security.
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
  );
}
