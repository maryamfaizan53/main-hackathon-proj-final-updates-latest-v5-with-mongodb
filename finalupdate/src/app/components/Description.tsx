/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import React, { useState } from "react";
import Image from "next/image";

/**
 * If you already have a Product interface in `src/types.ts`,
 * you can import it instead of redefining here. Just make sure
 * it has `id: number`, `description: string`, `images: string[]`, etc.
 */
export interface Product {
  id: number;
  description: string;
  images: string[];
  // ... add other fields if you have them (name, price, etc.)
}

type DescriptionProps = {
  product: Product;
};

const Description: React.FC<DescriptionProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<"Description" | "Additional Information" | "Reviews">("Description");

  /**
   *  Additional info and reviews keyed by product.id.
   *  If your `product.id` is large or dynamic, you can store them differently,
   *  but this example uses a simple object keyed by numeric IDs.
   */
  const additionalInfo: Record<number, string> = {
    1: "Crafted with premium materials to ensure durability and comfort.",
    2: "Made from high-quality granite with a polished finish.",
  };

  const reviews: Record<
    number,
    {
      id: number;
      reviewer: string;
      comment: string;
      rating: number;
    }[]
  > = {
    1: [
      { id: 1, reviewer: "John Doe", comment: "Amazing quality!", rating: 5 },
      { id: 2, reviewer: "Jane Smith", comment: "Looks great in my living room.", rating: 4 },
    ],
    2: [
      { id: 1, reviewer: "Alice Johnson", comment: "Sturdy and beautiful!", rating: 5 },
      { id: 2, reviewer: "Bob Lee", comment: "Perfect size for my dining area.", rating: 4 },
    ],
  };

  const handleTabChange = (tab: "Description" | "Additional Information" | "Reviews") => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Tabs */}
      <div className="flex space-x-8 border-b border-gray-300 mb-6">
        {["Description", "Additional Information", "Reviews"].map((tab) => {
          // Type assertion as a convenience since we know the valid string union
          const typedTab = tab as "Description" | "Additional Information" | "Reviews";
          return (
            <button
              key={tab}
              onClick={() => handleTabChange(typedTab)}
              className={`py-2 px-4 text-lg font-medium ${
                activeTab === tab ? "border-b-2 border-black text-black" : "text-gray-500"
              } transition`}
            >
              {tab}
              {tab === "Reviews" && <span className="ml-1 text-sm">[{reviews[product.id]?.length || 0}]</span>}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "Description" && (
          <div>
            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {product.images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  width={80}
                  height={80}
                  alt={`Product Image ${index}`}
                  className="w-full h-auto rounded-md shadow-md"
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "Additional Information" && (
          <div>
            <p className="text-gray-700 leading-relaxed">{additionalInfo[product.id]}</p>
          </div>
        )}

        {activeTab === "Reviews" && (
          <div className="space-y-4">
            {reviews[product.id]?.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <p className="text-lg font-semibold">{review.reviewer}</p>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
              </div>
            ))}
            {!reviews[product.id]?.length && <p className="text-gray-500">No reviews for this product yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;



// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/rules-of-hooks */

// "use client";

// import React, { useState } from "react";
// import { Product } from "@/types";

// // Ensure product.id is a number
// type ProductWithId = Product & { id: number };
// import Image from "next/image";

// type DescriptionProps = {

// const Description: React.FC<DescriptionProps> = ({ product }) => {
//   const [activeTab, setActiveTab] = useState<"Description" | "Additional Information" | "Reviews">("Description");

//   // Define additional information and reviews with proper typing
//   const additionalInfo: Record<number, string> = {
//     1: "Crafted with premium materials to ensure durability and comfort.",
//     2: "Made from high-quality granite with a polished finish.",
//   };

//   const reviews: Record<number, { id: number; reviewer: string; comment: string; rating: number }[]> = {
//     1: [
//       { id: 1, reviewer: "John Doe", comment: "Amazing quality!", rating: 5 },
//       { id: 2, reviewer: "Jane Smith", comment: "Looks great in my living room.", rating: 4 },
//     ],
//     2: [
//       { id: 1, reviewer: "Alice Johnson", comment: "Sturdy and beautiful!", rating: 5 },
//       { id: 2, reviewer: "Bob Lee", comment: "Perfect size for my dining area.", rating: 4 },
//     ],
//   };

//   const handleTabChange = (tab: "Description" | "Additional Information" | "Reviews") => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Tabs */}
//       <div className="flex space-x-8 border-b border-gray-300 mb-6">
//         {["Description", "Additional Information", "Reviews"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => handleTabChange(tab as any)}
//             className={`py-2 px-4 text-lg font-medium ${
//               activeTab === tab ? "border-b-2 border-black text-black" : "text-gray-500"
//             } transition`}
//           >
//             {tab}
//             {tab === "Reviews" && <span className="ml-1 text-sm">[{reviews[product.id]?.length || 0}]</span>}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div>
//         {activeTab === "Description" && (
//           <div>
//             <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
//               {product.images.map((img, index) => (
//                 <Image
//                   key={index}
//                   src={img}
//                   width={80}
//                     height={80}
//                   alt={`Product Image ${index}
//                   `}
//                   className="w-full h-auto rounded-md shadow-md"
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "Additional Information" && (
//           <div>
//             <p className="text-gray-700 leading-relaxed">{additionalInfo[product.id]}</p>
//           </div>
//         )}

//         {activeTab === "Reviews" && (
//           <div className="space-y-4">
//             {reviews[product.id]?.map((review) => (
//               <div key={review.id} className="border-b pb-4">
//                 <p className="text-lg font-semibold">{review.reviewer}</p>
//                 <p className="text-gray-700">{review.comment}</p>
//                 <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
//               </div>
//             ))}
//             {!reviews[product.id]?.length && (
//               <p className="text-gray-500">No reviews for this product yet.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Description;
