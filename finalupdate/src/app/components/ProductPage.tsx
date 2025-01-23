"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

/**
 * This component expects a single `product` prop
 * that matches the unified `Product` interface.
 */
type ProductPageProps = {
  product: Product;
};

export default function ProductPage({ product }: ProductPageProps) {
  // Default to product.image if available, else use fallback
  const [selectedImage] = useState(
    product.image || product.imagePath || "/default-image-path.jpg"
  );

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Determine if there's a discount
  const hasDiscount = product.discountPercentage > 0;
  // Calculate discounted price
  const finalPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100)
  );

  // We'll unify references by letting `itemId` = whichever ID/slug is available
  const itemId = product.id || product.slug || "unknown-id";

  /**
   * Add to cart
   * - If your system truly needs a unique string ID, you can fallback to slug
   *   or some "unknown-id" placeholder as above.
   */
  const handleAddToCart = () => {
    addToCart({
      id: itemId,
      name: product.name,
      price: hasDiscount ? finalPrice : product.price,
      // Use whichever image field you prefer
      image: product.image || product.imagePath || "",
    });
  };

  // Wishlist Toggle
  const handleWishlistToggle = () => {
    if (isInWishlist(itemId)) {
      removeFromWishlist(itemId);
    } else {
      addToWishlist({
        id: itemId,
        name: product.name,
        price: hasDiscount ? finalPrice : product.price,
        image: product.image || product.imagePath || "",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
      {/* Left: Single Image */}
      <div>
        <div className="relative w-full">
          <Image
            src={selectedImage}
            alt={product.name}
            width={500}
            height={500}
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {/* Right: Product Details */}
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        {hasDiscount ? (
          <div className="mt-2">
            <span className="text-red-500 text-xl">
              Rs. {finalPrice.toLocaleString()}
            </span>
            <span className="text-gray-400 line-through ml-2">
              Rs. {product.price.toLocaleString()}
            </span>
          </div>
        ) : (
          <p className="text-red-500 text-xl mt-2">
            Rs. {product.price.toLocaleString()}
          </p>
        )}

        <p className="mt-4">{product.description}</p>

        <button
          onClick={handleAddToCart}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 mt-6"
        >
          Add to Cart
        </button>

        <button
          onClick={handleWishlistToggle}
          className="ml-4 text-red-500 hover:text-black"
        >
          {isInWishlist(itemId) ? "❤️ Remove from Wishlist" : "🤍 Add to Wishlist"}
        </button>

        <div className="mt-8 space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-semibold">SKU:</span> {itemId}
          </p>
          {/* If you fetch category->title, you could display like so: */}
          {/* <p>
            <span className="font-semibold">Category:</span> {product.category?.title}
          </p> */}
          <p>
            <span className="font-semibold">Stock Level:</span> {product.stockLevel}
          </p>
        </div>
      </div>
    </div>
  );
}

