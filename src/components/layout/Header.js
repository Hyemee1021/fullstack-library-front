import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CiLogout } from "react-icons/ci";
import { logOutUserACtion } from "../../pages/user_signup_login/userAction.js";
export const Header = () => {
  const { user } = useSelector((state) => {
    return state.userInfo;
  });
  const dispatch = useDispatch();

  return (
    <Navbar expand="md" className=" bg-success">
      <Container>
        <Link className="navbar-brand " to="/">
          Library CL
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?._id ? (
              <>
                <Link to="/" className="nav-link">
                  {" "}
                  <FaHome /> Home
                </Link>
                <Link className="nav-link " to="/dashboard">
                  <MdDashboard /> Dashboard
                </Link>
                <Link
                  className="nav-link "
                  to="/"
                  onClick={() => dispatch(logOutUserACtion(user.email))}
                >
                  <CiLogout />
                  Log out
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link">
                  {" "}
                  <FaHome /> Home
                </Link>
                <Link className="nav-link " to="/dashboard">
                  <MdDashboard /> Dashboard
                </Link>
                <Link to="/signup" className="nav-link">
                  signup
                </Link>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
