

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Hero Section */}
      <header className="bg-red-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">QuickEats</h1>
        <p className="mt-4 text-lg md:text-2xl">
          Delicious food delivered to your door in minutes.
        </p>
        <button className="mt-6 bg-white text-red-600 font-bold py-2 px-8 rounded-md hover:bg-gray-200 transition duration-300">
          Order Now
        </button>
      </header>

      {/* Featured Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-semibold text-center text-red-600 mb-8">
          Our Special Picks
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="flex-1 text-center">
            <img
              src="https://www.samaheats.com/wp-content/uploads/2024/03/Untitled-design-15-1152x1536.png"
              alt="Pizza"
              className="rounded-full h-[12.75rem] w-[214px] shadow-lg mx-auto"
            />
            <h3 className="text-xl font-bold mt-4 text-red-600">Butter Chicken</h3>
            <p className="mt-2 text-gray-700">Buttery, Juicy flavorful gravy chicken</p>
          </div>
          <div className="flex-1 text-center">
            <img
              src="https://cdn.zeptonow.com/production///tr:w-1000,ar-100-100,pr-true,f-auto,q-80/web/recipes/gulab-jamun.png"
              alt="Burger"
              className="rounded-full h-[12.75rem] w-[214px] shadow-lg mx-auto"
            />
            <h3 className="text-xl font-bold mt-4 text-red-600">Gulab Jamun</h3>
            <p className="mt-2 text-gray-700">Delicious sweet dish, with juicy sweet syrup</p>
          </div>
          <div className="flex-1 text-center">
            <img
              src="https://ministryofcurry.com/wp-content/uploads/2024/06/chicken-biryani.jpg"
              alt="Pasta"
              className="rounded-full h-[12.75rem] w-[214px] shadow-lg mx-auto"
            />
            <h3 className="text-xl font-bold mt-4 text-red-600">Chicken Biryani</h3>
            <p className="mt-2 text-gray-700">Rich in spices, Flavorful meat.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-red-50 py-16 px-6">
        <h2 className="text-3xl font-semibold text-center text-red-600 mb-8">
          Why Choose Us?
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="flex-1 bg-white shadow-lg rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold text-red-600">Fast Delivery</h3>
            <p className="mt-4 text-gray-700">
              Get your food delivered quickly with live tracking and ETA updates.
            </p>
          </div>
          <div className="flex-1 bg-white shadow-lg rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold text-red-600">Fresh Ingredients</h3>
            <p className="mt-4 text-gray-700">
              We use only the freshest ingredients to ensure quality in every bite.
            </p>
          </div>
          <div className="flex-1 bg-white shadow-lg rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold text-red-600">Secure Payment</h3>
            <p className="mt-4 text-gray-700">
              Safe and reliable payment options for a worry-free experience.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-semibold text-center text-red-600 mb-8">
          Customer Reviews
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="bg-red-50 p-6 rounded-lg shadow-lg max-w-xs mx-auto">
            <p className="text-gray-700 italic">"The food is amazing, and the delivery is always on time!"</p>
            <p className="mt-4 text-red-600 font-medium">- Sarah M.</p>
          </div>
          <div className="bg-red-50 p-6 rounded-lg shadow-lg max-w-xs mx-auto">
            <p className="text-gray-700 italic">"My go-to app for dinner, always reliable!"</p>
            <p className="mt-4 text-red-600 font-medium">- Jake T.</p>
          </div>
          <div className="bg-red-50 p-6 rounded-lg shadow-lg max-w-xs mx-auto">
            <p className="text-gray-700 italic">"Delicious food and friendly drivers, highly recommended!"</p>
            <p className="mt-4 text-red-600 font-medium">- Alice R.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-red-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold">Ready to Taste Happiness?</h2>
        <p className="mt-4 text-lg">Place your order now and enjoy a quick, tasty meal!</p>
        <button className="mt-6 bg-white text-red-600 font-bold py-2 px-8 rounded-md hover:bg-gray-200 transition duration-300">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>© 2024 QuickEats. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
