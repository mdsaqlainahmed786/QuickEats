import {Link} from  "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, Truck, CreditCard, Search, Utensils, ThumbsUp } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 text-orange-900">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">QuickEats</h1>
        <p className="text-xl md:text-2xl mb-8">
          Delicious food delivered to your door in minutes.
        </p>
        <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-100">
          <Link to="/dishes">Order Now</Link>
        </Button>
      </header>

      {/* How It Works Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">
          How QuickEats Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white">
            <CardHeader>
              <Search className="w-12 h-12 text-orange-600 mb-4" />
              <CardTitle>1. Choose Your Meal</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Browse our wide selection of restaurants and dishes. Filter by cuisine, dietary requirements, or rating.</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader>
              <Utensils className="w-12 h-12 text-orange-600 mb-4" />
              <CardTitle>2. Place Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Select your items, customize as needed, and proceed to checkout. Multiple payment options available.</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader>
              <ThumbsUp className="w-12 h-12 text-orange-600 mb-4" />
              <CardTitle>3. Enjoy Your Food</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Track your order in real-time. Our drivers will deliver your meal right to your doorstep. Bon appétit!</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Clock className="w-10 h-10 text-orange-600 mb-2" />
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Get your food delivered quickly with live tracking and ETA updates.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Truck className="w-10 h-10 text-orange-600 mb-2" />
                <CardTitle>Fresh Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <p>We use only the freshest ingredients to ensure quality in every bite.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CreditCard className="w-10 h-10 text-orange-600 mb-2" />
                <CardTitle>Secure Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Safe and reliable payment options for a worry-free experience.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah M.", review: "The food is amazing, and the delivery is always on time!" },
              { name: "Jake T.", review: "My go-to app for dinner, always reliable!" },
              { name: "Alice R.", review: "Delicious food and friendly drivers, highly recommended!" }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <Avatar className="w-12 h-12 mb-4">
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{testimonial.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="italic">{`"${testimonial.review}"`}</p>
                </CardContent>
                <CardContent>
                  <Badge variant="secondary">Verified Customer</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to Taste Happiness?</h2>
        <p className="text-xl mb-8">
          Place your order now and enjoy a quick, tasty meal!
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link to="/dishes">Get Started</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6 text-center">
        <p>© 2024 QuickEats. All rights reserved.</p>
      </footer>
    </div>
  )
}