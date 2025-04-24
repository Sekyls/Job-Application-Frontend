import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append("q", searchTerm);
    if (location) params.append("location", location);
    navigate(`/job-listings/search?${params.toString()}`);
  };

  const handlePopularSearch = (term) => {
    navigate(`/job-listings/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div
      className="hero-section  text-white fw-bold text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9)), url('https://images.unsplash.com/photo-1729601703197-0f52aa3be737?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row min-vh-100 align-items-center py-5">
          <div className="col-lg-6">
            <h1
              className="display-1 fw-bold mb-3"
              style={{
                fontFamily: "sans",
                fontSize: "8rem",
              }}
            >
              Find Your Dream Job Today
            </h1>
            <p
              className="lead mb-4 fw-bold"
              style={{
                fontFamily: "cursive",
              }}
            >
              Connecting talented professionals with top companies worldwide.
              Your career journey starts here.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="card shadow-lg border-0 rounded">
              <div className="card-body p-4 rounded fw-bold">
                <h2 className="h4 text-center text-dark mb-4 fw-bold" style={{
                  fontFamily: "monospace"
                }}>
                  Find Your Perfect Role
                </h2>
                <form onSubmit={handleSearch}>
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text bg-warning text-light">
                        <i className="bi bi-search"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Job title, skills, or keywords"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text bg-warning text-light">
                        <i className="bi bi-geo-alt"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="City, state, or remote"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-warning text-light btn-lg w-100 fw-bold"
                  >
                    Search Jobs
                  </button>
                </form>
                <div className="popular-searches mt-3">
                  <p className="text-muted small mb-2">Popular searches</p>
                  <div className="d-flex flex-wrap gap-4 text-center justify-content-center">
                    {[
                      "Remote",
                      "Software Engineer",
                      "Marketing",
                      "Healthcare",
                    ].map((term) => (
                      <button
                        key={term}
                        type="button"
                        className="btn btn-sm btn-outline-success fw-bold"
                        onClick={() => handlePopularSearch(term)}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
