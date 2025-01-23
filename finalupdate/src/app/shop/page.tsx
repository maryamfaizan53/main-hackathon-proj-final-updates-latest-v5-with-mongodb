"use client"
import { useEffect, useState } from "react";
import { Product } from "../../types"; // or "../../types" if that's your path
import ShopBanner from "../../app/components/ShopBanner";
import ProductDisplay from "../../app/components/ProductDisplay";
import FeaturesSection from "../../app/components/FeaturesSection";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ... same code
    async function fetchProducts() {
            try {
              const res = await fetch("/api/products");
              if (!res.ok) throw new Error("Failed to fetch");
              const data = await res.json();
              setProducts(data.products); 
            } catch (error) {
              console.error(error);
            } finally {
              setLoading(false);
            }
          }
          fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <ShopBanner />
<h1 className="text-2xl font-bold text-center mb-6">Our Products</h1>
      <ProductDisplay products={products} />
      <FeaturesSection />
    </>
  );
}
