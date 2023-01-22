import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Form, FloatingLabel, Button } from "react-bootstrap";

const Login = (props) => {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`${process.env.REACT_APP_API}/auth`, { params: data })
      .then((res) => {
        console.log(res);
        let token = res.data;
        localStorage.setItem("jwt", token);
        props.setLoginData(data)
        props.handleShowLogin()
        Swal.fire({
          icon: "success",
          title: "Succeed!",
          text: "You logged in.",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Please try again",
          text: "Username or Password is incorrect.",
        });
      });
  };

  return (
    <Modal show={props.showLogin} onHide={props.handleShowLogin}>
      <Modal.Header closeButton>
        <Modal.Title>
          <img src="https://www.tipinsure.com/new_design_5/assets/img/logo.svg" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel label="Username" className="mb-3">
            <Form.Control
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel label="Password" className="mb-3">
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <Button className="login-button" type="submit">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
