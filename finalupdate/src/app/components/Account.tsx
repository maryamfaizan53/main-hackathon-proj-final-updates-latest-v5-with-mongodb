// src/app/components/Account.tsx
"use client";

import { useState, FormEvent } from "react";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { useUser } from "../../context/UserContext";

export default function Account() {
  // Toggle between login & register forms
  const [isLogin, setIsLogin] = useState(true);

  // Local form fields (login)
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Local form fields (registration)
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // Access user context
  const { setUser } = useUser();

  // Toggle forms
  const toggleForm = () => setIsLogin(!isLogin);

  // Example “social login” (placeholder)
  const handleSocialLogin = (provider: string) => {
    alert(`Login with ${provider} clicked — not implemented yet!`);
  };

  // Handle login
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();

      setUser({ email: data.user.email });
      alert("Login successful!");
    } catch (err) {
      console.error(err);
      alert("Login error");
    }
  };

  // Handle registration
  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registerEmail,
          password: registerPassword,
        }),
      });

      if (!res.ok) throw new Error("Registration failed");
      const data = await res.json();

      setUser({ email: data.user.email });
      alert("Registration successful!");
    } catch (err) {
      console.error(err);
      alert("Registration error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-white to-cyan-100 px-4 sm:px-6 lg:px-8">
      {/* Outer container */}
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-2xl grid grid-cols-1 md:grid-cols-2">
        {/* Left decorative panel */}
        <div className="relative hidden md:block bg-gradient-to-tr from-indigo-200 to-blue-300 rounded-l-lg">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Welcome to Our Site
            </h2>
            <p className="text-sm text-gray-600">
              Join our community and explore amazing products.
            </p>
          </div>
        </div>

        {/* Right form area */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">
            {isLogin ? "Log In" : "Register"}
          </h2>

          {/* Form */}
          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="login-email"
                  className="block font-semibold mb-1"
                >
                  Email address
                </label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block font-semibold mb-1"
                >
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-400"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-gray-800 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-indigo-600 hover:underline">
                  Lost Your Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-2 mt-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
              >
                Log In
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="reg-email"
                  className="block font-semibold mb-1"
                >
                  Email address
                </label>
                <input
                  id="reg-email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="reg-password"
                  className="block font-semibold mb-1"
                >
                  Password
                </label>
                <input
                  id="reg-password"
                  type="password"
                  placeholder="Create a password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </div>

              <p className="text-sm text-gray-600">
                By registering, you agree to our{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>

              <button
                type="submit"
                className="w-full py-2 mt-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
              >
                Register
              </button>
            </form>
          )}

          {/* Social Media Login */}
          <div className="mt-6">
            <p className="text-center font-medium mb-4 text-gray-700">
              Or sign in with
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleSocialLogin("Google")}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
                aria-label="Login with Google"
              >
                <FaGoogle className="text-xl" />
              </button>
              <button
                onClick={() => handleSocialLogin("Facebook")}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition"
                aria-label="Login with Facebook"
              >
                <FaFacebook className="text-xl" />
              </button>
              <button
                onClick={() => handleSocialLogin("GitHub")}
                className="bg-gray-800 hover:bg-black text-white p-2 rounded-full transition"
                aria-label="Login with GitHub"
              >
                <FaGithub className="text-xl" />
              </button>
            </div>
          </div>

          {/* Switch between Login / Register */}
          <div className="mt-6 text-center">
            <button
              onClick={toggleForm}
              className="text-sm text-indigo-600 font-medium hover:underline"
            >
              {isLogin ? "Need an account? Register" : "Already have an account? Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



// // src/app/components/Account.tsx
// "use client";

// import { useState, FormEvent } from "react";
// import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
// import { useUser } from "../../context/UserContext";

// const Account: React.FC = () => {
//   // Toggle between login & register forms
//   const [isLogin, setIsLogin] = useState(true);

//   // Local form fields for login
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   // Local form fields for registration (if you want password)
//   const [registerEmail, setRegisterEmail] = useState("");
//   const [registerPassword, setRegisterPassword] = useState("");

//   // Access the user context
//   const { setUser } = useUser();

//   // Switch forms
//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//   };

//   // Example “social login” placeholder
//   const handleSocialLogin = (provider: string) => {
//     alert(`Login with ${provider} clicked — not implemented yet!`);
//   };

//   // Handle login
//   const handleLoginSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: loginEmail,
//           password: loginPassword,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Login failed");
//       }

//       const data = await res.json();
//       // data.user should have at least { email: string }
//       setUser({ email: data.user.email });
//       alert("Login successful!");
//     } catch (err) {
//       console.error(err);
//       alert("Login error");
//     }
//   };

//   // Handle registration
//   const handleRegisterSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: registerEmail,
//           password: registerPassword,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Registration failed");
//       }

//       const data = await res.json();
//       setUser({ email: data.user.email });
//       alert("Registration successful!");
//     } catch (err) {
//       console.error(err);
//       alert("Registration error");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 grid md:grid-cols-2 gap-6">

//         {/* Login or Register Form */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4">
//             {isLogin ? "Log In" : "Register"}
//           </h2>

//           {isLogin ? (
//             <form onSubmit={handleLoginSubmit}>
//               <div className="mb-4">
//                 <label htmlFor="login-email" className="block font-medium mb-2">
//                   Email address
//                 </label>
//                 <input
//                   id="login-email"
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
//                   value={loginEmail}
//                   onChange={(e) => setLoginEmail(e.target.value)}
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="login-password" className="block font-medium mb-2">
//                   Password
//                 </label>
//                 <input
//                   id="login-password"
//                   type="password"
//                   placeholder="Enter your password"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
//                   value={loginPassword}
//                   onChange={(e) => setLoginPassword(e.target.value)}
//                 />
//               </div>

//               <div className="mb-4 flex items-center">
//                 <input
//                   id="remember-me"
//                   type="checkbox"
//                   className="mr-2 h-4 w-4 text-yellow-500 focus:ring-yellow-400"
//                 />
//                 <label htmlFor="remember-me" className="text-sm">
//                   Remember me
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
//               >
//                 Log In
//               </button>

//               <p className="mt-4 text-center text-sm">
//                 <a href="#" className="text-blue-500 hover:underline">
//                   Lost Your Password?
//                 </a>
//               </p>
//             </form>
//           ) : (
//             <form onSubmit={handleRegisterSubmit}>
//               <div className="mb-4">
//                 <label htmlFor="reg-email" className="block font-medium mb-2">
//                   Email address
//                 </label>
//                 <input
//                   id="reg-email"
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
//                   value={registerEmail}
//                   onChange={(e) => setRegisterEmail(e.target.value)}
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="reg-password" className="block font-medium mb-2">
//                   Password
//                 </label>
//                 <input
//                   id="reg-password"
//                   type="password"
//                   placeholder="Create a password"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
//                   value={registerPassword}
//                   onChange={(e) => setRegisterPassword(e.target.value)}
//                 />
//               </div>

//               <p className="text-sm mb-4">
//                 A link to set a new password will be sent to your email address.
//                 Your personal data will be used to support your experience
//                 throughout this website, to manage access to your account, and
//                 for other purposes described in our{" "}
//                 <a href="#" className="text-blue-500 hover:underline">
//                   privacy policy
//                 </a>
//                 .
//               </p>

//               <button
//                 type="submit"
//                 className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
//               >
//                 Register
//               </button>
//             </form>
//           )}

//           {/* Social Media Login Buttons */}
//           <div className="mt-6">
//             <p className="text-center font-medium mb-4">Or sign in with</p>
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={() => handleSocialLogin("Google")}
//                 className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
//                 aria-label="Login with Google"
//               >
//                 <FaGoogle className="text-xl" />
//               </button>
//               <button
//                 onClick={() => handleSocialLogin("Facebook")}
//                 className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition"
//                 aria-label="Login with Facebook"
//               >
//                 <FaFacebook className="text-xl" />
//               </button>
//               <button
//                 onClick={() => handleSocialLogin("GitHub")}
//                 className="bg-gray-800 hover:bg-black text-white p-2 rounded-full transition"
//                 aria-label="Login with GitHub"
//               >
//                 <FaGithub className="text-xl" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Switch Between Forms */}
//         <div className="flex flex-col justify-center">
//           <button
//             onClick={toggleForm}
//             className="text-blue-500 underline text-center transition hover:text-blue-700"
//           >
//             {isLogin ? "Need an account? Register" : "Already have an account? Log In"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Account;



// // "use client";

// // import { useState } from "react";
// // import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

// // const Account: React.FC = () => {
// //   const [isLogin, setIsLogin] = useState(true);

// //   const toggleForm = () => setIsLogin(!isLogin);

// //   const handleSocialLogin = (provider: string) => {
// //     // Placeholder for actual OAuth implementation
// //     alert(`Login with ${provider} clicked`);
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //       <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 grid md:grid-cols-2 gap-6">
// //         {/* Login or Register Form */}
// //         <div>
// //           <h2 className="text-2xl font-bold mb-4">{isLogin ? "Log In" : "Register"}</h2>
// //           {isLogin ? (
// //             <form>
// //               <div className="mb-4">
// //                 <label htmlFor="username" className="block font-medium mb-2">
// //                   Username or email address
// //                 </label>
// //                 <input
// //                   id="username"
// //                   type="text"
// //                   placeholder="Enter your username or email"
// //                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label htmlFor="password" className="block font-medium mb-2">
// //                   Password
// //                 </label>
// //                 <input
// //                   id="password"
// //                   type="password"
// //                   placeholder="Enter your password"
// //                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
// //                 />
// //               </div>
// //               <div className="mb-4 flex items-center">
// //                 <input
// //                   id="remember-me"
// //                   type="checkbox"
// //                   className="mr-2 h-4 w-4 text-yellow-500 focus:ring-yellow-400"
// //                 />
// //                 <label htmlFor="remember-me" className="text-sm">
// //                   Remember me
// //                 </label>
// //               </div>
// //               <button
// //                 type="submit"
// //                 className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
// //               >
// //                 Log In
// //               </button>
// //               <p className="mt-4 text-center text-sm">
// //                 <a href="#" className="text-blue-500 hover:underline">
// //                   Lost Your Password?
// //                 </a>
// //               </p>
// //             </form>
// //           ) : (
// //             <form>
// //               <div className="mb-4">
// //                 <label htmlFor="email" className="block font-medium mb-2">
// //                   Email address
// //                 </label>
// //                 <input
// //                   id="email"
// //                   type="email"
// //                   placeholder="Enter your email"
// //                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-400"
// //                 />
// //               </div>
// //               <p className="text-sm mb-4">
// //                 A link to set a new password will be sent to your email address. Your personal
// //                 data will be used to support your experience throughout this website, to manage
// //                 access to your account, and for other purposes described in our{" "}
// //                 <a href="#" className="text-blue-500 hover:underline">
// //                   privacy policy
// //                 </a>
// //                 .
// //               </p>
// //               <button
// //                 type="submit"
// //                 className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
// //               >
// //                 Register
// //               </button>
// //             </form>
// //           )}

// //           {/* Social Media Login Buttons */}
// //           <div className="mt-6">
// //             <p className="text-center font-medium mb-4">Or sign in with</p>
// //             <div className="flex justify-center space-x-4">
// //               <button
// //                 onClick={() => handleSocialLogin("Google")}
// //                 className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
// //                 aria-label="Login with Google"
// //               >
// //                 <FaGoogle className="text-xl" />
// //               </button>
// //               <button
// //                 onClick={() => handleSocialLogin("Facebook")}
// //                 className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition"
// //                 aria-label="Login with Facebook"
// //               >
// //                 <FaFacebook className="text-xl" />
// //               </button>
// //               <button
// //                 onClick={() => handleSocialLogin("GitHub")}
// //                 className="bg-gray-800 hover:bg-black text-white p-2 rounded-full transition"
// //                 aria-label="Login with GitHub"
// //               >
// //                 <FaGithub className="text-xl" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Switch Between Forms */}
// //         <div className="flex flex-col justify-center">
// //           <button
// //             onClick={toggleForm}
// //             className="text-blue-500 underline text-center transition hover:text-blue-700"
// //           >
// //             {isLogin ? "Need an account? Register" : "Already have an account? Log In"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Account;
