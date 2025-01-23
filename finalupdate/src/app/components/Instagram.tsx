import Link from 'next/link';
import React from 'react';

const Instagram: React.FC = () => {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-12"
      style={{
        backgroundImage: 'url("/images/ourinsta.png")', 
      }}
    >
      <div className="bg-white/80 backdrop-blur-sm py-12 rounded-lg mx-auto max-w-3xl text-center shadow-lg">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800">Our Instagram</h2>
        <p className="text-gray-600 mt-2">Follow our store on Instagram</p>

        {/* Follow Us Button */}
        <div className="mt-6">
          <Link
            href="https://www.instagram.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black px-6 py-3 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:bg-gray-800 transition"
          >
            Follow Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Instagram;
