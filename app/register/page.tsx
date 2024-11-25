// app/register/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '@/app/register/register.module.css'

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

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrappercontent}>
                <div className={styles.contentform}>
                    <h2 className={styles.h2}>Create an account</h2>
                    
                    {error && (
                        <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.forms}>
                        {/* Personal Information */}
                        <div className={styles.formcomponent}>
                            <h3 className={styles.h3}>Personal Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className={styles.formspacer}>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.formspacer}>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />
                                </div>
                            </div>

                            <div className={styles.formspacer}>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formspacer}>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                    Account Type
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    required
                                    value={formData.type}
                                    onChange={handleChange}
                                    className={styles.select}
                                >
                                    <option value="CUSTOMER">Customer</option>
                                    <option value="SHOP_OWNER">Shop Owner</option>
                                    <option value="DRIVER">Driver</option>
                                </select>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className={styles.formcomponent}>
                            <h3 className={styles.h3}>Address</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className={styles.formspacer}>
                                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                                        Street
                                    </label>
                                    <input
                                        type="text"
                                        id="street"
                                        name="street"
                                        required
                                        value={formData.street}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.formspacer}>
                                    <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                                        Number
                                    </label>
                                    <input
                                        type="text"
                                        id="number"
                                        name="number"
                                        required
                                        value={formData.number}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className={styles.formspacer}>
                                    <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
                                        Zipcode
                                    </label>
                                    <input
                                        type="text"
                                        id="zipcode"
                                        name="zipcode"
                                        required
                                        value={formData.zipcode}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.formspacer}>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        required
                                        value={formData.country}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />
                                </div>
                            </div>

                            <div className={styles.formspacer}>
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                                    Address Notes (Optional)
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    className={styles.textarea}
                                />
                            </div>
                        </div>

                        {/* Password Section */}
                        <div className="space-y-4">
                            <h3 className={styles.h3}>Security</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className={styles.formspacer}>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={styles.input}
                                        minLength={6}
                                    />
                                </div>

                                <div className={styles.formspacer}>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={styles.input}
                                        minLength={6}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.buttoncreate}>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                            >
                                {isLoading ? 'Creating account...' : 'Create account'}
                            </button>
                        </div>

                        <div className={styles.textsignin}>
                            Already have an account?{' '}
                            <Link href="/login" className={styles.loginstyle}>
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}