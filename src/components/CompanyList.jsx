import { NavLink } from "react-router-dom";
const CompanyList = ({ companies }) => {
  return (
    <div className="container my-5 companies">
      <h2 className="text-center mb-4">Our Partner Companies</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-4">
        {companies.map((company) => (
          <div className="col" key={company.id}>
            <div className="card h-100 shadow-sm text-center">
              <img
                src={company.logo}
                className="card-img-top img-fluid"
                alt={company.name}
                style={{
                  height: "200px",
                  objectFit: "cover",
                  border: "none",
                }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{company.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {company.industry}
                </h6>
                <p className="card-text small">
                  <strong>Location:</strong> {company.location}
                  <br />
                  <strong>Founded:</strong> {company.founded}
                </p>
                <p className="card-text text-truncate" title={company.about}>
                  {company.about}
                </p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <a
                    href={company.website}
                    className="btn btn-sm btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                  <NavLink
                    to={`/companies/${company.id}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    View Profile
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
