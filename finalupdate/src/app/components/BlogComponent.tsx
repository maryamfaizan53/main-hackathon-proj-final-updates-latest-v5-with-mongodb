// src/app/components/BlogComponent.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaUserAlt, FaRegCalendarAlt, FaTags } from "react-icons/fa";

// Match the shape from your query (id, title, etc.):
type BlogPost = {
  id: number;       // numeric ID from customId
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  image: string;
};

const BlogComponent: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        // "data.blogs" is an array of objects from the API route
        setBlogs(data.blogs || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 lg:px-16">
        <p>Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {blogs.map((post) => (
            <div key={post.id} className="space-y-4">
              {/* Blog Image */}
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={80}
                  height={80}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Blog Details */}
              <div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <FaUserAlt />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaRegCalendarAlt />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaTags />
                    <span>{post.category}</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mt-2">{post.title}</h2>
                <p className="text-gray-600 mt-2">{post.description}</p>
                <a
                  href="#"
                  className="text-blue-600 font-semibold hover:underline mt-4 inline-block"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-yellow-400"
            />
            <button className="absolute right-2 top-2 text-gray-500">🔍</button>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-black">
                  Crafts <span className="text-gray-400">(2)</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Design <span className="text-gray-400">(8)</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Handmade <span className="text-gray-400">(7)</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Interior <span className="text-gray-400">(1)</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Wood <span className="text-gray-400">(6)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Recent Posts */}
          <div>
            <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
            <ul className="space-y-4">
              {blogs.map((post) => (
                <li key={post.id} className="flex items-center space-x-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={80}
                    height={80}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <a
                      href="#"
                      className="text-gray-800 font-semibold hover:underline"
                    >
                      {post.title}
                    </a>
                    <p className="text-sm text-gray-500">{post.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogComponent;





// // src/app/components/BlogComponent.tsx
// "use client";

// import Image from "next/image";
// import React from "react";
// import { FaUserAlt, FaRegCalendarAlt, FaTags } from "react-icons/fa";

// type BlogPost = {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   category: string;
//   author: string;
//   image: string;
// };

// const blogPosts: BlogPost[] = [
//   {
//     id: 1,
//     title: "Going all-in with millennial design",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     date: "14 Oct 2022",
//     category: "Wood",
//     author: "Admin",
//     image: "/images/blog1.jpg",
//   },
//   {
//     id: 2,
//     title: "Exploring new ways of decorating",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     date: "14 Oct 2022",
//     category: "Handmade",
//     author: "Admin",
//     image: "/images/blog2.jpg",
//   },
// ];

// const BlogComponent: React.FC = () => {
//   return (
//     <div className="container mx-auto py-12 px-4 lg:px-16">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Main Content */}
//         <div className="lg:col-span-2 space-y-10">
//           {blogPosts.map((post) => (
//             <div key={post.id} className="space-y-4">
//               {/* Blog Image */}
//               <div className="overflow-hidden rounded-lg">
//                 <Image
//                   src={post.image}
//                   alt={post.title}
//                   width={80}
//                     height={80}
//                   className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//               {/* Blog Details */}
//               <div>
//                 <div className="flex items-center space-x-4 text-sm text-gray-500">
//                   <div className="flex items-center space-x-1">
//                     <FaUserAlt />
//                     <span>{post.author}</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <FaRegCalendarAlt />
//                     <span>{post.date}</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <FaTags />
//                     <span>{post.category}</span>
//                   </div>
//                 </div>
//                 <h2 className="text-2xl font-bold mt-2">{post.title}</h2>
//                 <p className="text-gray-600 mt-2">{post.description}</p>
//                 <a
//                   href="#"
//                   className="text-blue-600 font-semibold hover:underline mt-4 inline-block"
//                 >
//                   Read more
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Sidebar */}
//         <aside className="space-y-8">
//           {/* Search Bar */}
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-yellow-400"
//             />
//             <button className="absolute right-2 top-2 text-gray-500">
//               🔍
//             </button>
//           </div>

//           {/* Categories */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Categories</h3>
//             <ul className="space-y-2 text-gray-600">
//               <li>
//                 <a href="#" className="hover:text-black">
//                   Crafts <span className="text-gray-400">(2)</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-black">
//                   Design <span className="text-gray-400">(8)</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-black">
//                   Handmade <span className="text-gray-400">(7)</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-black">
//                   Interior <span className="text-gray-400">(1)</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-black">
//                   Wood <span className="text-gray-400">(6)</span>
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Recent Posts */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
//             <ul className="space-y-4">
//               {blogPosts.map((post) => (
//                 <li key={post.id} className="flex items-center space-x-4">
//                   <Image
//                     src={post.image}
//                     alt={post.title}
//                     width={80}
//                     height={80}
//                     className="w-16 h-16 object-cover rounded-lg"
//                   />
//                   <div>
//                     <a
//                       href="#"
//                       className="text-gray-800 font-semibold hover:underline"
//                     >
//                       {post.title}
//                     </a>
//                     <p className="text-sm text-gray-500">{post.date}</p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default BlogComponent;
