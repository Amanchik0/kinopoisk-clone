// import React from 'react';
// import { Route, RouteProps, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../app/store';

// interface PrivateRouteProps extends RouteProps {
//   component: React.ComponentType<any>;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
//   const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/login" />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;
