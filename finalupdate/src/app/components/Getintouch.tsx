"use client";

import React from "react";
import { FiMapPin, FiPhone, FiClock } from "react-icons/fi";

const GetInTouch: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-6">
      <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section - Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Get In Touch With Us</h2>
          <p className="text-gray-600">
            For more information about our products & services, please feel
            free to drop us an email. Our staff will always be there to help you
            out. Do not hesitate!
          </p>
          {/* Address */}
          <div className="flex items-start space-x-4">
            <FiMapPin className="text-2xl text-gray-500" />
            <div>
              <h3 className="font-bold">Address</h3>
              <p className="text-gray-600">
                236 5th SE Avenue, New York NY10000, United States
              </p>
            </div>
          </div>
          {/* Phone */}
          <div className="flex items-start space-x-4">
            <FiPhone className="text-2xl text-gray-500" />
            <div>
              <h3 className="font-bold">Phone</h3>
              <p className="text-gray-600">
                Mobile: (+84) 546-6789
                <br />
                Hotline: (+84) 456-6789
              </p>
            </div>
          </div>
          {/* Working Time */}
          <div className="flex items-start space-x-4">
            <FiClock className="text-2xl text-gray-500" />
            <div>
              <h3 className="font-bold">Working Time</h3>
              <p className="text-gray-600">
                Monday-Friday: 9:00 - 22:00
                <br />
                Saturday-Sunday: 9:00 - 21:00
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div>
          <form className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block font-medium text-gray-700 mb-1"
              >
                Your Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block font-medium text-gray-700 mb-1"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="This is optional"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Hi! I'd like to ask about..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
