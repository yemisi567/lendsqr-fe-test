import React, { FormEvent, useState } from "react";
import "./Login.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useAuth } from "../../context/Auth/useAuth";
import { isEmailValid, isPasswordValid } from "../../helpers/helper";
import { ILoginDetails } from "../../types/types";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loginDetails, setLoginDetails] = useState<ILoginDetails>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<ILoginDetails>({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmailValid(loginDetails.email)) {
      setError({ ...error, email: "Invalid email" });
    }

    if (!isPasswordValid(loginDetails.password)) {
      setError({
        ...error,
        password: "Password must be at least 6 characters",
      });
    }

    if (
      isEmailValid(loginDetails.email) &&
      isPasswordValid(loginDetails.password)
    ) {
      login(loginDetails);
    }
  };

  return (
    <main className="main_wrapper">
      <section className="img_wrapper">
        <img src="/assets/logo.svg" alt="Logo" className="logo" />
        <img
          src="/assets/sign-in.png"
          alt="Sign in illustration"
          className="img_container"
        />
      </section>
      <section className="welcome_wrapper">
        <div className="welcome_container">
          <div className="text_container">
            <h1>Welcome!</h1>
            <h2>Enter details to login.</h2>
          </div>
          <form className="form_container" onSubmit={handleSubmit}>
            <Input
              placeholder="Email"
              type="email"
              value={loginDetails.email as string}
              error={error.email && "Invalid email"}
              className="input"
              name="email"
              onChange={(e) => {
                setLoginDetails({
                  ...loginDetails,
                  email: e.target.value,
                });
              }}
            />

            <Input
              placeholder="Password"
              type={passwordVisible ? "text" : "password"}
              value={loginDetails.password as string}
              error={error.password && "Password must be at least 6 characters"}
              name="password"
              className="input"
              onShowPassword={() => setPasswordVisible(!passwordVisible)}
              onChange={(e) => {
                setLoginDetails({
                  ...loginDetails,
                  password: e.target.value,
                });
              }}
            />
            <Link to="/">FORGOT PASSWORD?</Link>
            <Button type="submit" className="button">
              LOG IN
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
