import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../../assets/login.svg";

function Login({ auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await axios.post("/api/login", body);
      localStorage.setItem("token", response.data.token);
      auth(true);
    } catch (error) {
      console.error(error.message);
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
              <div className="input-field mb-1">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required="required"
                  type="email"
                  placeholder="Email"
                />
              </div>

              <div className="input-field mb-2">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required="required"
                  type="password"
                  placeholder="Password"
                />
              </div>

              <button>LOGIN</button>
              <h3>
                Don't have an account? <Link to="/register">REGISTER</Link>
              </h3>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
