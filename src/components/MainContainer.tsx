import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PeepsContainer from "./PeepsContainer";
import Peep from "./Peep";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { MainContextProvider } from "../contexts/MainContext";
import ProtectedRoute from "./ProtectedRoute";

const MainContainer: React.FC = () => {
  return (
    <MainContextProvider initialState={{ name: "", id: 0 }}>
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
        <Route path="/peep/:id" component={Peep} />
      </Switch>
    </MainContextProvider>
  );
};

export default MainContainer;
