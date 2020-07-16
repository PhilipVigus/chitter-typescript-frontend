import React from "react";

const SignUpForm: React.FC = () => {
  return (
    <div>
      <div>
        <label htmlFor="username">
          Username
          <input type="text" id="username" />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <input type="password" id="password" />
          Password
        </label>
      </div>
    </div>
  );
};

export default SignUpForm;
