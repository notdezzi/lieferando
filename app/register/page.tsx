// app/register/page.tsx
'use client'

import { useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useSession } from 'next-auth/react'

type FormData = {
    name: string
    email: string
    username: string
    password: string
    confirmPassword: string
    type: string
    street: string
    number: string
    zipcode: string
    country: string
    notes: string
}

export default function RegisterPage() {
    const { data: session } = useSession();
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        type: 'CUSTOMER',
        street: '',
        number: '',
        zipcode: '',
        country: '',
        notes: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return false
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long')
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateForm()) return

        setError(null)
        setIsLoading(true)

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed')
            }

            router.push('/login?registered=true')
        } catch (error) {
            console.error('Registration error:', error)
            setError(error instanceof Error ? error.message : 'Registration failed')
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
                <CardTitle>Log In</CardTitle>
                <CardDescription>Enter your details below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <Input
                                        type="text"
                                        id="username"
                                        name="username"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                    Account Type
                                </label>
                                <Select
                                    id="type"
                                    name="type"
                                    required
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the account type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="CUSTOMER">Customer</SelectItem>
                                        <SelectItem value="SHOP_OWNER">Shop Owner</SelectItem>
                                        <SelectItem value="DRIVER">Driver</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900">Address</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                                        Street
                                    </label>
                                    <Input
                                        type="text"
                                        id="street"
                                        name="street"
                                        required
                                        value={formData.street}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                                        Number
                                    </label>
                                    <Input
                                        type="number"
                                        id="number"
                                        name="number"
                                        required
                                        value={formData.number}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
                                        Zipcode
                                    </label>
                                    <Input
                                        type="number"
                                        id="zipcode"
                                        name="zipcode"
                                        required
                                        value={formData.zipcode}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        Country
                                    </label>
                                    <Input
                                        type="text"
                                        id="country"
                                        name="country"
                                        required
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Password Section */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900">Security</h3>

                            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        minLength={6}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <Input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        minLength={6}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                            >
                                {isLoading ? 'Creating account...' : 'Create account'}
                            </button>
                        </div>

                        <div className="text-sm text-center">
                            Already have an account?{' '}
                            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign in
                            </Link>
                        </div>
                    </form>
            </CardContent>
        </Card>
        </div>
    )
}