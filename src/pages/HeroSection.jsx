import React from "react";

const HeroSection = () => {
  return (
    <section className="text-center py-20 md:py-28 bg-white rounded-3xl shadow-2xl overflow-hidden relative mb-16 animate-fade-in-up">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 opacity-70"></div>
      <div className="relative z-10 p-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight drop-shadow-md">
          Your Cravings, <span className="text-red-600">Delivered Fast</span>.
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto font-light">
          Experience the joy of fresh, delicious meals brought directly to your
          doorstep.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
