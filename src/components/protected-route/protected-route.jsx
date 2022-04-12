import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';



function ProtectedRoute({ children, redirectTo, passCondition }) {
  const { pathname, state } = useLocation();

  let navigateDestination = { to: redirectTo };
  if (redirectTo === '/login') {
    navigateDestination = { to: redirectTo, state: { from: pathname } };
  }
  if (state?.from) {
    navigateDestination = { to: state?.from };
  }

  return passCondition
      ? children
      : <Navigate {...navigateDestination} />;
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired,
  passCondition: PropTypes.bool.isRequired,
}