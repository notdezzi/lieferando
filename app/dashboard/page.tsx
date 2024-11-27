// app/dashboard/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust the path as needed
import { PrismaClient } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const prisma = new PrismaClient();

export default async function StoreDashboard() {
  // Use getServerSession with NextAuth options
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>Please log in</div>;
  }

  // Fetch the store owned by the current user
  const store = await prisma.shop.findFirst({
    where: { ownerid: parseInt(session.user.id) }, // Adjust based on your User model
    include: {
      Product: true,
      Order: {
        include: {
          items: true
        },
        orderBy: {
          date: 'desc'
        },
        take: 30 // Last 30 days
      }
    }
  });

  if (!store) {
    return <div>No store found</div>;
  }

  // Calculate total revenue for the last month
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const monthlyRevenue = store.Order
    .filter(order => new Date(order.date) >= oneMonthAgo)
    .reduce((total, order) => total + order.totalprice, 0);

  // Find top selling products
  const productSales = store.Product.map(product => {
    const totalSold = store.Order.reduce((count, order) => 
      count + order.items.filter(item => item.id === product.id).length, 0);
    return {
      ...product,
      totalSold
    };
  }).sort((a, b) => b.totalSold - a.totalSold);

  // Prepare revenue chart data
  const revenueChartData = store.Order
    .reduce((acc, order) => {
      const date = new Date(order.date).toLocaleDateString();
      const existingEntry = acc.find(entry => entry.date === date);
      if (existingEntry) {
        existingEntry.revenue += order.totalprice;
      } else {
        acc.push({ date, revenue: order.totalprice });
      }
      return acc;
    }, [] as { date: string, revenue: number }[])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const chartConfig = {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      } satisfies ChartConfig
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Store Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Revenue Card */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${monthlyRevenue.toFixed(2)}</p>
          </CardContent>
        </Card>

        {/* Product Management Card */}
        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col align-center justify-center">
            <Link href="/dashboard/products/new">
              <Button variant="destructive" className="w-full">Add New Product</Button>
            </Link>
            <Link href="/dashboard/menus/new">
              <Button variant="destructive" className="w-full">Create New Menu</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Top Selling Products Card */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            {productSales.slice(0, 5).map(product => (
              <div key={product.id} className="flex justify-between">
                <span>{product.name}</span>
                <span>{product.totalSold} sold</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}