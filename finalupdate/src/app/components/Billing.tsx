"use client";

import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";

export default function Billing() {
  const [paymentMethod, setPaymentMethod] = useState<string>("Bank Transfer");
  const { cart, clearCart } = useCart();
  const { user } = useUser(); // user?.email is the account's email

  // SHIPMENT FIELDS (form states)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("Sri Lanka");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("Western Province");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingEmail, setShippingEmail] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Calculate total from cart
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Payment method radio
  const handlePaymentChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    try {
      // 1) Map cart items into a simpler array
      const orderItems = cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      // 2) Build shipping info object
      const shippingDetails = {
        firstName,
        lastName,
        company,
        country,
        address,
        city,
        province,
        zip,
        phone,
        email: shippingEmail || user?.email || "guest@example.com",
        additionalInfo,
      };

      // 3) Create payload with items, shipping, total, etc.
      const payload = {
        userEmail: user?.email || "guest@example.com",
        items: orderItems,
        total,
        shipping: shippingDetails,
        status: paymentMethod === "Cash on Delivery" ? "pending" : "paid",
      };

      // 4) Send to your /api/orders route
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to place order");
      const data = await res.json();
      console.log("Order created in Sanity:", data.order);

      // 5) Clear cart + alert user
      clearCart();
      alert("Order placed successfully!");

      // Optionally redirect, e.g. router.push("/order-confirmation?orderId=" + data.order._id)
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* === LEFT: Shipping/Billing Form === */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first-name" className="block font-medium mb-1">
                  First Name
                </label>
                <input
                  id="first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block font-medium mb-1">
                  Last Name
                </label>
                <input
                  id="last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="mt-4">
              <label htmlFor="company-name" className="block font-medium mb-1">
                Company Name (Optional)
              </label>
              <input
                id="company-name"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
              />
            </div>

            {/* Country/Region */}
            <div className="mt-4">
              <label htmlFor="country" className="block font-medium mb-1">
                Country / Region
              </label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                {/* etc. */}
              </select>
            </div>

            {/* Address */}
            <div className="mt-4">
              <label htmlFor="address" className="block font-medium mb-1">
                Street Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="Street Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
              />
            </div>

            {/* Town/City */}
            <div className="mt-4">
              <label htmlFor="city" className="block font-medium mb-1">
                Town / City
              </label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
              />
            </div>

            {/* Province */}
            <div className="mt-4">
              <label htmlFor="province" className="block font-medium mb-1">
                Province
              </label>
              <select
                id="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                <option value="Western Province">Western Province</option>
                <option value="Central Province">Central Province</option>
                <option value="Eastern Province">Eastern Province</option>
                {/* etc. */}
              </select>
            </div>

            {/* ZIP Code */}
            <div className="mt-4">
              <label htmlFor="zip" className="block font-medium mb-1">
                ZIP Code
              </label>
              <input
                id="zip"
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
              />
            </div>

            {/* Phone */}
            <div className="mt-4">
              <label htmlFor="phone" className="block font-medium mb-1">
                Phone
              </label>
              <input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
              />
            </div>

            {/* Shipping Email */}
            <div className="mt-4">
              <label htmlFor="shippingEmail" className="block font-medium mb-1">
                Email Address (For Shipping Updates)
              </label>
              <input
                id="shippingEmail"
                type="email"
                value={shippingEmail}
                onChange={(e) => setShippingEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
              />
            </div>

            {/* Additional Information */}
            <div className="mt-4">
              <label htmlFor="additional" className="block font-medium mb-1">
                Additional Information
              </label>
              <textarea
                id="additional"
                rows={4}
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
              ></textarea>
            </div>
          </form>
        </div>

        {/* === RIGHT: Order Summary === */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>Rs. {item.price * item.quantity}</span>
            </div>
          ))}

          <div className="flex justify-between items-center border-t pt-4">
            <span className="font-semibold">Subtotal</span>
            <span>Rs. {total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-lg text-yellow-500">
              Rs. {total.toLocaleString()}
            </span>
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <div className="space-y-2">
              <div>
                <input
                  type="radio"
                  id="bank"
                  name="payment"
                  checked={paymentMethod === "Bank Transfer"}
                  onChange={() => handlePaymentChange("Bank Transfer")}
                  className="mr-2"
                />
                <label htmlFor="bank" className="text-sm">
                  Direct Bank Transfer
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={() => handlePaymentChange("Cash on Delivery")}
                  className="mr-2"
                />
                <label htmlFor="cod" className="text-sm">
                  Cash On Delivery
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="card"
                  name="payment"
                  checked={paymentMethod === "Card Payment"}
                  onChange={() => handlePaymentChange("Card Payment")}
                  className="mr-2"
                />
                <label htmlFor="card" className="text-sm">
                  Card / Stripe (Demo)
                </label>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Your personal data will be used ...
          </p>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}


// "use client";

// import React, { useState } from "react";
// import { useCart } from "../../context/CartContext";
// // If you have a user context or store the user’s email somewhere:
// import { useUser } from "../../context/UserContext"; 

// const Billing: React.FC = () => {
//   const [paymentMethod, setPaymentMethod] = useState<string>("Bank Transfer");
//   const { cart, clearCart } = useCart();
//   const { user } = useUser(); // Assume user has { email: string } at least

//   // Calculate total
//   const total = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const handlePaymentChange = (method: string) => {
//     setPaymentMethod(method);
//   };

//   const handlePlaceOrder = async () => {
//     try {
//       // If using “Card,” you might redirect to a Stripe flow
//       // For demonstration, we place the order immediately
//       const orderItems = cart.map(item => ({
//         id: item.id,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//         image: item.image,
//       }));

//       const payload = {
//         userEmail: user?.email || "guest@example.com",
//         items: orderItems,
//         total,
//         // If you want to track payment method or initial status:
//         status: paymentMethod === "Cash on Delivery" ? "pending" : "paid",
//       };

//       const res = await fetch("/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error("Failed to place order");

//       const data = await res.json();
//       console.log("Order created in Sanity:", data.order);

//       // Clear cart after successful order
//       clearCart();

//       // Possibly redirect to “Thank You” page or a Payment page
//       alert("Order placed successfully!");
//       // e.g. router.push("/order-confirmation?orderId=" + data.order._id)

//     } catch (err) {
//       console.error("Error placing order:", err);
//       alert("Failed to place order");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
//       <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">

//         {/* Billing Form (same as before) */}
//         {/* ... your existing code collecting addresses, etc. ... */}

//         {/* Order Summary */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
//           {/* Render cart items summary or your placeholder “Asgaard sofa x 1” */}
//           {cart.map(item => (
//             <div key={item.id} className="flex justify-between mb-2">
//               <span>{item.name} x {item.quantity}</span>
//               <span>Rs. {item.price * item.quantity}</span>
//             </div>
//           ))}

//           <div className="flex justify-between items-center border-t pt-4">
//             <span className="font-semibold">Subtotal</span>
//             <span>Rs. {total.toLocaleString()}</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="font-bold text-lg">Total</span>
//             <span className="font-bold text-lg text-yellow-500">
//               Rs. {total.toLocaleString()}
//             </span>
//           </div>

//           <div className="mt-6">
//             <h3 className="font-semibold mb-2">Payment Method</h3>
//             <div className="space-y-2">
//               <div>
//                 <input
//                   type="radio"
//                   id="bank"
//                   name="payment"
//                   checked={paymentMethod === "Bank Transfer"}
//                   onChange={() => handlePaymentChange("Bank Transfer")}
//                   className="mr-2"
//                 />
//                 <label htmlFor="bank" className="text-sm">
//                   Direct Bank Transfer
//                 </label>
//               </div>
//               <div>
//                 <input
//                   type="radio"
//                   id="cod"
//                   name="payment"
//                   checked={paymentMethod === "Cash on Delivery"}
//                   onChange={() => handlePaymentChange("Cash on Delivery")}
//                   className="mr-2"
//                 />
//                 <label htmlFor="cod" className="text-sm">
//                   Cash On Delivery
//                 </label>
//               </div>
//               <div>
//                 <input
//                   type="radio"
//                   id="card"
//                   name="payment"
//                   checked={paymentMethod === "Card Payment"}
//                   onChange={() => handlePaymentChange("Card Payment")}
//                   className="mr-2"
//                 />
//                 <label htmlFor="card" className="text-sm">
//                   Card / Stripe (Demo)
//                 </label>
//               </div>
//             </div>
//           </div>

//           <p className="mt-4 text-sm text-gray-500">
//             Your personal data will be used ...
//           </p>

//           <button
//             onClick={handlePlaceOrder}
//             className="w-full mt-6 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
//           >
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Billing;



// // "use client";

// // import React, { useState } from "react";

// // const Billing: React.FC = () => {
// //   const [paymentMethod, setPaymentMethod] = useState<string>("Bank Transfer");

// //   const handlePaymentChange = (method: string) => {
// //     setPaymentMethod(method);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
// //       <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
// //         {/* Billing Details */}
// //         <div className="bg-white p-6 rounded-lg shadow-md">
// //           <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
// //           <form>
// //             {/* First Name and Last Name */}
// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <label htmlFor="first-name" className="block font-medium mb-1">
// //                   First Name
// //                 </label>
// //                 <input
// //                   id="first-name"
// //                   type="text"
// //                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
// //                 />
// //               </div>
// //               <div>
// //                 <label htmlFor="last-name" className="block font-medium mb-1">
// //                   Last Name
// //                 </label>
// //                 <input
// //                   id="last-name"
// //                   type="text"
// //                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
// //                 />
// //               </div>
// //             </div>

// //             {/* Company Name */}
// //             <div className="mt-4">
// //               <label htmlFor="company-name" className="block font-medium mb-1">
// //                 Company Name (Optional)
// //               </label>
// //               <input
// //                 id="company-name"
// //                 type="text"
// //                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
// //               />
// //             </div>

// //             {/* Country/Region */}
// //             <div className="mt-4">
// //               <label htmlFor="country" className="block font-medium mb-1">
// //                 Country / Region
// //               </label>
// //               <select
// //                 id="country"
// //                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
// //               >
// //                 <option value="Sri Lanka">Sri Lanka</option>
// //                 <option value="India">India</option>
// //                 <option value="USA">USA</option>
// //               </select>
// //             </div>

// //             {/* Address */}
// //             <div className="mt-4">
// //               <label htmlFor="address" className="block font-medium mb-1">
// //                 Street Address
// //               </label>
// //               <input
// //                 id="address"
// //                 type="text"
// //                 placeholder="Street Address"
// //                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
// //               />
// //             </div>

// //             {/* Town/City */}
// //             <div className="mt-4">
// //               <label htmlFor="city" className="block font-medium mb-1">
// //                 Town / City
// //               </label>
// //               <input
// //                 id="city"
// //                 type="text"
// //                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
// //               />
// //             </div>

// //             {/* Province */}
// //             <div className="mt-4">
// //               <label htmlFor="province" className="block font-medium mb-1">
// //                 Province
// //               </label>
// //               <select
// //                 id="province"
// //                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
// //               >
// //                 <option value="Western Province">Western Province</option>
// //                 <option value="Central Province">Central Province</option>
// //                 <option value="Eastern Province">Eastern Province</option>
// //               </select>
// //             </div>

// //             {/* ZIP Code */}
// //             <div className="mt-4">
// //               <label htmlFor="zip" className="block font-medium mb-1">
// //                 ZIP Code
// //               </label>
// //               <input
// //                 id="zip"
// //                 type="text"
// //                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
// //               />
// //             </div>

// //             {/* Phone */}
// //             <div className="mt-4">
// //               <label htmlFor="phone" className="block font-medium mb-1">
// //                 Phone
// //               </label>
// //               <input
// //                 id="phone"
// //                 type="text"
// //                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
// //               />
// //             </div>

// //             {/* Email */}
// //             <div className="mt-4">
// //               <label htmlFor="email" className="block font-medium mb-1">
// //                 Email Address
// //               </label>
// //               <input
// //                 id="email"
// //                 type="email"
// //                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
// //               />
// //             </div>

// //             {/* Additional Information */}
// //             <div className="mt-4">
// //               <label htmlFor="additional" className="block font-medium mb-1">
// //                 Additional Information
// //               </label>
// //               <textarea
// //                 id="additional"
// //                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
// //                 rows={4}
// //               ></textarea>
// //             </div>
// //           </form>
// //         </div>

// //         {/* Order Summary */}
// //         <div className="bg-white p-6 rounded-lg shadow-md">
// //           <h2 className="text-2xl font-bold mb-6">Product</h2>
// //           <div className="flex justify-between items-center mb-4">
// //             <span>Asgaard sofa x 1</span>
// //             <span>Rs. 250,000.00</span>
// //           </div>
// //           <div className="flex justify-between items-center border-t pt-4">
// //             <span className="font-semibold">Subtotal</span>
// //             <span>Rs. 250,000.00</span>
// //           </div>
// //           <div className="flex justify-between items-center">
// //             <span className="font-bold text-lg">Total</span>
// //             <span className="font-bold text-lg text-yellow-500">
// //               Rs. 250,000.00
// //             </span>
// //           </div>

// //           {/* Payment Methods */}
// //           <div className="mt-6">
// //             <h3 className="font-semibold mb-2">Payment Method</h3>
// //             <div className="space-y-2">
// //               <div>
// //                 <input
// //                   type="radio"
// //                   id="bank"
// //                   name="payment"
// //                   checked={paymentMethod === "Bank Transfer"}
// //                   onChange={() => handlePaymentChange("Bank Transfer")}
// //                   className="mr-2"
// //                 />
// //                 <label htmlFor="bank" className="text-sm">
// //                   Direct Bank Transfer
// //                 </label>
// //               </div>
// //               <div>
// //                 <input
// //                   type="radio"
// //                   id="cod"
// //                   name="payment"
// //                   checked={paymentMethod === "Cash on Delivery"}
// //                   onChange={() => handlePaymentChange("Cash on Delivery")}
// //                   className="mr-2"
// //                 />
// //                 <label htmlFor="cod" className="text-sm">
// //                   Cash On Delivery
// //                 </label>
// //               </div>
// //             </div>
// //           </div>

// //           <p className="mt-4 text-sm text-gray-500">
// //             Your personal data will be used to support your experience
// //             throughout this website, to manage access to your account, and for
// //             other purposes described in our privacy policy.
// //           </p>

// //           <button className="w-full mt-6 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition">
// //             Place Order
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Billing;
