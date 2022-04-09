import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useHistory } from "react-router-dom";
import { signout } from "../../actions/auth.actions";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./style.css";
import { clientDomain } from "../../urlConfig";

function Header() {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const notifyState = useSelector((state) => state.notify);
  const dispatch = useDispatch();
  const handleSignout = () => {
    dispatch(signout());
    history.push("/signin");
  };
  const wasLoggedIn = () => {
    return (
      <Nav>
        {auth && auth.user.role === "admin" && (
          <li className="nav-item">
            <NavLink to="/signup" className="nav-link">
              Sign up
            </NavLink>
          </li>
        )}
        <li className="nav-item">
          <span role="button" className="nav-link" onClick={handleSignout}>
            Sign out
          </span>
        </li>
        <li className="nav-item" style={{ margin: "auto" }}>
          <div class="notify__wrapper">
            <div class="notify__icon">
              <NotificationsIcon />
            </div>
            <div class="notify__total">
              {notifyState.notifies ? notifyState.notifies.length : 0}
            </div>
            <div class="notify__board">
              <ul class="notify__list">
                {notifyState.notifies &&
                  notifyState.notifies.map((noti) => (
                    <li class="notify__item" key={noti.commentId}>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        class="notify__link"
                        href={`${clientDomain}product/${noti.productId}?commentId=${noti.commentId}`}
                      >
                        {new Date(noti.createdAt).toLocaleString("vi-VN")} -{" "}
                        {noti.userName} commented on this product{" "}
                        {noti.productName}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </li>
      </Nav>
    );
  };
  const notLogIn = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">
            Sign in
          </NavLink>
        </li>
      </Nav>
    );
  };
  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 999 }}
    >
      <Container fluid>
        <Link to="/" className="navbar-brand">
          Admin Dashboard
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {auth.authenticate ? wasLoggedIn() : notLogIn()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
