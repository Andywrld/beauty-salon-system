import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const role = localStorage.getItem('rol');

  if (role === null) {
    return <Navigate to='/LoginForm' replace />;
  }
  if (role !== 'admin') {
    return <Navigate to='/' replace />;
  }

  return children;
}

export default ProtectedRoute;
