import "../styles/Auth.css";

import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import loginImage from "../assets/login.svg";
import { toast } from "react-toastify";
import useForm from "../lib/useForm";

function Login({ auth }) {
  const { inputs, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = inputs;
      const body = { email, password };
      const response = await axios.post("/api/login", body);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      auth(true);
      toast.success(<h3>🙂 Welcome, {response.data.firstName}!</h3>);
    } catch (error) {
      if (error && error.response && error.response.data) {
        toast.error(<h3>😢 {error.response.data.message}</h3>);
      }
    }
  };

  return (
    <div id="auth-container">
      <div id="auth-card">
        <div className="card-shadow">
          <div id="image-section">
            <img src={loginImage} alt="Login" />
          </div>

          <div id="form-section">
            <h2>Welcome back</h2>

            <form onSubmit={submit}>
              <fieldset>
                <label htmlFor="email">
                  <span>Email</span>
                  <div className="input-field mb-1">
                    <input
                      onChange={handleInputChange}
                      value={inputs.email}
                      name="email"
                      required="required"
                      type="email"
                      placeholder="Your Email"
                    />
                  </div>
                </label>

                <div className="input-field mb-2">
                  <label htmlFor="password">
                    <span>Password</span>
                    <input
                      onChange={handleInputChange}
                      value={inputs.password}
                      name="password"
                      required="required"
                      type="password"
                      placeholder="Your Password"
                    />
                  </label>
                </div>

                <button>LOGIN</button>
                <h3>
                  Don't have an account? <Link to="/register">REGISTER</Link>
                </h3>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
