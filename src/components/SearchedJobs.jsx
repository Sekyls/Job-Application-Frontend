import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchedJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Get search parameters
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("q")?.toLowerCase() || "";
  const locationFilter = searchParams.get("location")?.toLowerCase() || "";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/jobs");

        const filteredJobs = response.data.filter((job) => {
          // Check if job matches search term (title, requirements, or skills)
          const matchesSearch =
            !searchTerm || // If no search term, show all
            job.title.toLowerCase().includes(searchTerm) ||
            (job.requirements &&
              job.requirements.toLowerCase().includes(searchTerm)) ||
            (job.skills &&
              job.skills.some((skill) =>
                skill.toLowerCase().includes(searchTerm)
              ));

          // Check if job matches location
          const matchesLocation =
            !locationFilter || // If no location filter, show all
            job.location.toLowerCase().includes(locationFilter) ||
            (locationFilter === "remote" && job.remote === true);

          return matchesSearch && matchesLocation;
        });

        setJobs(filteredJobs);
        setError(null);
      } catch (err) {
        setError("Failed to fetch jobs. Please try again.");
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchTerm, locationFilter]);

  if (loading) return <div className="text-center py-5">Loading jobs...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">
        {searchTerm || locationFilter
          ? `Search Results: ${searchTerm ? `"${searchTerm}"` : ""} ${
              locationFilter ? `in ${locationFilter}` : ""
            }`
          : "All Jobs"}
      </h2>

      {jobs.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {jobs.map((job) => (
            <div key={job.id} className="col">
              <div className="card h-100">
                <img
                  src={job.image}
                  className="card-img-top"
                  alt={job.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {job.employer} • {job.location}
                  </h6>
                  <p className="card-text">{job.industry}</p>
                  <div className="mb-2">
                    {job.skills?.map((skill, index) => (
                      <span key={index} className="badge bg-secondary me-1">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info mt-4">
          No jobs found matching your criteria. Try different search terms.
          <div className="mt-2">
            Search tips:
            <ul>
              <li>Try fewer words or different spelling</li>
              <li>Search by skill (e.g., "React")</li>
              <li>Search by location (e.g., "Accra")</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchedJobsPage;
