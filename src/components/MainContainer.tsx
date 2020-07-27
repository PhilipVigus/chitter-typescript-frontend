import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PeepsContainer from "./PeepsContainer";
import Peep from "./Peep";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { UserContextProvider } from "../contexts/UserContext";
import ProtectedRoute from "./ProtectedRoute";

const MainContainer: React.FC = () => {
  return (
    <UserContextProvider initialState={{ name: "", id: 0 }}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/login" />;
          }}
        />
        <Route exact path="/signup" component={SignUpForm} />
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/peeps" component={PeepsContainer} />
        <ProtectedRoute exact path="/peeps/:id" component={Peep} />
      </Switch>
    </UserContextProvider>
  );
};

export default MainContainer;
