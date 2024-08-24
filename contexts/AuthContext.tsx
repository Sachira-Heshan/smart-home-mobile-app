import React, { createContext, ReactNode, useState } from "react";

type AuthContextType = {
   isLoggedIn: boolean;
   login: () => void;
   logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
   children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const login = () => {
      setIsLoggedIn(true);
   };

   const logout = () => {
      setIsLoggedIn(false);
   };

   return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
}