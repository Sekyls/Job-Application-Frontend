import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For password visibility toggle
  const navigate = useNavigate();

  // Handle input changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Reset error state on new submit attempt

    const loginData = { email, password };

    // Axios login request to json-server
    axios
      .get("http://localhost:8000/users") // Get all users from json-server
      .then((response) => {
        // Check if any user matches the entered email and password
        const user = response.data.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          // Simulate successful login: Store user data in localStorage
          localStorage.setItem("user", JSON.stringify(user));

          // Redirect to the user page or dashboard
          navigate("/userpage");
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again.");
        console.error("Login error:", err);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading spinner
      });
  };

  return (
    <div className="container my-5 login-container py-5">
      <div className="row d-flex align-items-center">
        {/* Left Illustration */}
        <div
          className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center"
          style={{
            borderRight: "solid orange 5px",
          }}
        >
          <div className="text-center">
            <img
              src="/Login-amico.svg"
              alt="Login"
              className="img-fluid login-img"
            />{" "}
            <hr className="text-success" />
            <br />
            <h4
              className="mt-3 fw-bold"
              style={{
                fontFamily: "cursive",
                color: "orange",
              }}
            >
              Welcome Back! Let's Get You Hired.
            </h4>
          </div>
        </div>

        {/* Right Login Form */}
        <div className="col-lg-6">
          <div
            className="card shadow p-4"
            style={{
              height: "30rem",
              display: "grid",
              alignItems: "center",
            }}
          >
            <h3 className="text-center mb-4 fw-bold">Login to Your Account</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="form-label">Email address</label>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-light" id="basic-addon1">
                  <i class="bi bi-envelope-at-fill text-warning fw-bold fs-5"></i>
                </span>

                <input
                  type="email"
                  className="form-control"
                  placeholder="e.g. dennis@example.com"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>

              <br></br>
              <div>
                <label className="form-label">Password</label>
              </div>
              <div className="mb-3 position-relative input-group">
                <span class="input-group-text bg-light" id="basic-addon1">
                  <i class="bi bi-person-fill-lock text-warning fw-bold fs-5"></i>{" "}
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control pass"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  style={{
                    borderRadius: "5px",
                    fontFamily: "cursive",
                  }}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "15px",
                    cursor: "pointer",
                    color: "#6c757d", // Subtle color for the icon
                  }}
                />
              </div>

              <div className="mb-3 text-end">
                <NavLink
                  to="/forgot-password"
                  className="text-decoration-none text-danger fw-bold"
                >
                  Forgot password?
                </NavLink>
              </div>

              {error && (
                <div
                  className="error-message"
                  style={{
                    transition: "opacity 0.5s ease-in-out",
                    opacity: error ? 1 : 0,
                  }}
                >
                  {error}
                </div>
              )}

              <div className="d-grid mb-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div
                      className="spinner-border text-light"
                      role="status"
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        borderWidth: "0.2em",
                      }}
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Log In"
                  )}
                </button>
              </div>
              <br />
              <p className="text-center fw-bold">
                Don't have an account?{" "}
                <NavLink
                  to="/signup"
                  className="text-decoration-none text-info fw-bold"
                >
                  Sign Up
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
