import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="container mx-auto px-6 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} FastBite Delivery. All rights
          reserved.
        </p>
        <div className="mt-4 space-x-6">
          <a href="#" className="hover:text-red-500 transition">
            Privacy Policy
          </a>
          <span className="text-gray-700">|</span>
          <a href="#" className="hover:text-red-500 transition">
            Terms of Service
          </a>
          <span className="text-gray-700">|</span>
          <a href="#" className="hover:text-red-500 transition">
            Sitemap
          </a>
        </div>
        <p className="mt-4 text-gray-500">
          Crafted with ❤️ for delightful food experiences.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
