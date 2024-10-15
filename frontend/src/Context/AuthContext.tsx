// import React, { createContext, useContext, useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { signin as reduxSignin, logout as reduxLogout } from "../Reducers/Admin";
// // import { useNavigate } from 'react-router-dom';

// // interface AuthContextType {
// //   isAuthenticated: boolean;
// // signin: () => void;
// //   logout: () => void;
// // }

// const adminContext = createContext()


// export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//  const [admin, setAdmin] = useState(null);

//  const signin = (admin) => {
//   setAdmin(admin)

//  }
//  const logout = () => {
//   setAdmin(null)
//  }
//   return (
//     <adminContext.Provider value={{ admin, signin, logout}}>
//       {children}
//     </adminContext.Provider>
//   );
// };


// export const useAuth = () => useContext(adminContext);
// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // };
