import React, { useState } from "react";
import "./Header.css";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";

const Header = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleShowLogin = () => setShowLogin(!showLogin);

  const handleShowRegister = () => setShowRegister(!showRegister);

  const logout = () => {
    props.setUserData();
    props.setLoginData();
    localStorage.removeItem("jwt");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" sticky="top">
        <Navbar.Brand>
          <Link to="/">
            <img
              src="https://www.tipinsure.com/new_design_5/assets/img/logo.svg"
              alt="tipinsure logo"
            />
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
          </Nav>
        </Navbar.Collapse>
        <Nav>
          {props.userData ? (
            <>
              <Nav.Item className="bottom-link">
                Welcome,{" "}
                <Link to="/user" className="normal-link">
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
              <Nav.Item
                onClick={handleShowLogin}
                className="normal-link bottom-link"
              >
                Login
              </Nav.Item>
              <Nav.Item onClick={handleShowRegister} className="button-link">
                Register
              </Nav.Item>
            </>
          )}
          <Nav.Item className="call-link">1736</Nav.Item>
        </Nav>
      </Navbar>

      <Login
        handleShowLogin={handleShowLogin}
        showLogin={showLogin}
        setLoginData={props.setLoginData}
      />
      <Register
        handleShowRegister={handleShowRegister}
        showRegister={showRegister}
        setLoginData={props.setLoginData}
      />
    </>
  );
};

export default Header;
