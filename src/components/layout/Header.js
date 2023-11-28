import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <Navbar expand="md" className="bg-body-tertiary bg-dark">
      <Container>
        <Link className="navbar-brand" to="/">
          Library
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link to="/">
              {" "}
              <FaHome /> Home
            </Nav.Link>
            <Nav.Link to="/signup">signup</Nav.Link>
            <Nav.Link to="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
