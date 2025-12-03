import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CustomerHeroSection({ onSearch }) {
  return (
    <section className="relative overflow-hidden rounded-3xl shadow-2xl mb-14">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://foodish-api.com/images/pizza/pizza1.jpg"
          alt="food banner"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-orange-100/50" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 px-6 py-16 md:py-24 max-w-6xl mx-auto text-center"
        style={{ fontFamily: "Times New Roman, serif" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-md"
        >
          Delicious Meals,
          <span className="text-yellow-300"> Delivered Fresh</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-6 text-lg md:text-2xl text-gray-100 max-w-3xl mx-auto"
        >
          Explore a wide selection of mouth-watering dishes from top kitchens
          around you.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-8 max-w-xl mx-auto"
        >
          <label className="relative block">
            <input
              type="search"
              onChange={(e) => onSearch && onSearch(e.target.value)}
              placeholder="Search dishes e.g. 'Pizza', 'Biryani', 'Burger'…"
              className="w-full rounded-full px-5 py-3 pr-12 shadow-lg border border-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-4 top-3.5 h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35"
              />
              <circle
                cx="11"
                cy="11"
                r="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </label>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/customer/items"
            className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold shadow-lg hover:bg-yellow-500"
          >
            Browse Menu
          </Link>

          <Link
            to="/customer/cart"
            className="px-6 py-3 rounded-xl bg-white text-gray-900 border shadow hover:bg-gray-50"
          >
            View Cart
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
