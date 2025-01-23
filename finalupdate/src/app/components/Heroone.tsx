import Image from 'next/image';
import React from 'react';

const HeroOne: React.FC = () => {
  const products = [
    {
      id: 1,
      name: 'Side table',
      image: '/images/sidetable1.png',
      link: '#',
    },
    {
      id: 2,
      name: 'Side table',
      image: '/images/sidetable2.png',
      link: '#',
    },
  ];

  return (
    <section className="bg-[#F7F7F7] py-12 ">
      <div className="container mx-auto px-4 md:px-12 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center text-center space-y-4"
            >
              {/* Product Image */}
              <div className="w-full max-w-sm">
                <Image
                  src={product.image}
                  width={80}
                    height={80}
                  alt={product.name}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Product Name */}
              <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>

              {/* View More Link */}
              <a
                href={product.link}
                className="text-black font-medium underline hover:no-underline hover:text-gray-800 transition"
              >
                View More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroOne;
