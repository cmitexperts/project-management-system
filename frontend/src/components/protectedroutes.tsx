// import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const admin = useSelector((store: any) => store.admin);
    console.log("admin", admin);

  // Check if admin data is available (user is logged in)
  if (!admin.data) {
    // return <Navigate to="/auth/signin" replace />;
    return null;
  }

  return children;
};


export default ProtectedRoute;