import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PeepsContainer from "./PeepsContainer";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { UserContextProvider } from "../contexts/UserContext";

const MainContainer: React.FC = () => {
  return (
    <UserContextProvider initialState={{ name: "", id: 0 }}>
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
        <Route exact path="/login" component={LoginForm} />
      </Switch>
    </UserContextProvider>
  );
};

export default MainContainer;
