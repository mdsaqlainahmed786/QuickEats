import { useState, useEffect } from "react";
import axios from "axios";
interface Dish {
    id: number;
    title: string;
    category: string;
    description: string;
    price: number; 
    image: string;
    }
const Dishes = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/dishes/category/all");
        setDishes(response.data);
      } catch (error) {
        console.error("Fetching dishes failed:", error);
      }
    };
    fetchDishes();
  }, []);

  // Filter dishes based on selected category
  const filteredDishes = selectedCategory === "all"
    ? dishes
    : dishes.filter(dish => dish.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-8">Our Dishes</h1>

      {/* Filter bar */}
      <div className="flex justify-center space-x-4 mb-6">
        {["all", "Main-Course", "starters", "Dessert"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-medium
              ${selectedCategory === category
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"}
              transition duration-300 hover:bg-red-500 hover:text-white`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredDishes.map(dish => (
          <div key={dish.id} className="bg-white shadow-md rounded-lg cursor-pointer p-4 text-center hover:shadow-xl hover:border hover:border-red-500">
            <div className="h-60 w-60 mx-auto mb-4 rounded-full overflow-hidden">
              <img
                src={dish.image}
                alt={dish.title}
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-semibold mb-2">{dish.title}</h2>
            <p className="text-xl font-bold">₹{dish.price}</p>
            <p className="text-gray-600 capitalize">{dish.category}</p>
            <p className="text-gray-400">{dish.description.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dishes;
