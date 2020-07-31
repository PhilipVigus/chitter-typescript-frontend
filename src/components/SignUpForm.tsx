import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./AuthorisationForm.css";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const history = useHistory();

  const isUsernameInvalid = (): boolean => {
    if (username.length < 4) {
      setErrorMessage("Username must be at least 4 characters long");
      return true;
    }

    return false;
  };

  const handleSignupSubmit = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();

    if (isUsernameInvalid()) {
      return;
    }

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
      <div className="authorisation-form__container">
        <h2 className="authorisation-form__header">Sign up</h2>
        <div className="authorisation-form__text-container">
          <div>
            <label className="authorisation-form__label" htmlFor="username">
              Username
              <input
                className="authorisation-form__input"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="authorisation-form__label" htmlFor="password">
              Password
              <input
                className="authorisation-form__input"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <button
              className="authorisation-form__button"
              type="submit"
              onClick={handleSignupSubmit}
            >
              Submit
            </button>
          </div>
          {errorMessage !== "" && (
            <div className="authorisation-form__error-message">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
      <div className="authorisation-form__link-message">
        <Link className="authorisation-form__link" to="/login">
          Log in
        </Link>{" "}
        if you have an account
      </div>
    </>
  );
};

export default SignUpForm;
