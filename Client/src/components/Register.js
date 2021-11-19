import "../styles/Auth.css";

import { Link, useNavigate } from "react-router-dom";

import React from "react";
import axios from "axios";
import registerImage from "../assets/register.svg";
import { toast } from "react-toastify";
import useFrom from "../lib/useForm";

function Register() {
  const { inputs, handleInputChange } = useFrom({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const { firstName, lastName, email, password } = inputs;
      const body = { firstName, lastName, email, password };
      await axios.post("/api/register", body);
    } catch (error) {
      console.error(error.message);
    }
    navigate("/login", { replace: true });
    toast.success(<h3>🚀 You registered with: {inputs.email}</h3>);
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
              <fieldset>
                <div className="input-field mb-1">
                  <label htmlFor="firstName">
                    <span>First Name</span>
                    <input
                      onChange={handleInputChange}
                      value={inputs.firstName}
                      name="firstName"
                      required="required"
                      type="text"
                      placeholder="Your First name"
                    />
                  </label>
                </div>

                <div className="input-field mb-1">
                  <label htmlFor="lastName">
                    <span>Last Name</span>
                    <input
                      onChange={handleInputChange}
                      value={inputs.lastName}
                      name="lastName"
                      required="required"
                      type="text"
                      placeholder="Your Last name"
                    />
                  </label>
                </div>

                <div className="input-field mb-1">
                  <label htmlFor="email">
                    <span>Email</span>
                    <input
                      onChange={handleInputChange}
                      value={inputs.email}
                      name="email"
                      required="required"
                      type="text"
                      placeholder="Your Email"
                    />
                  </label>
                </div>

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

                <button>REGISTER</button>
                <h3>
                  Already have an account? <Link to="/login">LOGIN</Link>
                </h3>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
