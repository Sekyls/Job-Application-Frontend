import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobPost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    industry: "",
    employer: "",
    requirements: "",
    skills: "",
    image: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const jobData = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
    };

    axios
      .post("http://localhost:8000/jobs", jobData)
      .then((res) => {
        navigate("/job-listings");
      })
      .catch((err) => {
        console.error("Failed to post job:", err);
      });
  };

  return (
    <div className="container my-5 job-post-container d-flex justify-content-center align-items-center w-100">
      <div className="row w-100 g-0 customLR d-flex">
        <div className="col-lg-5 d-none d-lg-flex align-items-center justify-content-center customleft">
          <div className="text-center">
            <img
              src="/qa.svg"
              alt="Post Job"
              className="img-fluid job-illustration"
            />
            <hr /> <hr />
            <br />
            <h4 className="mt-3 text-light customshare">
              Share your opportunity with top talent!
            </h4>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card shadow-lg p-5">
            <h3 className="mb-4 text-center text-success">Post a Job</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Frontend Developer"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Accra, Ghana"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Information Technology"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Employer</label>
                <input
                  type="text"
                  name="employer"
                  value={formData.employer}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. TechHub Ltd."
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Requirements</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                  placeholder="e.g. React, Node.js, MongoDB"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Skills (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. React, CSS, Git"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-success btn-lg">
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
