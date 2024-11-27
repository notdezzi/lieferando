// app/dashboard/menus/new/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function NewMenuPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>Please log in</div>;
  }

  // Fetch the store owned by the current user
  const store = await prisma.shop.findFirst({
    where: { ownerid: parseInt(session.user.id) },
    include: { Product: true }
  });

  if (!store) {
    return <div>No store found</div>;
  }

  const createMenu = async (formData: FormData) => {
    'use server'
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const selectedProductIds = formData.getAll('products') as string[];

    await prisma.menu.create({
      data: {
        title,
        description,
        shopid: store.id,
        products: {
          connect: selectedProductIds.map(id => ({ id: parseInt(id) }))
        }
      }
    });

    redirect('/dashboard');
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Create New Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createMenu} className="space-y-4">
            <div>
              <Label htmlFor="title">Menu Title</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="Enter menu title" 
                required 
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                name="description" 
                placeholder="Menu description" 
                required 
              />
            </div>
            <div>
              <Label>Select Products</Label>
              <MultiSelect 
                name="products"
                options={store.Product.map(product => ({
                  value: product.id.toString(),
                  label: product.name
                }))}
              />
            </div>
            <Button type="submit" className="w-full">Create Menu</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}