"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Minimal user type
interface User {
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Optional: On mount, read a cookie or do /api/auth/me to load user
  useEffect(() => {
    // Example: read a "user" cookie or call an endpoint to see if we have a session
    // Skipped here for brevity
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}


// // /src/context/UserContext.tsx
// "use client";

// import { createContext, useState, useEffect, useContext } from 'react'

// type User = {
//   email: string
// } | null

// type UserContextType = {
//   user: User
//   setUser: (u: User) => void
// }

// const UserContext = createContext<UserContextType>({
//   user: null,
//   setUser: () => {},
// })

// export function UserProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User>(null)

//   useEffect(() => {
//     // On mount, read `document.cookie` or do a /api/auth/me call
//     const cookies = document.cookie
//     const userCookie = cookies
//       .split('; ')
//       .find(row => row.startsWith('user='))
//     if (userCookie) {
//       const email = decodeURIComponent(userCookie.split('=')[1])
//       setUser({ email })
//     }
//   }, [])

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   )
// }

// export function useUser() {
//   return useContext(UserContext)
// }
