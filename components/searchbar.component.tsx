"use client";

import { useState } from 'react'

interface Shop {
    id: string
    description: string
    location: {
        street: string
        number: number
        zipcode: number
        country: string
        notes: string
    }
    averageRating: string | null
    numberOfRatings: number
    products: Array<{
        id: string
        name: string
        price: number
        description: string
    }>
}

export default function SearchPage() {
    const [zipcode, setZipcode] = useState('')
    const [radius, setRadius] = useState('medium')
    const [shops, setShops] = useState<Shop[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        try {
            const response = await fetch(
                `/api/search?zipcode=${zipcode}&radius=${radius}`
            )
            
            if (!response.ok) {
                throw new Error('Search failed')
            }
            
            const data = await response.json()
            setShops(data.shops)
        } catch (err) {
            setError('Failed to search shops. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Find Nearby Restaurants</h1>
            
            <form onSubmit={handleSearch}>
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        placeholder="Enter ZIP code"
                        style={{ 
                            padding: '8px',
                            marginRight: '10px',
                            width: '200px'
                        }}
                    />
                    
                    <select
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                        style={{ 
                            padding: '8px',
                            marginRight: '10px'
                        }}
                    >
                        <option value="small">Small (~10 miles)</option>
                        <option value="medium">Medium (~50 miles)</option>
                        <option value="large">Large (~500 miles)</option>
                    </select>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '8px 16px',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </form>

            {error && (
                <div style={{ color: 'red', marginBottom: '20px' }}>
                    {error}
                </div>
            )}

            <div>
                {shops.map(shop => (
                    <div
                        key={shop.id}
                        style={{
                            border: '1px solid #ccc',
                            padding: '15px',
                            marginBottom: '15px',
                            borderRadius: '4px'
                        }}
                    >
                        <h2>{shop.description}</h2>
                        <p>
                            {shop.location.street} {shop.location.number}, {' '}
                            {shop.location.zipcode}, {shop.location.country}
                        </p>
                        {shop.averageRating && (
                            <p>Rating: {shop.averageRating} ({shop.numberOfRatings} reviews)</p>
                        )}
                        
                        <h3>Menu</h3>
                        <div style={{ display: 'grid', gap: '10px' }}>
                            {shop.products.map(product => (
                                <div key={product.id}>
                                    <h4>{product.name} - ${product.price}</h4>
                                    <p>{product.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                
                {shops.length === 0 && !loading && (
                    <p>No restaurants found in this area.</p>
                )}
            </div>
        </div>
    )
}
