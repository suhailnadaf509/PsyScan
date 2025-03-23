"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { EmotionResults } from "@/components/text_result";
import { RefreshCw } from "lucide-react";

export default function TextAnalysisPage() {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<{
    depression_score: number;
    mood_assessment: string;
  } | null>(null);

  const analyzeText = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setProgress(0);

    // Start progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 150);

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setAnalysisResult(result);

      // Ensure progress reaches 100%
      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 500);
    } catch (error) {
      console.error("Error analyzing text:", error);
      clearInterval(interval);
      setIsAnalyzing(false);
      // Handle error state here
    }
  };

  const resetAnalysis = () => {
    setText("");
    setAnalysisComplete(false);
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-fuchsia-50 dark:from-purple-950 dark:to-fuchsia-950">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-fuchsia-600">
            Text Mood Analysis
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Card className="overflow-hidden border-purple-200 dark:border-purple-800">
              <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 p-4 text-white">
                <h2 className="text-xl font-semibold">Share Your Thoughts</h2>
                <p className="text-sm text-purple-100">
                  Write about how you're feeling for a more accurate analysis
                </p>
              </div>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your thoughts here... (at least 50 words for better analysis)"
                    className="min-h-32 border-purple-200 dark:border-purple-800"
                    disabled={isAnalyzing || analysisComplete}
                  />

                  <div className="flex flex-wrap gap-3 justify-center">
                    {!analysisComplete ? (
                      <>
                        <Button
                          onClick={analyzeText}
                          disabled={isAnalyzing || !text.trim()}
                          className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600"
                        >
                          {isAnalyzing ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            "Analyze Text"
                          )}
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={resetAnalysis}
                        variant="outline"
                        className="border-gray-300 text-gray-600"
                      >
                        Start New Analysis
                      </Button>
                    )}
                  </div>

                  {isAnalyzing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Analyzing text patterns...</span>
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
                  <EmotionResults analysisResult={analysisResult} />
                </CardContent>
              </Card>
            ) : (
              <Card className="border-fuchsia-200 dark:border-fuchsia-800 bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/30 dark:to-pink-900/30">
                <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 p-4 text-white">
                  <h2 className="text-xl font-semibold">How It Works</h2>
                  <p className="text-sm text-fuchsia-100">
                    Understanding the text analysis process
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
                          Share Your Thoughts
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Write about how you're feeling or what's on your mind.
                          The more details, the better the analysis.
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
                          Our AI analyzes your text for emotional patterns and
                          indicators of mental well-being.
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
                          and well-being score with personalized insights.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-fuchsia-100 p-4 dark:bg-fuchsia-900/50">
                      <p className="text-sm text-fuchsia-700 dark:text-fuchsia-300">
                        <strong>Privacy Note:</strong> Your text inputs are
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
