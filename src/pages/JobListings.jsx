import JobList from "../components/JobList";
import useFetch from "../../hooks/useFetch";

const JobListings = () => {
  const { data: jobs, pending, error } = useFetch("http://localhost:8000/jobs");

  return (
    <div>
      {error && (
        <div style={{ color: "crimson", height: "100vh" }}>
          <h1>{error}</h1>
        </div>
      )}
      {pending && (
        <div style={{ color: "gold", height: "100vh" }}>
          <h1>Loading.........</h1>
        </div>
      )}{" "}
      <br />
      {jobs && <JobList jobs={jobs} />}
    </div>
  );
};

export default JobListings;
