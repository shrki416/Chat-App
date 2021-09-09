import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import registerImage from "../../assets/register.svg";
import "./Auth.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const body = { firstName, lastName, email, password };
      const response = await axios.post("/api/register", body);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error(error.message);
    }
    history.push("/login");
  };

  return (
    <div id="auth-container">
      <div id="auth-card">
        <div className="card-shadow">
          <div id="image-section">
            <img src={registerImage} alt="Register" />
          </div>

          <div id="form-section">
            <h2>Create an account</h2>

            <form onSubmit={submit}>
              <div className="input-field mb-1">
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required="required"
                  type="text"
                  placeholder="First name"
                />
              </div>

              <div className="input-field mb-1">
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  required="required"
                  type="text"
                  placeholder="Last name"
                />
              </div>

              <div className="input-field mb-1">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required="required"
                  type="text"
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

              <button>REGISTER</button>
              <h3>
                Already have an account? <Link to="/login">LOGIN</Link>
              </h3>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
