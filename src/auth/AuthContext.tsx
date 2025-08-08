import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string,
  "EmployeeId"?: string
}

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userRole : string | null;
  EmployeeId: string | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [EmployeeId, setEmployeeId] = useState<string | undefined>("Intial render")

    useEffect(() => {
     if (token && typeof token === 'string') {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const EmplyId = decoded["EmployeeId"];
        if (role) {
          setUserRole(role);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
            if (EmplyId) {
        setEmployeeId(EmplyId); // setting emly id so for reload it still hold
      }
      } catch (error) {
        console.error('Invalid token:', error);
        setIsAuthenticated(false);
      }
     }
    }, [token])
    

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
     try {
      const decoded = jwtDecode<JwtPayload>(newToken);
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const EmplyId = decoded["EmployeeId"];
     
      if (role) {
        setUserRole(role);
        setIsAuthenticated(true);
      }
          if (EmplyId) {
        setEmployeeId(EmplyId); 
      }
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  const logout = () => {
    setToken(null);
    setUserRole(null)
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated,userRole,EmployeeId }}>
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