import React, { useState } from "react";
import "./PayInsurance.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Form, FloatingLabel, Button } from "react-bootstrap";

const PayInsurance = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleShow}>
      <Modal.Header>
        <Modal.Title>
          <img src="https://www.tipinsure.com/new_design_5/assets/img/logo.svg" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src="https://thaiartisanfoods.com/wp-content/uploads/2019/02/promptpay-QR.jpg" />
      </Modal.Body>
    </Modal>
  );
};

export default PayInsurance;
