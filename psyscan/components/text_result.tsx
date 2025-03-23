// text_result.tsx
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

// Define proper types for emotions and analysis result
type Emotion = "sadness" | "anxiety" | "anger" | "fear" | "joy";

interface Emotions {
  sadness: number;
  anxiety: number;
  anger: number;
  fear: number;
  joy: number;
}

interface AnalysisResult {
  depression_score: number;
  mood_assessment: string;
  severity: "low" | "mild" | "moderate" | "high";
  emotions: Emotions;
  text_stats: {
    word_count: number;
    sentence_count: number;
    avg_sentence_length: number;
  };
}

interface EmotionResultsProps {
  analysisResult?: AnalysisResult;
}

const COLORS = {
  sadness: "#60a5fa",
  anxiety: "#c084fc",
  anger: "#f87171",
  fear: "#fbbf24",
  joy: "#34d399",
};

const historicalData = [
  { date: "Mar 1", depression: 75, anxiety: 68 },
  { date: "Mar 8", depression: 70, anxiety: 65 },
  { date: "Mar 15", depression: 68, anxiety: 70 },
  { date: "Mar 22", depression: 65, anxiety: 72 },
];

export function EmotionResults({ analysisResult }: EmotionResultsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Safely use the API result or fallback to defaults
  const depressionScore = analysisResult 
    ? Math.round(analysisResult.depression_score * 100) 
    : 0;
  
  const moodAssessment = analysisResult?.mood_assessment || "No analysis available";
  const severity = analysisResult?.severity || "low";
  
  // If we have emotions, use them; otherwise create an empty object
  const emotions = analysisResult?.emotions || {
    sadness: 0,
    anxiety: 0,
    anger: 0,
    fear: 0,
    joy: 0
  };

  // Format emotions for chart display
  const emotionData = Object.entries(emotions).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: Math.round(value),
  }));

  const getScoreCategory = (score: number) => {
    if (score < 30) return { label: "Low", color: "text-green-500" };
    if (score < 50) return { label: "Mild", color: "text-yellow-500" };
    if (score < 75) return { label: "Moderate", color: "text-orange-500" };
    return { label: "High", color: "text-red-500" };
  };

  const depressionCategory = getScoreCategory(depressionScore);
  const anxietyCategory = getScoreCategory(emotions.anxiety);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Depression Score</h3>
              <p className={`text-2xl font-bold ${depressionCategory.color}`}>
                {depressionScore}% - {severity.charAt(0).toUpperCase() + severity.slice(1)}
              </p>
            </div>
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold">
              {depressionScore}
            </div>
          </div>
          <Progress
            value={depressionScore}
            className="h-3 bg-blue-100"
            indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-500"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {moodAssessment}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Anxiety Score</h3>
              <p className={`text-2xl font-bold ${anxietyCategory.color}`}>
                {Math.round(emotions.anxiety)}% - {anxietyCategory.label}
              </p>
            </div>
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 flex items-center justify-center text-white text-xl font-bold">
              {Math.round(emotions.anxiety)}
            </div>
          </div>
          <Progress
            value={emotions.anxiety}
            className="h-3 bg-purple-100"
            indicatorClassName="bg-gradient-to-r from-purple-500 to-fuchsia-500"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This is an estimated anxiety level based on language patterns.
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="emotions">Emotions</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900/20 dark:to-purple-900/20">
            <h3 className="mb-2 font-semibold">Analysis Summary</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {depressionScore > 75 ? (
                "Based on our analysis, you're showing significant signs of depression. Your text patterns suggest persistent sadness and negative thought patterns."
              ) : depressionScore > 50 ? (
                "Based on our analysis, you're showing moderate signs of depression and signs of anxiety. Your emotional patterns suggest you may be experiencing persistent worry and sadness."
              ) : depressionScore > 30 ? (
                "Based on our analysis, you're showing mild signs of depression. While some concerns are present, your overall emotional state appears relatively stable."
              ) : (
                "Based on our analysis, you're showing minimal signs of depression. Your text patterns suggest a generally positive outlook."
              )}
            </p>
          </div>

          {analysisResult && (
            <div className="space-y-2">
              <h3 className="font-semibold">Text Analysis</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                  Word count: {analysisResult.text_stats.word_count}
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-purple-500"></span>
                  Sentence count: {analysisResult.text_stats.sentence_count}
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-pink-500"></span>
                  Average sentence length: {analysisResult.text_stats.avg_sentence_length.toFixed(1)} words
                </li>
              </ul>
            </div>
          )}
          
          <div className="space-y-2">
            <h3 className="font-semibold">Key Indicators</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                {depressionScore > 50 ? "Expressions of persistent sadness or low mood" : "Occasional expressions of sadness"}
              </li>
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-purple-500"></span>
                {emotions.anxiety > 50 ? "Signs of significant worry and nervousness" : "Some signs of worry"}
              </li>
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-pink-500"></span>
                {emotions.joy < 40 ? "Reduced expression of positive emotions" : "Presence of positive emotional expressions"}
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-gradient-to-r from-pink-50 to-rose-50 p-4 dark:from-pink-900/20 dark:to-rose-900/20">
            <h3 className="mb-2 font-semibold">Recommendations</h3>
            <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
              Consider these steps to support your mental well-being:
            </p>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• Practice daily mindfulness or meditation</li>
              <li>• Maintain regular physical activity</li>
              <li>• Establish consistent sleep patterns</li>
              <li>• Connect with supportive friends or family</li>
              {depressionScore > 60 && <li>• Consider speaking with a mental health professional</li>}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="emotions">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={emotionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-gray-200 dark:stroke-gray-700"
                />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [`${value}%`, "Percentage"]}
                />
                <Bar dataKey="value">
                  {emotionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Emotion Breakdown</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {depressionScore > 60 
                  ? "Your emotional profile shows elevated levels of anxiety and sadness, with lower levels of positive emotions like joy."
                  : "Your emotional profile shows a relatively balanced distribution, with moderate levels of both positive and negative emotions."}
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {emotionData.map((emotion) => (
                <div key={emotion.name} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{emotion.name}</span>
                    <span className="text-sm font-bold">{emotion.value}%</span>
                  </div>
                  <Progress
                    value={emotion.value}
                    className="mt-2 h-2"
                    indicatorClassName={`bg-${
                      COLORS[emotion.name.toLowerCase() as keyof typeof COLORS]
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={historicalData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-gray-200 dark:stroke-gray-700"
                  />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                    formatter={(value) => [`${value}%`, "Percentage"]}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="depression" name="Depression" stroke="#60a5fa" strokeWidth={2} />
                  <Line type="monotone" dataKey="anxiety" name="Anxiety" stroke="#c084fc" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 p-4 dark:from-indigo-900/20 dark:to-blue-900/20">
              <h3 className="mb-2 font-semibold">Trend Analysis</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                This chart shows sample historical data. Continue using the app to build your personal emotional trend data over time.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Recommendations Based on Trends</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  Track your mood regularly for more accurate trends
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-purple-500"></span>
                  Note activities or events that impact your emotional state
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                  Consider journaling to identify specific triggers
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-pink-500"></span>
                  Schedule regular check-ins to monitor your progress
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}