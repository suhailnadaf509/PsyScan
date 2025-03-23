// components/LoginPage.tsx
"use client";

import { useState, FormEvent, ReactElement } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/superbaseClient"; // Import Supabase client
import { useRouter } from 'next/navigation'; // Import useRouter

export default function LoginPage(): ReactElement {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter(); // Initialize useRouter
    const handleGoogleSignIn = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
            });

            if (error) {
                console.error("Error signing in with Google:", error.message);
                alert(`Google Sign-in failed: ${error.message}`); // Display error to user
            }
        } catch (err) {
            console.error("Unexpected error during Google Sign-in:", err);
            alert("An unexpected error occurred during Google Sign-in.");
        } finally {
            setIsLoading(false);
        }

    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login process
        setTimeout(() => {
            setIsLoading(false);
            router.push("/dashboard"); // Use router.push for client-side navigation
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 p-4">
            <Card className="w-full max-w-md shadow-xl border-purple-200 dark:border-purple-800">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-violet-700 dark:text-violet-300">
                        Welcome to PsyScan
                    </CardTitle>
                    <CardDescription>Your mental wellness journey begins here</CardDescription>
                </CardHeader>
                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid grid-cols-2 w-full mb-4 mx-6">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <form onSubmit={handleSubmit}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </label>
                                    <Input id="email" type="email" placeholder="hello@example.com" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-medium">
                                        Password
                                    </label>
                                    <Input id="password" type="password" required />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing in..." : "Sign in"}
                                </Button>
                            </CardFooter>
                        </form>
                        {/* Add Google Sign-In Button */}
                        <div className="text-center mt-4">
                            <Button
                                onClick={handleGoogleSignIn}
                                className="w-full bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? "Redirecting..." : "Sign in with Google"}
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    );
}
