// src/app/components/TopPicks.tsx
import React from 'react';
import { toppicks, Product } from '../ToppicksData';
import Image from 'next/image';

const TopPicks: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Top Picks For You</h2>
          <p className="text-gray-600 mt-2">
            Find a bright ideal to suit your taste with our great selection of suspension, floor, and table lights.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {toppicks.map((product: Product) => (
            <div key={product.id} className="flex flex-col items-center text-center space-y-4">
              {/* Product Image */}
              <Image
                src={product.image}
                width={1200}
                height={1200}
                alt={product.name}
                className="w-full max-w-xs h-auto object-contain"
              />

              {/* Product Name */}
              <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>

              {/* Product Price */}
              <p className="text-lg font-semibold text-gray-600">{product.price}</p>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block text-black font-medium underline hover:no-underline hover:text-gray-800 transition"
          >
            View More
          </a>
        </div>
      </div>
    </section>
  );
};

export default TopPicks;
