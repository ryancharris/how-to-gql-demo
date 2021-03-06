import React, { useState } from "react";
import { AUTH_TOKEN } from "../constants";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function Login() {
  let history = useHistory();
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const _saveUserData = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  const _confirm = async (data) => {
    const { token } = login ? data.login : data.signup;
    _saveUserData(token);
    history.push(`/`);
  };

  const [signupMutation, { signupData }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => _confirm(data),
    onError: () => {},
  });
  console.log("signupData", signupData);
  const [loginMutation, { loginData }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => _confirm(data),
    onError: () => {},
  });
  console.log("loginData", loginData);

  return (
    <div>
      <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!login && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <div
          className="pointer mr2 button"
          onClick={() => {
            login
              ? loginMutation({
                  variables: {
                    email,
                    password,
                    name,
                  },
                })
              : signupMutation({
                  variables: {
                    email,
                    password,
                    name,
                  },
                });
          }}
        >
          {login ? "login" : "create account"}
        </div>
        <div className="pointer button" onClick={() => setLogin(!login)}>
          {login ? "need to create an account?" : "already have an account?"}
        </div>
      </div>
    </div>
  );
}

export default Login;
