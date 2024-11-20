import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon, PackageIcon, Clock10Icon } from "lucide-react";
import { Loader2Icon } from "lucide-react"; // Use any spinner icon available in your library

interface OrderItem {
  title: string;
  price: number;
  image: string;
}

interface Order {
  id: string;
  createdAt: string;
  orderItem: OrderItem[];
  total: number;
  status: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/orders/all", {
          withCredentials: true,
        });
        const orders = response.data.orders.map((order: Order) => ({
          ...order,
          items: order.orderItem, // Map `orderItem` to `items`
        }));
        setOrders(orders);
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-orange-800 mb-8 text-center">My Orders</h1>

        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <Loader2Icon className="h-10 w-10 animate-spin text-orange-800" />
            <span className="ml-2 text-orange-800 font-medium">Loading orders...</span>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-orange-100">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold text-orange-800">
                      Order #{order.id.split("-")[0]}
                    </CardTitle>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(new Date(order.createdAt), "dd MMM yyyy")}
                    <Clock10Icon className="mx-2 h-4 w-4" />
                    {format(new Date(order.createdAt), "HH:mm")}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ScrollArea className="w-full pr-4">
                    {order.orderItem.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 mb-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{item.title}</p>
                          <p className="text-sm text-gray-500">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
                <Separator />
                <CardFooter className="flex justify-between items-center p-6">
                  <div className="flex items-center">
                    <PackageIcon className="mr-2 h-5 w-5 text-orange-600" />
                    <span className="text-sm text-gray-600">{order.orderItem.length} items</span>
                  </div>
                  <p className="text-lg font-bold text-orange-600">Total: ${order.total}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <p className="text-lg text-gray-600">You have no orders yet.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
