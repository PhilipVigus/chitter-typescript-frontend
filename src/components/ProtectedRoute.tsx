/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import useUserState from "../hooks/useUserState";

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const { isLoggedIn } = useUserState();

  if (isLoggedIn()) {
    return <Route {...props} />;
  } else {
    const renderComponent = () => <Redirect to={{ pathname: "/login" }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  }
};

export default ProtectedRoute;
