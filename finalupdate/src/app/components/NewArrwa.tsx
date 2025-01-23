import Image from 'next/image';
import React from 'react';

const NewArrwa: React.FC = () => {
  return (
    <section className="bg-[#FBF5DC] py-12">
      <div className="container mx-auto px-4 md:px-16 grid grid-cols md:grid-cols-2 items-center gap-8">
        {/* Image Section */}
        <div className="flex justify-center">
          <Image
            src="/images/ss001_1.png" 
            width={1600}
            height={1600}
            alt="Asgaard Sofa"
            className="w-full  object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left space-y-4">
          <p className="text-lg font-medium text-gray-600">New Arrivals</p>
          <h2 className="text-4xl font-bold text-gray-800">Asgaard sofa</h2>
          <a
            href="#"
            className="inline-block bg-white border border-black text-black font-medium px-6 py-3 mt-4 hover:bg-black hover:text-white transition"
          >
            Order Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewArrwa;
