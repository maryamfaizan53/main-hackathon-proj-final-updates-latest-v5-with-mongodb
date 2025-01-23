import Image from 'next/image';
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-[#FBEBB5] min-h-screen flex items-center px-4 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Left Content */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-snug">
            Rocket single <br /> seater
          </h1>
          <p className="text-lg text-gray-600">
            Elegant and comfortable seating for your modern living room.
          </p>
          <a
            href="#shop"
            className="inline-block text-black font-medium underline hover:no-underline hover:text-gray-800 transition"
          >
            Shop Now
          </a>
        </div>

        {/* Right Content: Image */}
        <div className="flex justify-center items-center">
          <Image
            src="/images/single_seater.png"
            width={1200}
            height={1200}
            alt="Rocket Single Seater"
            className="w-full max-w-sm md:max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
