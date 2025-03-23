"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const analyses = [
  {
    id: "1",
    user: {
      name: "Alex Johnson",
      email: "alex@example.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    type: "Speech",
    date: "2023-03-22T13:45:00",
    riskLevel: "Low",
    score: 25,
  },
  {
    id: "2",
    user: {
      name: "Sam Taylor",
      email: "sam@example.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    type: "Text",
    date: "2023-03-22T11:30:00",
    riskLevel: "Moderate",
    score: 45,
  },
  {
    id: "3",
    user: {
      name: "Jamie Smith",
      email: "jamie@example.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    type: "Facial",
    date: "2023-03-22T10:15:00",
    riskLevel: "High",
    score: 72,
  },
  {
    id: "4",
    user: {
      name: "Riley Chen",
      email: "riley@example.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    type: "Speech",
    date: "2023-03-22T09:00:00",
    riskLevel: "Low",
    score: 18,
  },
  {
    id: "5",
    user: {
      name: "Jordan Lee",
      email: "jordan@example.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    type: "Text",
    date: "2023-03-21T16:45:00",
    riskLevel: "Severe",
    score: 85,
  },
]

function getRiskBadgeVariant(riskLevel: string) {
  switch (riskLevel) {
    case "Low":
      return "outline"
    case "Moderate":
      return "secondary"
    case "High":
      return "default"
    case "Severe":
      return "destructive"
    default:
      return "outline"
  }
}

export function RecentAnalyses() {
  return (
    <div className="space-y-8">
      {analyses.map((analysis) => (
        <div key={analysis.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={analysis.user.image} alt={analysis.user.name} />
            <AvatarFallback>{analysis.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{analysis.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {analysis.type} Analysis • {new Date(analysis.date).toLocaleString()}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant={getRiskBadgeVariant(analysis.riskLevel)}>{analysis.riskLevel} Risk</Badge>
            <span className="text-sm font-medium">Score: {analysis.score}%</span>
          </div>
        </div>
      ))}
    </div>
  )
}

