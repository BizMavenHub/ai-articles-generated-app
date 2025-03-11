"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"
import { useSearchParams } from 'next/navigation'

import supabase from '@/lib/supabaseClient'

const page = () => {

    const [user, setUser] = useState(null);
    const [countdown, setCountdown] = useState(60);
    const [isResending, setIsResending] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);

    const searchParams = useSearchParams();
    const user_id = searchParams.get('id');

    useEffect(() => {
        const checkForUser = async () => {
            const { data, error } = await supabase.from('users').select('*').eq("id", user_id);

            if (error) {
                console.log(error);
            }

            if (data) {
                setUser(data[0]);
            }
        }
        checkForUser();
    }, [])

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [countdown])

    const handleResendEmail = async () => {
        if (countdown > 0) return

        setIsResending(true)

        try {
            const { error } = await supabase.auth.resend({
                type: "signup",
                email: user.email,
            })

            if (error) {
                console.log(error);
            }

            setResendSuccess(true)
            setCountdown(60);
        } catch (error) {
            console.log(error);
        } finally {
            setIsResending(false);
        }
    }

    if (!user) {
        return (
            <div>
                <h1>User not found</h1>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500">
                        <Mail className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Verify your email</CardTitle>
                    <CardDescription>We've sent a verification link to your email address</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-lg bg-muted p-4">
                        <p className="text-sm text-muted-foreground">
                            Please check your inbox and click on the verification link to complete your registration. If you don't see
                            the email, check your spam folder.
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button onClick={handleResendEmail} disabled={countdown > 0 || isResending} className="w-full bg-blue-500">
                        {isResending ? "Sending..." : countdown > 0 ? `Resend email (${countdown}s)` : "Resend verification email"}
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                        <p>
                            Already verified?{" "}
                            <a href="/sign-in" className="font-medium text-primary hover:underline">
                                Sign in
                            </a>
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default page