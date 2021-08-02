import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [registerData, setregisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setregisterData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/register", {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      })
      .then(
        (res) => {
          history.push("/login");
        },
        (err) => {
          console.log(err);
        }
      );
  };

  return (
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
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              required
              onChange={inputChangeHandler}
            />
            <label htmlFor="name" className="label_name">
              <span className="content_name">Name</span>
            </label>
          </div>
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
            Already Hav account ?
          </Link>
          <button type="submit" onClick={formSubmitHandler}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
