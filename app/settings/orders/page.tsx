import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { CartProvider } from '@/context/CartContext';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export default async function OrdersPage(){
    try{
    const session = await getServerSession(authOptions)
    const orders = await prisma.order.findMany({
        where:{userid:4},
        include:{
            user:true,
            shop:true,
            items:true,
        }
    });
    return(
        <div>
        <h1>All Orders</h1>
        {orders.map((order) => (
          <div key={order.id}>
              <h2>{order.userid}</h2>
              <h2>{order.shopid}</h2>
              <h2>{order.totalprice}</h2>
              <h2>{order.date.toDateString()}</h2>
              <ul>
              {order.items.map((item) =>(
                <li>{item.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div> 
    );
}catch{

}
}