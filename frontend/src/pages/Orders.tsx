import React, { useState, useEffect } from "react";

interface Order {
  orderId: string;
  date: string;
  items: { name: string; price: number; image: string }[];
  total: number;
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
              price: 299,
              image:
                "https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png",
            },
            {
              name: "Pasta Alfredo",
              price: 400,
              image:
                "https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png",
            },
          ],
          total: 32.99,
        },
        {
          orderId: "67890",
          date: "2024-10-25",
          items: [
            {
              name: "Grilled Chicken",
              price: 299,
              image:
                "https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png",
            },
            {
              name: "Pasta Alfredo",
              price: 400,
              image:
                "https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png",
            },
          ],
          total: 29.99,
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
                  <div
                    key={index}
                    className="flex items-center space-x-4 w-full sm:w-1/2"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-28 rounded-full object-cover border border-gray-300"
                    />
                    <div className="flex flex-col space-y-3">
                      <p className="text-gray-700 font-semibold text-lg">
                        {item.name}
                      </p>
                      <span>₹{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total and Status */}
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-700">
                  Total: ${order.total.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      )}
    </div>
  );
};

export default Orders;
