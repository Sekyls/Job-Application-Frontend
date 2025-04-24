import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom"; //
import Joi from "joi";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // For loading spinner
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });
  const navigate = useNavigate();

  // Handle input changes
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check password requirements
    const newPasswordStrength = {
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      number: /\d/.test(newPassword),
      special: /[@$!%*?&]/.test(newPassword),
    };
    setPasswordStrength(newPasswordStrength);
  }
  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }

  // Joi validation schema
  const signupSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().label("Name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string()
      .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required()
      .label("Password")
      .messages({
        "string.pattern.base":
          "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.",
      }),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm Password")
      .messages({ "any.only": "Passwords do not match" }),
  });

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true); // Start loading indicator

    const formData = { name, email, password, confirmPassword };

    const { error, value } = signupSchema.validate(formData, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessages = {};
      error.details.forEach((err) => {
        errorMessages[err.context.label] = err.message;
      });
      setErrors(errorMessages);
      setIsLoading(false); // Stop loading indicator
    } else {
      setErrors({});

      // Check if email already exists in the database
      axios
        .get("http://localhost:8000/users")
        .then((res) => {
          const existingUser = res.data.find(
            (user) => user.email === value.email
          );
          if (existingUser) {
            setErrors({ email: "Email is already in use" });
            setIsLoading(false); // Stop loading indicator
          } else {
            const userData = { ...value };

            // Submit the user data
            axios
              .post("http://localhost:8000/users", userData)
              .then((res) => {
                console.log("User created:", res.data);

                // Reset the form fields after successful submission
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");

                // Redirect after a slight delay to show success
                setTimeout(() => {
                  navigate("/userpage");
                }, 1000); // 1 second delay
              })
              .catch((err) => {
                console.error("Axios error:", err);
                alert("Signup failed. Please try again.");
                setIsLoading(false); // Stop loading indicator
              });
          }
        })
        .catch((err) => {
          console.error("Axios error:", err);
          alert("Error checking email. Please try again.");
          setIsLoading(false); // Stop loading indicator
        });
    }
  }

  return (
    <div className="container my-5 signup-container">
      <div className="row">
        {/* Left Illustration Section */}
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center">
          <div
            className="text-center p-4"
            style={{
              borderRight: " solid green 5px",
            }}
          >
            <img
              src="/Sign up.svg"
              alt="Sign Up"
              className="img-fluid signup-img"
            />{" "}
            <br /> <br />
            <h4
              className="mt-3 text-success fw-bold"
              style={{
                fontFamily: "monospace",
              }}
            >
              Join top recruiters and job seekers today!
            </h4>
          </div>
        </div>

        {/* Right Signup Form Section */}
        <div className="col-lg-6 d-grid align-items-center">
          <div className="card shadow p-4">
            <h3 className="text-center text-success mb-4 ">
              Create Your Account
            </h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="form-label">Full Name</label>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                  <i class="bi bi-person-circle text-success fs-5"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Dennis Sekyi"
                  required
                  value={name}
                  onChange={handleNameChange}
                  aria-describedby="basic-addon1"
                />
                {errors["Name"] && (
                  <small className="text-danger">{errors["Name"]}</small>
                )}
              </div>

              <div>
                <label className="form-label">Email address</label>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                  <i class="bi bi-envelope-at text-success fs-5"></i>{" "}
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="e.g. dennis@example.com"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  aria-describedby="basic-addon1"
                />
                {errors["Email"] && (
                  <small className="text-danger">{errors["Email"]}</small>
                )}
              </div>

              <div></div>
              <div className="mb-3" style={{ position: "relative" }}>
                <label className="form-label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter a strong password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "38px", // adjust based on your input height
                    cursor: "pointer",
                    color: "#555",
                  }}
                />
                {errors["Password"] && (
                  <small className="text-danger">{errors["Password"]}</small>
                )}
                <div className="password-requirements">
                  <ul>
                    <li
                      className={passwordStrength.length ? "valid" : "invalid"}
                    >
                      <FontAwesomeIcon
                        icon={passwordStrength.length ? faCheck : faTimes}
                        className="icon"
                      />
                      Minimum 8 characters
                    </li>
                    <li
                      className={
                        passwordStrength.uppercase ? "valid" : "invalid"
                      }
                    >
                      <FontAwesomeIcon
                        icon={passwordStrength.uppercase ? faCheck : faTimes}
                        className="icon"
                      />
                      At least one uppercase letter
                    </li>
                    <li
                      className={passwordStrength.number ? "valid" : "invalid"}
                    >
                      <FontAwesomeIcon
                        icon={passwordStrength.number ? faCheck : faTimes}
                        className="icon"
                      />
                      At least one number
                    </li>
                    <li
                      className={passwordStrength.special ? "valid" : "invalid"}
                    >
                      <FontAwesomeIcon
                        icon={passwordStrength.special ? faCheck : faTimes}
                        className="icon"
                      />
                      At least one special character
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-3" style={{ position: "relative" }}>
                <label className="form-label">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Re-enter password"
                  required
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "38px", // adjust based on your input height
                    cursor: "pointer",
                    color: "#555",
                  }}
                />
                {errors["Confirm Password"] && (
                  <small className="text-danger">
                    {errors["Confirm Password"]}
                  </small>
                )}
              </div>

              <div className="d-grid mb-3">
                <button
                  type="submit"
                  className="btn btn-success btn-lg fw-bold"
                >
                  {isLoading ? "Submitting..." : "Sign Up"}
                </button>
              </div>

              <p className="text-center fw-bold">
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="text-decoration-none text-info  fw-bold"
                >
                  Log In
                </NavLink>
              </p>
              {isLoading && (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
