import React from 'react';
import landingpageImg from '../assets/googlePng.png'
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Hero Section */}
      <header className="w-full py-8 px-4 bg-red-600 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold">Deliver To Your Doorstep</h1>
        <p className="mt-4 text-lg md:text-xl">
          Fast and reliable delivery service, anywhere on Google Maps.
        </p>
      </header>

      {/* Main Section */}
      <main className="flex flex-col md:flex-row items-center justify-between p-8 space-y-8 md:space-y-0 md:space-x-12">
        {/* Description */}
        <div className="text-center md:text-left max-w-md">
          <h2 className="text-3xl font-semibold text-red-600">Track, Order & Relax</h2>
          <p className="mt-4 text-gray-700">
            Order from your favorite stores and track deliveries to any point on the map. Enjoy a seamless, efficient delivery experience that keeps you updated every step of the way.
          </p>
          <button className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md">
            Get Started
          </button>
        </div>

        {/* Image Placeholder */}
        <div className="w-full max-w-sm md:max-w-md flex justify-center">
          <img
            src={landingpageImg}
            alt="Map delivery visualization"
            className="rounded-lg shadow-lg"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="w-full bg-red-50 py-12 px-8 pb-16 mt-8 text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-8">Why Choose Us?</h2>
        <div className="flex flex-col mx-auto max-w-[60vw] md:mx-0 md:max-w-[100vw] md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="p-6 max-w-xs bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-bold text-red-600">Live Tracking</h3>
            <p className="text-gray-700 mt-2">
              Track your delivery on the map in real-time. No more wondering where your package is!
            </p>
          </div>
          <div className="p-6 max-w-xs bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-bold text-red-600">Fast Delivery</h3>
            <p className="text-gray-700 mt-2">
              Speedy deliveries with ETA updates, so you’re never left waiting.
            </p>
          </div>
          <div className="p-6 max-w-xs bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-bold text-red-600">Secure Payments</h3>
            <p className="text-gray-700 mt-2">
              Safe and reliable payment options for a hassle-free experience.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-red-600 text-white text-center py-6">
        <p>© 2024 DeliveryApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
