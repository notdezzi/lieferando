// app/dashboard/products/new/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function NewProductPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>Please log in</div>;
  }

  // Fetch the store owned by the current user
  const store = await prisma.shop.findFirst({
    where: { ownerid: parseInt(session.user.id) }
  });

  if (!store) {
    return <div>No store found</div>;
  }

  const createProduct = async (formData: FormData) => {
    'use server'
    
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);

    await prisma.product.create({
      data: {
        name,
        description,
        price,
        shopid: store.id
      }
    });

    redirect('/dashboard');
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createProduct} className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="Enter product name" 
                required 
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                name="description" 
                placeholder="Product description" 
                required 
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input 
                id="price" 
                name="price" 
                type="number" 
                step="0.01" 
                placeholder="Product price" 
                required 
              />
            </div>
            <Button type="submit" className="w-full">Create Product</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}