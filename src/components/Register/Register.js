import React, { useState } from "react";
import "../Login/Login.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Form, FloatingLabel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const navigate = useNavigate();
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
      .post(`${process.env.REACT_APP_API}/auth`, data)
      .then((res) => {
        if (res.data.name === "SequelizeUniqueConstraintError") {
          Swal.fire({
            icon: "error",
            title: "Please try another",
            text: "This username is already taken.",
          });
        } else {
          let token = res.data;
          localStorage.setItem("jwt", token);
          props.setLoginData(data);
          props.handleShowRegister();
          Swal.fire({
            icon: "success",
            title: "Succeed!",
            text: "You logged in.",
          });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal show={props.showRegister} onHide={props.handleShowRegister}>
      <Modal.Header closeButton>
        <Modal.Title>
          <img
            src="https://www.tipinsure.com/new_design_5/assets/img/logo.svg"
            alt="tipinsure logo"
          />
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
          <FloatingLabel label="Referal Code (if any)" className="mb-3">
            <Form.Control
              name="referalCode"
              type="text"
              placeholder="Referal Code (if any)"
              onChange={handleChange}
            />
          </FloatingLabel>
          <Button className="login-button" type="submit">
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Register;
