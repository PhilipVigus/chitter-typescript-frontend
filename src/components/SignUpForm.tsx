import React, { useState } from "react";
import axios from "axios";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSignupSubmit = (
    evt: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    evt.preventDefault();
    const data = { username, password };

    const sendSignup = async () => {
      axios
        .post("https://localhost:5000/signup", data)
        .then((response) => {
          console.log("Successful signup");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            setErrorMessage("Unsuccessful signup");
          } else {
            console.log(error);
          }
        });
    };

    sendSignup();
  };

  return (
    <div>
      <div>
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          Password
        </label>
      </div>
      <div>
        <button type="submit" onClick={handleSignupSubmit}>
          Submit
        </button>
      </div>
      <div>{errorMessage}</div>
    </div>
  );
};

export default SignUpForm;
