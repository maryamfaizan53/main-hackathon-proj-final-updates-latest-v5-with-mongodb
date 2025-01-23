import React from 'react';
import { blogs, Blogw } from '../blogsData';
import { AiOutlineClockCircle, AiOutlineCalendar } from 'react-icons/ai';
import Image from 'next/image';

const Blog: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Our Blogs</h2>
          <p className="text-gray-600 mt-2">
            Find a bright ideal to suit your taste with our great selection
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog: Blogw) => (
            <div
              key={blog.id}
              className="flex flex-col items-center text-center space-y-4 bg-gray-50 rounded-lg shadow-md overflow-hidden"
            >
              {/* Blog Image */}
              <Image
                src={blog.image}
                width={1200}
                height={1200}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />

              {/* Blog Content */}
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800">
                  {blog.title}
                </h3>
                <p className="text-blue-500 font-semibold mt-2">
                  {blog.description}
                </p>

                {/* Meta Information */}
                <div className="flex justify-center items-center space-x-4 text-gray-600 mt-4">
                  <div className="flex items-center space-x-1">
                    <AiOutlineClockCircle className="text-lg" />
                    <span>{blog.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <AiOutlineCalendar className="text-lg" />
                    <span>{blog.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Posts Button */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block text-black font-medium underline hover:no-underline hover:text-gray-800 transition"
          >
            View All Post
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
