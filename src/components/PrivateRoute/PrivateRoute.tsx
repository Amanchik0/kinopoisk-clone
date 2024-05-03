// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../app/store'; // Убедитесь, что путь верен

// interface PrivateRouteProps {
//   component: React.ComponentType<any>;
//   path?: string;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
//   const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
//   const isAdmin = useSelector((state: RootState) => state.user.currentUser?.isAdmin);

//   return (
//     <Route {...rest} element={isAuthenticated && isAdmin ? <Component /> : <Navigate to="/login" />} />
//   );
// };

// export default PrivateRoute;
