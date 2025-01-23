"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Access cart and wishlist context
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#FBEBB5] px-4 py-3 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/"> furniSite </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium">
          <li>
            <Link href="/" className="hover:text-gray-600 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/shop" className="hover:text-gray-600 transition">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/shop" className="hover:text-gray-600 transition">
              Product
            </Link>
          </li>
          <li>
            <Link href="/myaccount" className="hover:text-gray-600 transition">
            myaccount
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-600 transition">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/wishlist" className="hover:text-gray-600 transition">
              wishlist
            </Link>
          </li>
          <li>
            <Link href="/cart" className="hover:text-gray-600 transition">
              cart
            </Link>
          </li>

         

          <li>
            <Link href="/billing" className="hover:text-gray-600 transition">
              billing
            </Link>
          </li>
        </ul>

        {/* Icons */}
        
        <div className="hidden md:flex space-x-6 text-xl relative">
  <Link href="/myaccount">
    <AiOutlineUser className="hover:text-gray-600 cursor-pointer transition" />
  </Link>
  <AiOutlineSearch className="hover:text-gray-600 cursor-pointer transition" />
  {/* Wishlist Icon */}
  <Link href="/wishlist">
    <div className="relative">
      <AiOutlineHeart className="hover:text-gray-600 cursor-pointer transition" />
      {wishlist.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
          {wishlist.length}
        </span>
      )}
    </div>
  </Link>
  {/* Cart Icon */}
  <Link href="/cart">
    <div className="relative">
      <AiOutlineShoppingCart className="hover:text-gray-600 cursor-pointer transition" />
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
          {cart.length}
        </span>
      )}
    </div>
  </Link>
</div>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? (
              <AiOutlineClose className="text-2xl cursor-pointer" />
            ) : (
              <AiOutlineMenu className="text-2xl cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 font-medium">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                href="/"
                className="block text-center hover:text-gray-600 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="block text-center hover:text-gray-600 transition"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="block text-center hover:text-gray-600 transition"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                href="/products/1"
                className="block text-center hover:text-gray-600 transition"
              >
                Products
              </Link>
            </li>
            <li>
            <Link href="/shop" className="hover:text-gray-600 transition">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/products/1" className="hover:text-gray-600 transition">
              Product
            </Link>
          </li>
          <li>
            <Link href="/myaccount" className="hover:text-gray-600 transition">
            myaccount
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-600 transition">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/wishlist" className="hover:text-gray-600 transition">
              wishlist
            </Link>
          </li>
          <li>
            <Link href="/cart" className="hover:text-gray-600 transition">
              cart
            </Link>
          </li>

          <li>
            <Link href="/blog" className="hover:text-gray-600 transition">
              blog
            </Link>
          </li>

          <li>
            <Link href="/billing" className="hover:text-gray-600 transition">
              billing
            </Link>
          </li>
          </ul>

          {/* Mobile Icons */}
          <div className="flex justify-center space-x-6 text-xl relative">
            <AiOutlineUser className="hover:text-gray-600 cursor-pointer transition" />
            <AiOutlineSearch className="hover:text-gray-600 cursor-pointer transition" />
            {/* Wishlist Icon */}
            <Link href="/wishlist">
              <div className="relative">
                <AiOutlineHeart className="hover:text-gray-600 cursor-pointer transition" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
            </Link>
            {/* Cart Icon */}
            <Link href="/cart">
              <div className="relative">
                <AiOutlineShoppingCart className="hover:text-gray-600 cursor-pointer transition" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
                    {cart.length}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
