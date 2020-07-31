import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./AuthorisationForm.css";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const history = useHistory();

  const usernameValidationErrors = (): string[] => {
    const errors: string[] = [];
    if (username.length < 4) {
      errors.push("Username must be at least 4 characters long");
    }

    if (!username.match(/^[A-Za-z0-9_]+$/)) {
      errors.push(
        "Username must only contain letters, numbers and the underscore"
      );
    }

    return errors;
  };

  const passwordValidationErrors = (): string[] => {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (!password.match(/^[A-Za-z0-9_]+$/)) {
      errors.push(
        "Password must only contain letters, numbers and the underscore"
      );
    }

    if (!password.match(/[0-9]+/)) {
      errors.push("Password must contain at least one number");
    }

    if (!password.match(/[A-Z]+/)) {
      errors.push("Password must contain at least one capital letter");
    }

    if (!password.match(/[a-z]+/)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    return errors;
  };

  const handleSignupSubmit = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();

    const sendSignup = async () => {
      const data = { username, password };
      axios
        .post("http://localhost:5000/users", data)
        .then(() => {
          history.push("/login");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            setErrorMessages([...errorMessages, error.response.data.error]);
          } else {
            console.log(error);
          }
        });
    };

    setErrorMessages([]);
    const validationErrors = [
      ...usernameValidationErrors(),
      ...passwordValidationErrors()
    ];

    if (validationErrors.length === 0) {
      sendSignup();
    } else {
      setErrorMessages(validationErrors);
    }
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
          {errorMessages.length > 0 && (
            <div className="authorisation-form__error-message">
              {errorMessages.map((error) => (
                <div key={error}>{error}</div>
              ))}
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
