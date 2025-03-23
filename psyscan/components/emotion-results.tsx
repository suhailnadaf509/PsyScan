"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const emotionData = [
  { name: "Sadness", value: 65 },
  { name: "Anxiety", value: 72 },
  { name: "Anger", value: 35 },
  { name: "Fear", value: 48 },
  { name: "Joy", value: 25 },
]

const historicalData = [
  { date: "Mar 1", depression: 75, anxiety: 68 },
  { date: "Mar 8", depression: 70, anxiety: 65 },
  { date: "Mar 15", depression: 68, anxiety: 70 },
  { date: "Mar 22", depression: 65, anxiety: 72 },
]

const COLORS = {
  Sadness: "#60a5fa",
  Anxiety: "#c084fc",
  Anger: "#f87171",
  Fear: "#fbbf24",
  Joy: "#34d399",
}

export function EmotionResults() {
  const [activeTab, setActiveTab] = useState("overview")

  const depressionScore = 65
  const anxietyScore = 72

  const getScoreCategory = (score: number) => {
    if (score < 30) return { label: "Low", color: "text-green-500" }
    if (score < 50) return { label: "Mild", color: "text-yellow-500" }
    if (score < 70) return { label: "Moderate", color: "text-orange-500" }
    return { label: "High", color: "text-red-500" }
  }

  const depressionCategory = getScoreCategory(depressionScore)
  const anxietyCategory = getScoreCategory(anxietyScore)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Depression Score</h3>
              <p className={`text-2xl font-bold ${depressionCategory.color}`}>
                {depressionScore}% - {depressionCategory.label}
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
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Anxiety Score</h3>
              <p className={`text-2xl font-bold ${anxietyCategory.color}`}>
                {anxietyScore}% - {anxietyCategory.label}
              </p>
            </div>
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 flex items-center justify-center text-white text-xl font-bold">
              {anxietyScore}
            </div>
          </div>
          <Progress
            value={anxietyScore}
            className="h-3 bg-purple-100"
            indicatorClassName="bg-gradient-to-r from-purple-500 to-fuchsia-500"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="emotions">Emotions</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900/20 dark:to-purple-900/20">
            <h3 className="mb-2 font-semibold">Analysis Summary</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Based on our analysis, you're showing moderate signs of depression and high signs of anxiety. Your
              emotional patterns suggest you may be experiencing persistent worry and sadness.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Key Indicators</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                Expressions of persistent sadness or low mood
              </li>
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-purple-500"></span>
                Signs of worry and nervousness
              </li>
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-pink-500"></span>
                Reduced expression of positive emotions
              </li>
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-indigo-500"></span>
                Patterns suggesting sleep disturbances
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
              <li>• Consider speaking with a mental health professional</li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="emotions">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emotionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
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
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Emotion Breakdown</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Your emotional profile shows elevated levels of anxiety and sadness, with lower levels of positive
                emotions like joy.
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
                    indicatorClassName={`bg-${COLORS[emotion.name as keyof typeof COLORS]}`}
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
                <BarChart data={historicalData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
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
                  <Bar dataKey="depression" name="Depression" fill="#60a5fa" />
                  <Bar dataKey="anxiety" name="Anxiety" fill="#c084fc" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 p-4 dark:from-indigo-900/20 dark:to-blue-900/20">
              <h3 className="mb-2 font-semibold">Trend Analysis</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Your depression score has shown a slight improvement over the past month, decreasing from 75% to 65%.
                However, your anxiety score has increased slightly from 68% to 72%.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Recommendations Based on Trends</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  Continue activities that have helped reduce depression
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-purple-500"></span>
                  Focus on anxiety management techniques
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                  Consider tracking specific triggers for anxiety
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
  )
}

