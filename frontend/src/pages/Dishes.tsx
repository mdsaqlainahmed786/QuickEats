import { useState } from "react";

const Dishes = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample data for dishes
  const dishes = [
    { id: 1, image:"https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png", name: "Grilled Chicken", category: "main course" },
    { id: 2, image:"https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png", name: "Caesar Salad", category: "starters" },
    { id: 3, image:"https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png", name: "Chocolate Cake", category: "desserts" },
    { id: 4, image:"https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png", name: "Pasta Carbonara", category: "main course" },
    { id: 5, image:"https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png", name: "Bruschetta", category: "starters" },
    { id: 6, image:"https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png", name: "Ice Cream", category: "desserts" },
  ];

  // Filter dishes based on selected category
  const filteredDishes = selectedCategory === "all"
    ? dishes
    : dishes.filter(dish => dish.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-8">Our Dishes</h1>

      {/* Filter bar */}
      <div className="flex justify-center space-x-4 mb-6">
        {["all", "main course", "starters", "desserts"].map((category) => (
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

      {/* Dishes grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredDishes.map(dish => (
          <div key={dish.id} className="bg-white shadow-md rounded-lg p-4 text-center">
            <img src={dish.image} alt={dish.name} className="h-40 mx-auto lg:max-w-[20vw] object-cover mb-4 rounded-full" />
            <h2 className="text-xl font-semibold mb-2">{dish.name}</h2>
            <p className="text-gray-600 capitalize">{dish.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dishes;
