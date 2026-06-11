import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type TProtectedRouteProps = {
  isAuth: boolean;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  isAuth,
  onlyUnAuth = false
}) => {
  const location = useLocation();

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (onlyUnAuth && isAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from.pathname} replace />;
  }

  return <Outlet />;
};
