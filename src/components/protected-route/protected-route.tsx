import { Navigate, useLocation } from "react-router-dom";
import { FC, ReactNode } from "react";

interface IProtectedRoute {
  redirectTo: string,
  passCondition: boolean,
  children: ReactNode,
}

interface INavigateDestination {
  to: string,
  state?: { from: string }
}

interface IState {
  from?: string
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, redirectTo, passCondition }) => {
  const location = useLocation();
  const state: IState = (location.state && typeof location.state === 'object') ? location.state : {};

  let navigateDestination: INavigateDestination = { to: redirectTo };
  if (redirectTo === '/login') {
    navigateDestination = { to: redirectTo, state: { from: location.pathname } };
  }
  if (state?.from) {
    navigateDestination = { to: state?.from };
  }

  return (
      <>
        {passCondition
            ? children
            : <Navigate {...navigateDestination} />
        }
      </>
  )
}

export default ProtectedRoute;