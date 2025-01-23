"use client";

import React from "react";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "Free Delivery",
      description: "For all orders over $50, consectetur adipim scing elit.",
    },
    {
      title: "90 Days Return",
      description: "If goods have problems, consectetur adipim scing elit.",
    },
    {
      title: "Secure Payment",
      description: "100% secure payment, consectetur adipim scing elit.",
    },
  ];

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-8xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
