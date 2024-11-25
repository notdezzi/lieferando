"use client";

import React, { useState, useEffect } from 'react';
import { ChartBar, Plus } from 'lucide-react';

interface DashboardData {
  monthlyIncome: number;
  orderCount: number;
  topProducts: Array<{
    id: number;
    name: string;
    salesCount: number;
  }>;
}

export default function ShopDashboard({ shopId }: { shopId: number }) {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    monthlyIncome: 0,
    orderCount: 0,
    topProducts: []
  });
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`/api/dashboard/${shopId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        setDashboardData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [shopId]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/products/${shopId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      // Reset form
      setNewProduct({ name: '', description: '', price: 0 });
      
      // Optionally, refetch dashboard data
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Shop Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="border p-4">
          <h2 className="font-semibold">Monthly Income</h2>
          <p>${dashboardData.monthlyIncome.toFixed(2)}</p>
        </div>
        
        <div className="border p-4">
          <h2 className="font-semibold">Orders Last Month</h2>
          <p>{dashboardData.orderCount}</p>
        </div>
        
        <div className="border p-4">
          <h2 className="font-semibold">Top Products</h2>
          <ul>
            {dashboardData.topProducts.map((product) => (
              <li key={product.id}>
                {product.name} - {product.salesCount} sales
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="space-y-2">
          <input 
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            className="w-full border p-2"
            required
          />
          <input 
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
            className="w-full border p-2"
            required
          />
          <input 
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
            className="w-full border p-2"
            required
            step="0.01"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 w-full">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}