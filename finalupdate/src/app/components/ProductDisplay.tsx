"use client"
// src/app/components/ProductDisplay.tsx
import { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../types";

type ProductDisplayProps = {
  products: Product[];
};

const ProductDisplay: React.FC<ProductDisplayProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(16);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded-lg px-4 py-2 w-full max-w-sm"
        />
        <select
          className="border rounded-lg px-4 py-2 ml-4"
          value={productsPerPage}
          onChange={(e) => setProductsPerPage(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={16}>16</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product, index) => (
          // Now we use product.slug instead of product.id for the key
          <ProductCard key={`${product.slug}-${index}`} product={product} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <div>
          Showing {(currentPage - 1) * productsPerPage + 1}-
          {Math.min(currentPage * productsPerPage, filteredProducts.length)} of{" "}
          {filteredProducts.length} results
        </div>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-4 py-2 border rounded-md ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;

