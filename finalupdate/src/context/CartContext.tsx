// context/CartContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the type for Cart Items
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string; // Product image
};

// Define the type for the Cart Context
type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void; 
  clearCart: () => void; // 1) NEW METHOD HERE
};

// Create the Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider to wrap the application
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add items to the cart
  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Update quantity if the item already exists
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      // Add new item to the cart
      return [...prev, { ...item, quantity }];
    });
  };

  // Remove items from the cart
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Update the quantity of an item
  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // 2) IMPLEMENT `clearCart`
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart, // 3) PASS `clearCart` IN CONTEXT
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};


// // context/CartContext.tsx
// "use client";

// import { createContext, useContext, useState, ReactNode } from "react";

// // Define the type for Cart Items
// type CartItem = {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string; // Product image
// };

// // Define the type for the Cart Context
// type CartContextType = {
//   cart: CartItem[];
//   addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
//   removeFromCart: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void; // Added updateQuantity
// };

// // Create the Cart Context
// const CartContext = createContext<CartContextType | undefined>(undefined);

// // CartProvider to wrap the application
// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   // Add items to the cart
//   const addToCart = (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
//     setCart((prev) => {
//       const existingItem = prev.find((cartItem) => cartItem.id === item.id);
//       if (existingItem) {
//         // Update quantity if the item already exists
//         return prev.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + quantity }
//             : cartItem
//         );
//       }
//       // Add new item to the cart
//       return [...prev, { ...item, quantity }];
//     });
//   };

//   // Remove items from the cart
//   const removeFromCart = (id: string) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   // Update the quantity of an item
//   const updateQuantity = (id: string, quantity: number) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity } : item
//       )
//     );
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook to use the Cart Context
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };


// // "use client";
// // import { createContext, useContext, useState, ReactNode } from "react";

// // // Define the cart context
// // type CartItem = {
// //   id: string;
// //   name: string;
// //   price: number;
// //   quantity: number;
// //   image: string;

// // };

// // type CartContextType = {
// //   cart: CartItem[];
// //   addToCart: (item: CartItem) => void;
// //   removeFromCart: (id: string) => void;
// // };

// // const CartContext = createContext<CartContextType | undefined>(undefined);

// // export const CartProvider = ({ children }: { children: ReactNode }) => {
// //   const [cart, setCart] = useState<CartItem[]>([]);

// //   const addToCart = (item: CartItem) => setCart((prev) => [...prev, item]);
// //   const removeFromCart = (id: string) =>
// //     setCart((prev) => prev.filter((item) => item.id !== id));

// //   return (
// //     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // export const useCart = () => {
// //   const context = useContext(CartContext);
// //   if (!context) {
// //     throw new Error("useCart must be used within a CartProvider");
// //   }
// //   return context;
// // };
