import React from "react";
const categories = [
  { name: "Pizza", color: "from-red-500 to-red-600", icon: "🍕" },
  { name: "Burgers", color: "from-orange-500 to-orange-600", icon: "🍔" },
  { name: "Asian", color: "from-green-500 to-green-600", icon: "🍜" },
  { name: "Desserts", color: "from-pink-500 to-pink-600", icon: "🍰" },
  { name: "Healthy", color: "from-emerald-500 to-emerald-600", icon: "🥗" },
  { name: "Breakfast", color: "from-yellow-500 to-yellow-600", icon: "🍳" },
  { name: "Drinks", color: "from-blue-500 to-blue-600", icon: "🥤" },
  { name: "Mexican", color: "from-lime-500 to-lime-600", icon: "🌮" },
];
const Categories = () => {
  return (
    <section className="py-14 bg-white rounded-3xl shadow-2xl mb-16 animate-fade-in">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        Explore Top Cuisines
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 px-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 text-center 
                           hover:shadow-xl transition duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer 
                           border border-gray-100 group animate-pop-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`mx-auto w-20 h-20 bg-gradient-to-tr ${cat.color} rounded-full flex items-center justify-center text-4xl mb-5 shadow-xl group-hover:scale-110 transition duration-300`}
            >
              {cat.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {cat.name}
            </h3>
            <p className="text-gray-600 text-md">Savor {cat.name} wonders</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
