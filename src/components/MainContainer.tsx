import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PeepsContainer from "./PeepsContainer";
import Peep from "./Peep";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { MainContext } from "../contexts/MainContext";
import ProtectedRoute from "./ProtectedRoute";

const MainContainer: React.FC = () => {
  const [userState] = useContext(MainContext);

  return (
    <div>
      <header>Chitter</header>
      {userState.name}
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
        <ProtectedRoute path="/peeps/:id" component={Peep} />
      </Switch>
    </div>
  );
};

export default MainContainer;
