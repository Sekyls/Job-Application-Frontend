import { NavLink } from "react-router-dom";

const JobList = ({ jobs }) => {
  return (
    <>
      <h1 className="fw-bold display-5 text-center text-warning">
        Latest Jobs Postings
      </h1>
      <br />
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2 row-cols-xxxl-3 g-4">
        {jobs.map((job) => (
          <div className="col text-center" key={job.id}>
            <div
              className="card container p-0 custom-card w-75"
              style={{ width: "30rem" }}
            >
              <img
                src={job.image}
                className="card-img-top customImg"
                alt={job.title}
              />
              <div className="card-body">
                <h5 className="card-title customTitle">{job.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {job.location} | {job.industry}
                </h6>
                <p className="card-text">
                  <strong>Employer:</strong> {job.employer} <br />
                  <strong>Requirements:</strong> {job.requirements}
                </p>

                <div className="d-flex flex-wrap gap-2 mb-3 justify-content-center custombadge">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="badge bg-warning">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="buttons d-flex justify-content-around">
                  <NavLink
                    to={`/job/${job.id}`}
                    className="btn btn-info text-light w-25 "
                  >
                    <strong>View Details</strong>
                  </NavLink>
                  <NavLink
                    to={`/apply/${job.id}`}
                    className="btn btn-success w-25 d-flex align-items-center justify-content-center"
                  >
                    <strong>Apply</strong>
                  </NavLink>
                </div>
              </div>
            </div>{" "}
            <br />
          </div>
        ))}
      </div>
    </>
  );
};

export default JobList;
