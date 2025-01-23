import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-8 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Address Section */}
          <div className="text-gray-600 text-sm">
            <p>bahadurabad,</p>
            <p>Pakistan</p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-3">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-800 hover:text-black transition">
                  Home
                </Link>
              </li>
              <li>
              <Link href="/shop" className="text-gray-800 hover:text-black transition">
                  Shop
                  </Link>
              </li>
              <li>
              <Link href="/blog" className="text-gray-800 hover:text-black transition">
                  blog
                  </Link>
              </li>
              <li>
              <Link href="/cart" className="text-gray-800 hover:text-black transition">
                  cart
                  </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-3">Help</h3>
            <ul className="space-y-2">
              <li>
              <Link href="/" className="text-gray-800 hover:text-black transition">
                  Payment Options
                  </Link>
              </li>
              <li>
              <Link href="/" className="text-gray-800 hover:text-black transition">
                  Returns
                  </Link>
              </li>
              <li>
              <Link  href="/" className="text-gray-800 hover:text-black transition">
                  Privacy Policies
                  </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-3">
              Newsletter
            </h3>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>2025 Maryam developer @ All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
