import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import "./Login.css";
import { authenticate, isAuth } from "../../helper";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const responseGoogleSuccess = (response) => {
    console.log(response);

    axios.post("http://localhost:5000/auth/googleLogin", {
      tokenId: response.tokenId,
    });
  };

  const responseGoogleError = (response) => {};

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setloginData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5000/auth/login", {
        email: loginData.email,
        password: loginData.password,
      })
      .then((response) => {
        authenticate(response, () => {
          setloginData({ email: "", password: "" });

          let intended = history.location.state;
          console.log("intended :", intended);
          if (intended) {
            history.push(intended.from);
          } else {
            isAuth() && history.push("/");
          }
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response);
      });
  };

  return (
    <>
      {loading && <span class="_it4vx _72fik"></span>}
      <div className="register_container">
        <div
          className="register_left_container"
          style={{ backgroundImage: `url(${"/images/wave.png"})` }}
        >
          <img src="/images/bg.svg" alt="Background" />
        </div>
        <div className="register_right_container">
          <img src="/images/avatar.svg" alt="Avatar" />
          <h2>Welcome To Hamdeveloper</h2>
          <form action="">
            <div className="form_group">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                required
                onChange={inputChangeHandler}
              />
              <label htmlFor="email" className="label_name">
                <span className="content_name">Email</span>
              </label>
            </div>
            <div className="form_group">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                required
                onChange={inputChangeHandler}
              />
              <label htmlFor="password" className="label_name">
                <span className="content_name">Password</span>
              </label>
            </div>
            <Link to="/login" className="account_already">
              Forgot Password ?
            </Link>
            <button type="submit" onClick={formSubmitHandler}>
              Sign Up
            </button>
          </form>
          <GoogleLogin
            className="googleButton"
            clientId="255334458330-t1u9bqra92q352v3uhaiopt6atiq7sv6.apps.googleusercontent.com"
            buttonText="Continue with Google"
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleError}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
