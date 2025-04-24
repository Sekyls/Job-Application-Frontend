import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileElement from "./ProfileElement";

function NavBar() {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar">
      <Container fluid>
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="brand text-light fs-3"
          style={{
            fontFamily: "cursive",
          }}
        >
          JOBDEPOT{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 nav fs-5"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              as={NavLink}
              to="/"
              className="text-light fw-bold navlinks"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/job-listings"
              className="text-light fw-bold navlinks"
            >
              Job Listings{" "}
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/companies"
              className="text-light fw-bold navlinks"
            >
              Companies
            </Nav.Link>
            <NavDropdown
              title="Resources"
              id="navbarScrollingDropdown"
              className="fw-bold navlinks"
            >
              <NavDropdown.Item
                as={NavLink}
                to="#action3"
                className="bg-warning text-center fw-bold"
              >
                Career Advice
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="#action4"
                className="bg-info text-center fw-bold"
              >
                Resume Builder
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="#action5"
                className="bg-secondary text-center fw-bold"
              >
                Salary Calculator
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="d-flex gap-3 align-items-center fs-5">
            <NavLink
              as={NavLink}
              to="/job-post"
              className="text-light fw-bold navlinksR text-decoration-none"
            >
              <i class="bi bi-signpost-fill text-warning fs-4"></i> Post Job
            </NavLink>
            <NavLink
              as={NavLink}
              to="/login"
              className="text-light fw-bold navlinksR text-decoration-none"
            >
              <i class="bi bi-box-arrow-in-right text-warning fs-4"></i> Sign In
            </NavLink>
            <NavLink
              as={NavLink}
              to="/sign-up"
              className="text-light fw-bold navlinksR text-decoration-none"
            >
              <i class="bi bi-person-plus-fill text-warning fs-4"></i> Register
            </NavLink>
            <ProfileElement />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
