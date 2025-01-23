// /app/products/[slug]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ShopBanner from "../../../app/components/ShopBanner";
import ProductPage from "../../../app/components/ProductPage";
import FeaturesSection from "../../../app/components/FeaturesSection";

// Adjust this interface as needed for your product structure
interface Product {
  name: string;
  slug: string;
  price: number;
  description: string;
  discountPercentage: number;
  isFeaturedProduct: boolean;
  stockLevel: number;
  image: string; // The "imagePath" is now "image" from the query
  category?: {
    title?: string;
  };
}

export default function SingleProductWrapper() {
  // Slug from the URL is now called "slug"
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      console.error("Slug is missing!");
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        // This calls our new route at /api/products/[slug]
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();

        // data.product is a single object (not an array) in our route
        if (data.product) {
          setProduct(data.product);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product Not Found!</p>;

  return (
    <>
      <ShopBanner />
      <ProductPage product={product} />
      <FeaturesSection />
    </>
  );
}

