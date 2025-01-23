"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "../../types";

type ProductDetailsProps = {
  product: Product;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  // We only have one image in the schema, stored in product.imagePath:
  const [selectedImage] = useState(product.image || "");

  // Compute a discounted price if discountPercentage > 0
  const hasDiscount = product.discountPercentage > 0;
  const finalPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100)
  );

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left: Single Image */}
      <div>
        <div className="relative">
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
      </div>
    </div>
  );
};

export default ProductDetails;

