// app/login/page.tsx
'use client'

import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'


export default function LoginPage() {
    const { data: session } = useSession();
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError(result.error)
            } else {
                router.push('/') // Redirect to home page
                router.refresh() // Refresh the page to update session
            }
        } catch (error) {
            console.error('Login error:', error)
            setError('An error occurred during login')
        } finally {
            setIsLoading(false)
        }
    }

    if (session) {
        redirect("/settings")
    }
    return (
        <div className="flex h-dvh justify-center items-center">
            <Card className="w-[380px]">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Enter your details below to create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 rounded">
                                {error}
                            </div>
                        )}
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email address
                                </label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300"
                            >
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </Button>
                        </div>
                    </form>

                    <div className="text-sm text-center">
                        Dont have an account yet?{' '}
                        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                            Register
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}