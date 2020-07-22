import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PeepsContainer from "./PeepsContainer";
import SignUpForm from "./SignUpForm";

const MainContainer: React.FC = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return <Redirect to="/signup" />;
        }}
      />
      <Route exact path="/signup" component={SignUpForm} />
      <Route exact path="/peeps" component={PeepsContainer} />
    </Switch>
  );
};

export default MainContainer;
