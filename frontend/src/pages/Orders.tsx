import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarIcon, PackageIcon } from "lucide-react"

interface OrderItem {
  name: string
  price: number
  image: string
}

interface Order {
  orderId: string
  date: string
  items: OrderItem[]
  total: number
  status: string
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Example data - Replace with actual data from your backend or database
    const fetchOrders = () => {
      const mockOrders = [
        {
          orderId: "12345",
          date: "2024-11-01",
          items: [
            {
              name: "Grilled Chicken",
              price: 299,
              image: "https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png",
            },
            {
              name: "Pasta Alfredo",
              price: 400,
              image: "https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png",
            },
          ],
          total: 699,
          status: "Delivered",
        },
        {
          orderId: "67890",
          date: "2024-10-25",
          items: [
            {
              name: "Margherita Pizza",
              price: 299,
              image: "https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png",
            },
            {
              name: "Chocolate Brownie",
              price: 150,
              image: "https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png",
            },
          ],
          total: 449,
          status: "In Transit",
        },
      ]
      setOrders(mockOrders)
    }

    fetchOrders()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-orange-800 mb-8 text-center">My Orders</h1>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.orderId} className="overflow-hidden">
                <CardHeader className="bg-orange-100">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold text-orange-800">
                      Order #{order.orderId}
                    </CardTitle>
                    <Badge variant={order.status === "Delivered" ? "secondary" : "default"}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {order.date}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ScrollArea className="h-[200px] w-full pr-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 mb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
                <Separator />
                <CardFooter className="flex justify-between items-center p-6">
                  <div className="flex items-center">
                    <PackageIcon className="mr-2 h-5 w-5 text-orange-600" />
                    <span className="text-sm text-gray-600">{order.items.length} items</span>
                  </div>
                  <p className="text-lg font-bold text-orange-600">
                    Total: ₹{order.total}
                  </p>
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
  )
}