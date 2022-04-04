import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, redirectTo, passCondition }) {
  return passCondition ? children : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;