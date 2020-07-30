import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./SignUpForm.css";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const history = useHistory();

  const handleSignupSubmit = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();
    const data = { username, password };

    const sendSignup = async () => {
      axios
        .post("http://localhost:5000/users", data)
        .then(() => {
          history.push("/login");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            setErrorMessage(error.response.data.error);
          } else {
            console.log(error);
          }
        });
    };

    sendSignup();
  };

  return (
    <>
      <div className="signup-form__container">
        <h2 className="signup-form__header">Sign up</h2>
        <div className="signup-form__text-container">
          <div>
            <label className="signup-form__label" htmlFor="username">
              Username
              <input
                className="signup-form__input"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="signup-form__label" htmlFor="password">
              Password
              <input
                className="signup-form__input"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <button
              className="signup-form__button"
              type="submit"
              onClick={handleSignupSubmit}
            >
              Submit
            </button>
          </div>
          {errorMessage !== "" && (
            <div className="signup-form__error-message">{errorMessage}</div>
          )}
        </div>
      </div>
      <div className="signup-form__login-message">
        <Link className="signup-form__link" to="/login">
          Log in
        </Link>{" "}
        if you have an account
      </div>
    </>
  );
};

export default SignUpForm;
