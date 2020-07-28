/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const [userState] = useContext(MainContext);

  if (userState.id !== 0) {
    return <Route {...props} />;
  } else {
    const renderComponent = () => <Redirect to={{ pathname: "/login" }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  }
};

export default ProtectedRoute;
