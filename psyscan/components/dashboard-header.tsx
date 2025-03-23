import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { BarChart, Settings, Bell, HelpCircle, Brain } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Brain className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">MindfulAI</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground">
              Dashboard
            </Link>
            <Link href="/analytics" className="transition-colors hover:text-foreground/80 text-muted-foreground">
              Analytics
            </Link>
            <Link href="/users" className="transition-colors hover:text-foreground/80 text-muted-foreground">
              Users
            </Link>
            <Link href="/settings" className="transition-colors hover:text-foreground/80 text-muted-foreground">
              Settings
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex">
              <BarChart className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </div>
          <nav className="flex items-center">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
              <span className="sr-only">Help</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}

