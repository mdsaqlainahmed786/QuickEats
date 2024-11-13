import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CartItem {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
}
const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [total, setTotal] = useState<number>(99);

  const navigate = useNavigate();
  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(existingCart);
  }, []);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    setTotal(total);
  }, [cart]);

  const onRemoveCartItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
        Your Cart
      </h1>

      <div className="border-t border-red-300 mt-4">
        {/* Example Cart Item */}
        {cart.map((cartItem) => (
          <div
            key={cartItem.id}
            className="flex flex-col md:flex-row justify-between items-center py-4 border-b border-red-300 space-y-4 md:space-y-0"
          >
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <img
                src={cartItem.image}
                alt="Dish Thumbnail"
                className="w-20 h-20 object-cover rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold text-red-600">
                  {cartItem.title}
                </h2>
                <p className="text-gray-600">Category - {cartItem.category}</p>
              </div>
            </div>
            <div className="text-lg font-bold text-gray-800 md:mr-6">
              ${cartItem.price}
            </div>
            <button
              onClick={() => onRemoveCartItem(cartItem.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full md:w-auto"
            >
              Remove
            </button>
          </div>
        ))}

        {/* Total Section */}
        <div className="flex justify-between items-center mt-6 text-lg md:text-xl font-bold text-gray-800">
          <h2>Total</h2>
          <span className="text-red-600">₹{total}</span>
        </div>

        <button onClick={async () => {
       try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/payments/pay",
        { total, cartItems: cart },
        { withCredentials: true }
      );

      const paymentLink = response.data.link;
      if (paymentLink) {
        // Redirect the user to the PayPal approval URL
        window.location.href = paymentLink;
      } else {
        console.error("Payment link not received from server.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  }}
  className="w-full bg-red-500 text-white py-3 mt-6 rounded hover:bg-red-600 font-semibold"
>
  Proceed to Checkout {total}
        </button>
      </div>
    </div>
  );
};

export default Cart;
