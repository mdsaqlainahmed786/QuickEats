
import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from 'lucide-react'

interface Dish {
  id: number
  title: string
  category: string
  description: string
  price: number
  image: string
}

export default function Dishes() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [dishes, setDishes] = useState<Dish[]>([])

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/dishes/category/all"
        )
        setDishes(response.data)
      } catch (error) {
        console.error("Fetching dishes failed:", error)
        // toast({
        //   title: "Error",
        //   description: "Failed to fetch dishes. Please try again later.",
        //   variant: "destructive",
        // })
      }
    }
    fetchDishes()
  }, [])

  const handleAddToCart = (dish: Dish) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    existingCart.push(dish)
    localStorage.setItem("cart", JSON.stringify(existingCart))
    // toast({
    //   title: "Added to Cart",
    //   description: `${dish.title} has been added to your cart.`,
    // })
  }

  const categories = ["all", "Main-Course", "starters", "Dessert"]
  const filteredDishes =
    selectedCategory === "all"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-orange-800 mb-8">Our Dishes</h1>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="w-full justify-start">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="px-4 py-2">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDishes.map((dish) => (
            <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="h-48 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl font-semibold mb-2">{dish.title}</CardTitle>
                <Badge variant="secondary" className="mb-2">
                  {dish.category}
                </Badge>
                <p className="text-sm text-gray-600 mb-2">{dish.description.slice(0, 100)}...</p>
                <p className="text-lg font-bold text-orange-600">₹{dish.price}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleAddToCart(dish)} 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}