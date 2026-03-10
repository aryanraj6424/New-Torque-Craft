// import React, { createContext, useContext, useState, useEffect } from 'react';

// export type UserRole = 'superadmin' | 'admin' | 'dealer' | 'distributor' | 'customer';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: UserRole;
//   approved?: boolean;
//   garage?: any[];
//   wishlist?: string[];
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, role: UserRole) => Promise<void>;
//   signup: (name: string, email: string, role: UserRole) => Promise<void>;
//   logout: () => void;
//   isAuthenticated: boolean;
//   isAdmin: boolean;
//   isSuperAdmin: boolean;
//   isBusiness: boolean;
//   isCustomer: boolean;
//   verifyMFA: (code: string) => Promise<boolean>;
//   verifyOTP: (code: string) => Promise<boolean>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const savedUser = localStorage.getItem('torque_user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const login = async (email: string, role: UserRole) => {
//     // Simulate API call and role-based logic
//     const mockUser: User = {
//       id: Math.floor(Math.random() * 1000),
//       name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
//       email: email,
//       role: role,
//       approved: role === 'dealer' || role === 'distributor' ? true : undefined, // In reality, this would be checked on backend
//       garage: role === 'customer' ? [] : undefined,
//       wishlist: role === 'customer' ? [] : undefined,
//     };

//     // For dealers/distributors, simulate approval check
//     if ((role === 'dealer' || role === 'distributor') && !mockUser.approved) {
//       throw new Error('Your account is pending approval by an administrator.');
//     }

//     setUser(mockUser);
//     localStorage.setItem('torque_user', JSON.stringify(mockUser));
//   };

//   const signup = async (name: string, email: string, role: UserRole) => {
//     // Simulate registration logic
//     const mockUser: User = {
//       id: Math.floor(Math.random() * 1000),
//       name: name,
//       email: email,
//       role: role,
//       approved: role === 'customer' ? true : false, // Business accounts need approval
//       garage: role === 'customer' ? [] : undefined,
//       wishlist: role === 'customer' ? [] : undefined,
//     };

//     if (role === 'customer') {
//       setUser(mockUser);
//       localStorage.setItem('torque_user', JSON.stringify(mockUser));
//     } else {
//       // For business accounts, we just simulate the application submission
//       console.log(`Application submitted for ${role}:`, mockUser);
//       // In a real app, we wouldn't log them in immediately
//     }
//   };

//   const verifyMFA = async (code: string) => {
//     // Simulate MFA verification
//     return code === '123456';
//   };

//   const verifyOTP = async (code: string) => {
//     // Simulate OTP verification
//     return code === '654321';
//   };

//   const logout = () => {
//     // Clear all proprietary data and caches
//     setUser(null);
//     localStorage.removeItem('torque_user');
//     localStorage.removeItem('torque_cart');
//     localStorage.removeItem('torque_pricing_cache');
//     // Redirect logic handled in components
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       login, 
//       signup,
//       logout, 
//       isAuthenticated: !!user,
//       isAdmin: user?.role === 'admin' || user?.role === 'superadmin',
//       isSuperAdmin: user?.role === 'superadmin',
//       isBusiness: user?.role === 'dealer' || user?.role === 'distributor',
//       isCustomer: user?.role === 'customer',
//       verifyMFA,
//       verifyOTP
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };




// import React, { createContext, useContext, useState, useEffect } from 'react';

// export type UserRole = 'superadmin' | 'admin' | 'dealer' | 'distributor' | 'customer';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: UserRole;
//   approved?: boolean;
//   garage?: any[];
//   wishlist?: string[];
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, role: UserRole) => Promise<void>;
//   signup: (name: string, email: string, role: UserRole) => Promise<void>;
//   logout: () => void;
//   isAuthenticated: boolean;
//   isAdmin: boolean;
//   isSuperAdmin: boolean;
//   isBusiness: boolean;
//   isCustomer: boolean;
//   verifyMFA: (code: string) => Promise<boolean>;
//   verifyOTP: (code: string) => Promise<boolean>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const savedUser = localStorage.getItem('torque_user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const login = async (email: string, role: UserRole) => {
//     // Role-based name formatting
//     let displayName = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
    
//     // Specifically set name for Super Admin if needed
//     if (role === 'superadmin') {
//       displayName = "Super Admin";
//     }

//     const mockUser: User = {
//       id: Math.floor(Math.random() * 1000),
//       name: displayName,
//       email: email,
//       role: role,
//       approved: role === 'dealer' || role === 'distributor' || role === 'admin' || role === 'superadmin' ? true : undefined,
//       garage: role === 'customer' ? [] : undefined,
//       wishlist: role === 'customer' ? [] : undefined,
//     };

//     if ((role === 'dealer' || role === 'distributor') && !mockUser.approved) {
//       throw new Error('Your account is pending approval by an administrator.');
//     }

//     setUser(mockUser);
//     localStorage.setItem('torque_user', JSON.stringify(mockUser));
//   };

//   const signup = async (name: string, email: string, role: UserRole) => {
//     const mockUser: User = {
//       id: Math.floor(Math.random() * 1000),
//       name: name,
//       email: email,
//       role: role,
//       approved: role === 'customer' ? true : false,
//       garage: role === 'customer' ? [] : undefined,
//       wishlist: role === 'customer' ? [] : undefined,
//     };

//     if (role === 'customer') {
//       setUser(mockUser);
//       localStorage.setItem('torque_user', JSON.stringify(mockUser));
//     } else {
//       console.log(`Application submitted for ${role}:`, mockUser);
//     }
//   };

//   const verifyMFA = async (code: string) => {
//     return code === '123456';
//   };

//   const verifyOTP = async (code: string) => {
//     return code === '654321';
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('torque_user');
//     localStorage.removeItem('torque_cart');
//     localStorage.removeItem('torque_pricing_cache');
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       login, 
//       signup,
//       logout, 
//       isAuthenticated: !!user,
//       // Separating admin and superadmin for UI label clarity
//       isAdmin: user?.role === 'admin', 
//       isSuperAdmin: user?.role === 'superadmin',
//       isBusiness: user?.role === 'dealer' || user?.role === 'distributor',
//       isCustomer: user?.role === 'customer',
//       verifyMFA,
//       verifyOTP
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };





import React, { createContext, useContext, useState, useEffect } from 'react';

// Naming consistency ke liye 'super_admin' use kiya hai
export type UserRole = 'super_admin' | 'admin' | 'dealer' | 'distributor' | 'customer';

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  approved?: boolean;
  garage?: any[];
  wishlist?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;      // Ye true hoga agar role 'admin' ya 'super_admin' ho
  isSuperAdmin: boolean; // Sirf 'super_admin' ke liye
  isBusiness: boolean;
  isCustomer: boolean;
  verifyMFA: (code: string) => Promise<boolean>;
  verifyOTP: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('torque_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, role: UserRole) => {
    let displayName = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
    
    // Role matching fix
    if (role === 'super_admin') {
      displayName = "Super Admin";
    }

    const mockUser: User = {
      id: Math.floor(Math.random() * 1000),
      name: displayName,
      email: email,
      role: role,
      // Logic fix: Super Admin and Admin are auto-approved
      approved: ['dealer', 'distributor', 'admin', 'super_admin'].includes(role),
      garage: role === 'customer' ? [] : undefined,
      wishlist: role === 'customer' ? [] : undefined,
    };

    setUser(mockUser);
    localStorage.setItem('torque_user', JSON.stringify(mockUser));
  };

  const signup = async (name: string, email: string, role: UserRole) => {
    const mockUser: User = {
      id: Math.floor(Math.random() * 1000),
      name: name,
      email: email,
      role: role,
      approved: role === 'customer',
      garage: role === 'customer' ? [] : undefined,
      wishlist: role === 'customer' ? [] : undefined,
    };

    if (role === 'customer') {
      setUser(mockUser);
      localStorage.setItem('torque_user', JSON.stringify(mockUser));
    } else {
      console.log(`Application submitted for ${role}:`, mockUser);
    }
  };

  const verifyMFA = async (code: string) => {
    return code === '123456';
  };

  const verifyOTP = async (code: string) => {
    return code === '654321';
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('torque_user');
    localStorage.removeItem('torque_cart');
    localStorage.removeItem('torque_pricing_cache');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup,
      logout, 
      isAuthenticated: !!user,
      // LOGIC UPDATE: isAdmin true hona chahiye agar super_admin login kare
      isAdmin: user?.role === 'admin' || user?.role === 'super_admin', 
      isSuperAdmin: user?.role === 'super_admin',
      isBusiness: user?.role === 'dealer' || user?.role === 'distributor',
      isCustomer: user?.role === 'customer',
      verifyMFA,
      verifyOTP
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};