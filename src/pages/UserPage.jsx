import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [jobsApplied, setJobsApplied] = useState(0);
  const [notifications] = useState([
    "New job listings in your industry!",
    "Update your profile to get better matches.",
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setJobsApplied(Math.floor(Math.random() * 10) + 1); // Simulated stat
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .join("");
  };

  if (!user) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div
      className={`container d-grid vh-100 mt-5 ${darkMode ? "text-light" : ""}`}
    >
      <div className="d-flex justify-content-between align-items-center mb-4 userP">
        <h2 className="fw-bold">Welcome, {user.name || "User"}!</h2>
        <button onClick={toggleDarkMode} className="btn btn-outline-secondary">
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="row g-4">
        {/* Profile + Stats */}
        <div className="col-md-4">
          <div className="card shadow p-4 rounded-4 text-center">
            <div className="avatar mb-3 mx-auto">{getInitials(user.name)}</div>
            <h4>{user.name}</h4>
            <p className="text-muted">{user.email}</p>
            <p>
              <strong>Role:</strong> {user.role || "Job Seeker"}
            </p>
            <p>
              <strong>Jobs Applied:</strong> {jobsApplied}
            </p>
            <button
              className="btn btn-outline-danger mt-3"
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="col-md-8">
          <div className="card shadow p-4 rounded-4">
            <h5 className="mb-3">🔔 Notifications</h5>
            <ul className="list-group list-group-flush">
              {notifications.map((note, index) => (
                <li key={index} className="list-group-item">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
