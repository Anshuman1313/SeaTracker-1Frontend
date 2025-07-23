import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
}

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkIfAdmin = (token: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ;

      // console.log("Decoded JWT:", decoded);
      return role === 'Admin';
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  };

  useEffect(() => {
    if (token && typeof token === 'string') {
      const isAdmin = checkIfAdmin(token);
      setIsAuthenticated(isAdmin);
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const isAdmin = checkIfAdmin(newToken);
    setIsAuthenticated(isAdmin);
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


// import  { createContext, useContext, useState, type ReactNode } from 'react';
// import {jwtDecode} from "jwt-decode"
// interface AuthContextType {
//   token: string | null;
//   login: (token: string) => void;
//   logout: () => void;
//   isAuthenticated: boolean;
// }
// const AuthContext = createContext<AuthContextType | undefined>(undefined);


// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const login = (newToken: string) => {
//     setToken(newToken);
    
//     localStorage.setItem('token', newToken);
//   };

//   const logout = () => {
//     setToken(null);
//     setIsAuthenticated(false)
//     localStorage.removeItem('token');
//   };
//   if(typeof(token) === "string" ){
//     const decoded = jwtDecode(token)
//     console.log(decoded);

//   }
 
//   return (
//     <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;


// };