import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface CartItem {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const navigate = useNavigate();
  const { toast } = useToast();

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
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart.",
    })
  };

  // const handleCheckout = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/api/v1/payments/pay",
  //       { total, cartItems: cart },
  //       { withCredentials: true }
  //     );

  //     const paymentLink = response.data.link;
  //     if (paymentLink) {
  //       window.location.href = paymentLink;
  //     } else {
  //       throw new Error("Payment link not received from server.");
  //     }
  //   } catch (error) {
  //     console.error("Error initiating payment:", error);
  //     toast({
  //       title: "Checkout Failed",
  //       description:
  //         "There was an error processing your payment. Please try again.",
  //       variant: "destructive",
  //     });
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-orange-800 mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-lg text-gray-600">Your cart is empty.</p>
            <Button
              onClick={() => navigate("/dishes")}
              className="mt-4 bg-orange-600 hover:bg-orange-700"
            >
              Browse Dishes
            </Button>
          </Card>
        ) : (
          <>
            {cart.map((cartItem) => (
              <Card key={cartItem.id} className="mb-4 overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={cartItem.image}
                      alt={cartItem.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-grow">
                      <h2 className="text-lg font-semibold text-orange-800">
                        {cartItem.title}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Category: {cartItem.category}
                      </p>
                    </div>
                    <div className="text-lg font-bold text-orange-600">
                      ${cartItem.price}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 flex justify-end p-2">
                  <Button
                    onClick={() => onRemoveCartItem(cartItem.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Separator className="my-6" />

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Total</h2>
              <span className="text-2xl font-bold text-orange-600">
                ${total}
              </span>
            </div>

            <Button
              onClick={() => navigate("/add-address")}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded font-semibold"
            >
              Proceed to Checkout (${total})
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
