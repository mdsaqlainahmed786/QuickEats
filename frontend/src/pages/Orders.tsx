import React, { useState, useEffect } from "react";
interface Order {
  orderId: string;
  date: string;
  items: {
    name: string;
    price: number;
    image: string;
  }[];
  total: number;
  status: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

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
              image:
                "https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png",
              price: 299,
            },
            {
              name: "Pasta Alfredo",
              image:
                "https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png",
              price: 299,
            },
            {
              name: "Caesar Salad",
              image:
                "https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png",
              price: 299,
            },
            {
              name: "Steak Sandwich",
              image:
                "https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png",
              price: 299,
            },
          ],
          total: 32.99,
          status: "Delivered",
        },
      ];
      setOrders(mockOrders);
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
        My Orders
      </h2>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <>
              <div
                key={order.orderId}
                className="border border-red-500 p-4 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-red-600">
                    Order #{order.orderId}
                  </h3>
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                </div>

                {/* Order Items */}
                <div className="flex flex-wrap gap-4 mb-4">
                  {order.items.map((item, index) => (
                    <div className="flex justify-between items-center w-full border-b-2 border-b-red-200">
                      <div
                        key={index}
                        className="flex items-center space-x-4 w-full pb-5 sm:w-1/2"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-full object-cover border border-gray-300"
                        />
                        <p className="text-gray-700">{item.name}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-lg">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Total and Status */}
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-700">
                    Total: ${order.total.toFixed(2)}
                  </p>
                  <span
                    className={`py-1 px-3 rounded-full text-white font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      )}
    </div>
  );
};

export default Orders;
