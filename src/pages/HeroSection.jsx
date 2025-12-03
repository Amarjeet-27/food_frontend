import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl shadow-xl mb-12 bg-white">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 px-6 py-16 md:py-20 max-w-7xl mx-auto text-center md:text-left"
        style={{ fontFamily: "Times New Roman, serif" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Manage Your <span className="text-indigo-600">Shop Smartly</span>
          </h1>

          <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-700 max-w-2xl">
            Add items, track orders, monitor sales and keep your store running
            smoothly
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/shop/items/new"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 flex items-center gap-2"
            >
              ➕ Add New Item
            </Link>

            <Link
              to="/shop/orders"
              className="px-6 py-3 rounded-xl bg-white border shadow-sm text-gray-800 font-medium hover:bg-gray-50 flex items-center gap-2"
            >
              📦 Manage Orders
            </Link>
          </div>
        </motion.div>

        {/* Right side stat card to match dashboard visuals */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 md:absolute md:right-10 md:top-1/2 md:-translate-y-1/2"
        >
          <div className="bg-white shadow-lg rounded-2xl p-6 border w-full max-w-xs text-left">
            <h3 className="text-lg font-semibold mb-2">Today's Summary</h3>

            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex justify-between">
                Orders: <span className="font-semibold text-gray-900">23</span>
              </p>

              <p className="flex justify-between">
                Revenue:
                <span className="font-semibold text-gray-900">₹12,450</span>
              </p>

              <p className="flex justify-between">
                Items Sold:
                <span className="font-semibold text-gray-900">57</span>
              </p>
            </div>

            <Link
              to="/shop/reports"
              className="mt-4 block text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
            >
              View Reports
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
