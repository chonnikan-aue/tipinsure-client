import React from "react";
import "./Header.css";
import { Navbar, Nav, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = (props) => {
  const logout = () => {
    props.setUserData();
  };

  return (
    <Navbar collapseOnSelect expand="lg" sticky="top">
      <Navbar.Brand>
        <Link to="/">
          <img src="https://www.tipinsure.com/new_design_5/assets/img/logo.svg" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Nav.Item>
            <Link to="/" className="normal-link">
              Buy Insurance
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/tip" className="normal-link">
              TIP & Trick
            </Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Link to="/user" className="normal-link">
              Update Personal Info
            </Link>
          </Nav.Item>
          <Nav.Item onClick={logout}>
          <Link to="/" className="normal-link">
          Logout
          </Link>
        </Nav.Item> */}
        </Nav>
      </Navbar.Collapse>
      <Nav>
        {props.userData ? (
          <>
            <Nav.Item className="bottom-link">
              Welcome,{" "}
              <Link to="/user" className="user-link">
                {props.userData.username}
              </Link>
            </Nav.Item>
            <Nav.Item onClick={logout} className="bottom-link">
              <Link to="/" className="button-link">
                Logout
              </Link>
            </Nav.Item>
          </>
        ) : (
          <>
            <Nav.Item className="bottom-link">
              <Link to="/login" className="normal-link">
                Login
              </Link>
            </Nav.Item>
            <Nav.Item className="bottom-link">
              <Link to="/register" className="button-link">
                Register
              </Link>
            </Nav.Item>
          </>
        )}
        <Nav.Item className="call-link">1736</Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Header;
